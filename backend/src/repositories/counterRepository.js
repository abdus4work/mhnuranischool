import { CounterModel } from '../models/counterModel.js'

const counterRepository={
    getNextSequence:async(counterId)=>{
        const counter = await CounterModel.findOneAndUpdate(
            {_id:counterId},
            {$inc:{seq:1}},
            {new:true,upsert:true}
        )
        return counter.seq;
    }
}

export default counterRepository;