
class ErrorHandler { 
    constructor(status, message) { 
        this.status = status; 
        this.message = message; 
    } 

    static badRequest(message = 'Bad Request') {
        return new ErrorHandler(400, message); 
    } 

    static unauthorized(message = 'Unauthorized') {
        return new ErrorHandler(401, message); 
    } 

    static pageNotFound(message = 'NOT Found!') { 
        return new ErrorHandler(404, message); 
    } 

    static forbidden(message = 'Access Denied!') { 
        return new ErrorHandler(403, message); 
    } 

    static conflict(message = 'Conflict Occured!') { 
        return new ErrorHandler(409, message); 
    } 

    static validationError(message = 'All fields are required') { 
        return new ErrorHandler(422, message); 
    } 

    static serverError(message = 'Internal Server Error!') { 
        return new ErrorHandler(500, message); 
    } 
} 

module.exports = ErrorHandler; 