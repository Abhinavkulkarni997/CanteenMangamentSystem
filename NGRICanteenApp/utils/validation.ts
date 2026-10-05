import { RegisterForm } from "../types/register";
import { FormErrors } from "../types/form";
import { REGISTER_FIELDS } from "../constants/registerFields";
import { REGISTER_FIELD_CONFIG } from "../constants/registerFieldConfig";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

export function validateRegister(
  form: RegisterForm
): FormErrors<RegisterForm> {
  const errors: FormErrors<RegisterForm> = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (form.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

//   if (form.email && !EMAIL_REGEX.test(form.email.trim())) {
//     errors.email = "Please enter a valid email address.";
//   }
if (!form.email.trim()) {
  errors.email = "Email is required.";
} else if (!EMAIL_REGEX.test(form.email.trim())) {
  errors.email = "Please enter a valid email address.";
}

  if (!MOBILE_REGEX.test(form.mobile.trim())) {
    errors.mobile = "Please enter a valid mobile number.";
  }
  if (!form.gender) {
  errors.gender = "Please select gender";
}

  if (!form.password) {
    errors.password = "Password is required.";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!form.userType) {
    errors.userType = "Please select a user type.";
  }

  if (form.userType) {
    const requiredFields =
      REGISTER_FIELDS[
        form.userType as keyof typeof REGISTER_FIELDS
      ] || [];

    requiredFields.forEach((field) => {
      if (!form[field]?.trim()) {
        errors[field] =
          REGISTER_FIELD_CONFIG[field].requiredMessage;
      }
    });
  }

  return errors;
}