import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  View
} from "react-native";
import { router } from "expo-router";

import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import AppPicker from "../../components/Picker";

import { COLORS } from "../../constants/colors";
import { USER_TYPES } from "../../constants/userTypes";
import { INITIAL_REGISTER_FORM } from "../../constants/register";
import { RegisterForm } from "../../types/register";
import { REGISTER_FIELDS } from "../../constants/registerFields";
import { REGISTER_FIELD_CONFIG } from "../../constants/registerFieldConfig";
import { validateRegister } from "../../utils/validation";
import { register } from "../../services/auth";
import {getErrorMessage} from "../../utils/error";
import { RegisterRequest } from "../../types/auth";
import { FormErrors } from "../../types/form";




export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] =
  useState<FormErrors<RegisterForm>>({});

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",

//     userType: "",

//     employeeId: "",
//     designation: "",
//     division: "",

//     projectId: "",

//     collegeName: "",
//     guideName: "",

//     contractorName: "",

//     organization: "",
//   });
const [form, setForm] =
    useState<RegisterForm>(INITIAL_REGISTER_FORM);
    

const updateField = <K extends keyof RegisterForm>(
  key: K,
  value: RegisterForm[K]
) => {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [key]: undefined,
  }));
};
const handleRegister = async () => {
const validationErrors = validateRegister(form);

setErrors(validationErrors);

if (Object.keys(validationErrors).length > 0) {
  return;
}

  try {
    setLoading(true);
     const payload: RegisterRequest = {
  name: form.name.trim(),
  mobile: form.mobile.trim(),
  password: form.password,
  gender: form.gender as RegisterRequest["gender"],

  email: form.email.trim() || undefined,

  userType: form.userType as RegisterRequest["userType"],

  employeeId: form.employeeId || undefined,
  projectStaffId:
    form.projectStaffId || undefined,
  designation: form.designation || undefined,
  division: form.division || undefined,

  projectId: form.projectId || undefined,

  collegeName: form.collegeName || undefined,
  guideName: form.guideName || undefined,

  contractorName: form.contractorName || undefined,

  organization: form.organization || undefined,
};

  

await register(payload);

    Alert.alert(
      "Registration Successful",
      "Your account has been created successfully.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/(auth)/login"),
        },
      ]
    );
  } catch (error) {
    Alert.alert(
        "Error",
        getErrorMessage(error)
    );
} finally {
    setLoading(false);
  }
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>

      <Input
        label="Name"
        placeholder="Enter Name"
        value={form.name}
        onChangeText={(text) =>
          updateField("name", text)
        }
        error={errors.name}
      />

      <Input
        label="Email"
        placeholder="Enter Email"
        value={form.email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) =>
          updateField("email", text)
        }
        error={errors.email}
      />

      <Input
        label="Mobile"
        placeholder="Enter Mobile Number"
        value={form.mobile}
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(text) =>
          updateField("mobile", text)
        }
        error={errors.mobile}
      />
     <AppPicker
  label="Gender"
  selectedValue={form.gender}
  onValueChange={(value) =>
    updateField(
      "gender",
      value as RegisterForm["gender"]
    )
  }
  items={[
    { label: "Select Gender", value: "" },
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ]}
  error={errors.gender}
/>

      <Input
        label="Password"
        placeholder="Enter Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) =>
          updateField("password", text)
        }
        error={errors.password}
      />

      <Input
        label="Confirm Password"
        placeholder="Confirm Password"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) =>
          updateField("confirmPassword", text)
        }
        error={errors.confirmPassword}
      />

      <AppPicker
        label="User Type"
        selectedValue={form.userType}
        onValueChange={(value) =>
          updateField("userType", value)
        }
        items={USER_TYPES}
         error={errors.userType}
      />
      {form.userType &&
  REGISTER_FIELDS[
    form.userType as keyof typeof REGISTER_FIELDS
  ]?.map((field) => {
    const config = REGISTER_FIELD_CONFIG[field];

    return (
      <Input
        key={field}
        label={config.label}
        placeholder={config.placeholder}
        value={form[field]}
        keyboardType={config.keyboardType as any}
        onChangeText={(text) =>
          updateField(field, text)
        }
        error={errors[field]}
      />
    );
  })}

      <PrimaryButton
        title="Continue"
        loading={loading}
        onPress={handleRegister}
      />

      <View style={styles.bottomContainer}>

    <Text style={styles.bottomText}>
        Already have an account?
    </Text>

    <TouchableOpacity
        onPress={() =>
            router.replace("/(auth)/login")
        }
    >
        <Text style={styles.link}>
            Login
        </Text>
    </TouchableOpacity>

</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 25,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 25,
    textAlign: "center",
  },
  bottomContainer: {

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 25,

},
bottomText: {

    fontSize: 15,

    color: "#666",

},

link: {

    marginLeft: 6,

    color: COLORS.primary,

    fontWeight: "700",

}
});