import { body } from "express-validator";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("employeeId")
    .if(body("userType").equals("EMPLOYEE"))
    .notEmpty()
    .withMessage("Employee ID is required"),

  body("projectStaffId")
.if(body("userType").equals("PROJECT_STAFF"))
.notEmpty()
.withMessage("Project Staff ID is required"),

  body("collegeName")
    .if(body("userType").isIn(["STUDENT", "INTERN"]))
    .notEmpty()
    .withMessage("College Name is required"),

  body("guideName")
    .if(body("userType").isIn(["STUDENT", "INTERN"]))
    .notEmpty()
    .withMessage("Guide Name is required"),

  body("contractorName")
    .if(body("userType").equals("CONTRACT"))
    .notEmpty()
    .withMessage("Contractor Name is required"),

 body("mobile")
  .matches(/^[6-9]\d{9}$/)
  .withMessage("Valid mobile number is required"),

  body("password")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain uppercase, number and special character",
    ),

  body("designation")
    .if(body("userType").isIn(["EMPLOYEE", "PROJECT_STAFF"]))
    .notEmpty()
    .withMessage("Designation is required"),

  body("division")
  .if(body("userType").isIn(["EMPLOYEE", "PROJECT_STAFF","INTERN"]))
  .notEmpty()
  .withMessage("Division is required"),

  body("userType")
    // .isIn([
    //     "SCIENTIST",
    //     "PROJECT_STAFF",
    //     "CONTRACT_STAFF",
    //     "INTERNSHIP_STUDENT"
    // ])
    .isIn(["EMPLOYEE", "PROJECT_STAFF", "STUDENT", "CONTRACT","INTERN",
    "VISITOR"])
    .withMessage("Invalid user type"),
];

// export const registerSchema = z
//   .object({
//     name: z.string().trim().min(3, "Name is required"),

//     mobile: z
//       .string()
//       .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),

//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters"),

//     userType: z.enum([
//       "EMPLOYEE",
//       "PROJECT_STAFF",
//       "CONTRACT",
//       "STUDENT",
//       "INTERN",
//       "VISITOR",
//     ]),

//     employeeId: z.string().optional(),

//     designation: z.string().optional(),

//     division: z.string().optional(),

//     projectId: z.string().optional(),

//     collegeName: z.string().optional(),

//     guideName: z.string().optional(),

//     contractorName: z.string().optional(),

//     organization: z.string().optional(),
//   })
//   .superRefine((data, ctx) => {
//     switch (data.userType) {
//       case "EMPLOYEE":
//         if (!data.employeeId)
//           ctx.addIssue({
//             code: "custom",
//             path: ["employeeId"],
//             message: "Employee ID is required",
//           });
//         break;

//       case "PROJECT_STAFF":
//         if (!data.designation)
//           ctx.addIssue({
//             code: "custom",
//             path: ["designation"],
//             message: "Designation is required",
//           });

//         if (!data.division)
//           ctx.addIssue({
//             code: "custom",
//             path: ["division"],
//             message: "Division is required",
//           });

//         break;

//       case "STUDENT":
//       case "INTERN":
//         if (!data.collegeName)
//           ctx.addIssue({
//             code: "custom",
//             path: ["collegeName"],
//             message: "College Name is required",
//           });

//         if (!data.guideName)
//           ctx.addIssue({
//             code: "custom",
//             path: ["guideName"],
//             message: "Guide Name is required",
//           });

//         break;

//       case "CONTRACT":
//         if (!data.contractorName)
//           ctx.addIssue({
//             code: "custom",
//             path: ["contractorName"],
//             message: "Contractor Name is required",
//           });
//         break;
//     }
//   });
