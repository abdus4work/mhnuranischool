import mongoose from 'mongoose';

import FeesModel from '../models/studentFeesModel.js';
import baseRepository from './baseRepository.js';

export const feesRepository = {
  ...baseRepository(FeesModel),
  getByStudentID: async (id, option = {}) => {
    const {
      select = null,
      populate = null,
      lean = true,
      isDeleted = false
    } = option;
    let query = FeesModel.findOne({ studentId: id, deleted: isDeleted });

    if (select) query.select(select);
    if (populate) query.populate(populate);
    if (lean) query.lean();
    return query;
  },
  getAllFees: async (filter) => {
    const {
      skip = 0,
      limit = 10,
      class: className,
      roll,
      section,
      month,
      year,
      status,
      studentId
    } = filter;
    const aggregationPipeline = [
      {
        $match: {
          generated: true,
          deleted: false,
          ...(month && { month }),
          ...(year && { year }),
          ...(status && { status }),
          ...(studentId && {
            studentId: new mongoose.Types.ObjectId(studentId)
          })
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $match: {
          ...(roll && { 'student.rollNumber': roll }),
          ...(className && { 'student.class': className }),
          ...(section && { 'student.section': section })
        }
      },
      {
        $lookup: {
          from: 'transactions',
          localField: 'paymentRef',
          foreignField: '_id',
          as: 'payment'
        }
      },
      {
        $unwind: {
          path: '$payment',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          deleted: 0,
          'payment.__v': 0,
          'payment.createdAt': 0,
          'payment.updatedAt': 0,
          'payment.deleted': 0,
          'student.__v': 0,
          'student.createdAt': 0,
          'student.updatedAt': 0,
          'student.deleted': 0
        }
      }
    ];

    const totalPipeline = [...aggregationPipeline, { $count: 'total' }];

    aggregationPipeline.push({$sort:{month:1,year:-1}},{ $skip: skip }, { $limit: limit });
    const [feesRecords, totalRecords] = await Promise.all([
      FeesModel.aggregate(aggregationPipeline),
      FeesModel.aggregate(totalPipeline)
    ]);

    return {
      feesRecords,
      totalDocuments: totalRecords[0]?.total || 0
    };
  },
  hardDeleteMany: async (filter) => {
    return await FeesModel.deleteMany(filter);
  }
  //
};
