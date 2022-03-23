class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.statusCode = errorCode;
        this.status = `${errorCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        
        
        // super(message);       
        // this.code = errorCode; 

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = HttpError;