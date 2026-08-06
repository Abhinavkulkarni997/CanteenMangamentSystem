import ApiError from "../utils/responses/ApiError.js";

const roleMiddleware = (...roles) => {

    return (req, res, next) => {
           console.log("Allowed:", roles);
    console.log("User Role:", req.user.role);

        if (!roles.includes(req.user.role)) {

            return next(
                new ApiError(
                    403,
                    "Access Denied"
                )
            );

        }

        next();

    };

};

export default roleMiddleware;