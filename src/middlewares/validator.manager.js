import { validationResult, body, param } from "express-validator";

export const middlewareValidationResult = (req, res, next) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()) return res.json({erros: erros.array()});

    next(); 
}

export const registerValidator = [
    body("email", "Email invalid").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({ min: 6 }),
    body("password", "Password invalid").custom((value, { req }) => {
        if (value != req.body.repassword) throw new Error("Passwords do not match");

        return value;
    }),
    middlewareValidationResult
];

export const loginValidator = [
    body("email", "Email invalid").trim().isEmail().normalizeEmail(),
    body("password", "Password invalid").trim().isLength({ min: 6 }),
    middlewareValidationResult
];