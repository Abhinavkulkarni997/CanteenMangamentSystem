export const REGISTER_FIELDS = {
  EMPLOYEE: [
    "employeeId",
    "designation",
    "division",
  ],

 PROJECT_STAFF: [
    "projectStaffId",
    "projectId",
    "designation",
    "division",
],

  STUDENT: [
    "collegeName",
    "guideName",
  ],

  INTERN: [
    "collegeName",
    "guideName",
    "division",
  ],

  CONTRACT: [
    "contractorName",
  ],

  VISITOR: [
    "organization",
  ],
} as const;