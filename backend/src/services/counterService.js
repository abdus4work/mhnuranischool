import counterRepository from '../repositories/counterRepository.js'

export const getFormattedSequence = async(counterId,prefix='',pad=3)=>{
    const seq= await counterRepository.getNextSequence(counterId);
    
    return `${prefix}${String(seq).padStart(pad,0)}`;
}