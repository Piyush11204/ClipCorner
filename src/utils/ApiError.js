class ApiError extends Error {
    constructor(
        message = 'Internal Server Error',
        stack = "",
        error = [],
        statusCode,


    ) {
        super(message);
        this.message=message
        this.statusCode = statusCode
        this.data = null;
        this.success=false;
        this.error=error

        if(stack){

            this.stack = stack
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export {ApiError}