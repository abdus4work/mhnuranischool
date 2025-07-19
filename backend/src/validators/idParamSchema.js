import {z} from 'zod'

const idParamSchema= z.object({
    id:z.string().length(24)
})
export default idParamSchema;

export const makeIdParamSchema = (paramName='id') => {
  return z.object({
    [paramName]: z.string().length(24, { message: `${paramName} must be a 24-character string` }),
  });
}

export const makeMultiIdParamSchema = (fieldNames = ['id'])=>{
    const schema = {};
    fieldNames.forEach(field => {
        schema[field] = z.string().length(24, { message: `${field} must be a 24-character string` });
    });
    return z.object(schema);
}