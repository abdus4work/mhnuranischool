import { TransactionModel } from '../models/transactionModel.js';
import baseRepository from './baseRepository.js';


export const transactionRepository = {
    ...baseRepository(TransactionModel),
    getByPaymentId:async(paymentId,options)=>{
        const {deleted=false,select=null,populate=null,lean=true}=options
        const query = TransactionModel.findOne({
            paymentId: paymentId.toUpperCase(),
            deleted: deleted
        })
        if(select) query.select(select);
        if(populate) query.populate(populate);
        if(lean) query.lean();
        return await query;
    }
}