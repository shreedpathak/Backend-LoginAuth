import dotenv from "dotenv";
dotenv.config(); 

const errorHandler = (err, req, res, next) => {
    // Determine the status code, defaulting to 500 for internal server error
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case 400: // Bad Request
            res.json({
                title: "Bad Request my msg",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;

        case 401: // Unauthorized
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;

        case 403: // Forbidden
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;

        case 404: // Not Found
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;

        case 500: // Internal Server Error
        default:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;
    }
};

// Export the error handler
export default errorHandler;
