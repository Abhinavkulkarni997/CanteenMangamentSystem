import { body } from "express-validator";

export const menuValidation=[

    body("itemName")
    .notEmpty()
    .withMessage("Item Name Required"),

    body("price")
    .isNumeric()
    .withMessage("Price Required"),

    body("sessionType")
    .isIn([
        // "BREAKFAST",
        "LUNCH",
        "DINNER"
    ])

];