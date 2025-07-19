
export const validate=(schema,type='body')=>{
    return async (req, res, next) => {
        try {
            const result = schema.parse(req[type])
            if(type==='query'){
                req.validatedQuery=result;
            }
            else{
                req[type] = result;
            }
            next();
        } catch (error) {
           next(error)
        }
    }
}