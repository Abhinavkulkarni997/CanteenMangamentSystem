import { StyleSheet, View, Alert,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../../components/Input";
import Card from "../../components/Card";
import PrimaryButton from "../../components/PrimaryButton";

import { changePassword } from "../../services/auth";

import { router } from "expo-router";
import { COLORS } from "../../constants/colors";

const validationSchema = Yup.object({

  oldPassword: Yup.string()
    .required("Current password is required"),

  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "Passwords do not match"
    )
    .required("Confirm your password"),

});

export default function ChangePassword() {

  return (

    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
  Change Password
</Text>

<Text style={styles.subtitle}>
  Update your account password securely.
</Text>

      <Card>

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (
            values,
            { setSubmitting, resetForm }
          ) => {

            try {
                // console.log(values);

              await changePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
              });

              Alert.alert(
                "Success",
                "Password changed successfully."
              );

              resetForm();

              router.back();

            } catch (error: any) {

              Alert.alert(
                "Error",
                error?.response?.data?.message ??
                  "Unable to change password."
              );

            } finally {

              setSubmitting(false);

            }

          }}
        >

          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (

            <View>

              <Input
                label="Current Password"
                placeholder="Enter current password"
                secureTextEntry
                value={values.oldPassword}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                error={
                  touched.oldPassword
                    ? errors.oldPassword
                    : undefined
                }
              />

              <Input
                label="New Password"
                placeholder="Enter new password"
                secureTextEntry
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                error={
                  touched.newPassword
                    ? errors.newPassword
                    : undefined
                }
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm new password"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={
                  touched.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
              />

              <PrimaryButton
                title={
                  isSubmitting
                    ? "Updating..."
                    : "Update Password"
                }
                onPress={handleSubmit as any}
              />

            </View>

          )}

        </Formik>

      </Card>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
  fontSize: 24,
  fontWeight: "700",
  color: COLORS.primary,
  marginBottom: 6,
},

subtitle: {
  color: "#777",
  marginBottom: 20,
},
});