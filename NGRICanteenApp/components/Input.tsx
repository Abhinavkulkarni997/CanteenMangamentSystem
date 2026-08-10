import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;

  secureTextEntry?: boolean;

  keyboardType?:
    | "default"
    | "numeric"
    | "phone-pad"
    | "email-address";

  autoCapitalize?:
    | "none"
    | "words"
    | "characters"
    | "sentences";
autoCorrect?: boolean;

textContentType?:
  | "telephoneNumber"
  | "password"
  | "emailAddress"
  | "none";

  editable?: boolean;

  maxLength?: number;
}

export default function Input({
   label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = false,
  textContentType = "none",
  editable = true,
  maxLength,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

     
      <TextInput
  style={[
    styles.input,
    error ? styles.inputError : null,
  ]}
  value={value}
  placeholder={placeholder}
  onChangeText={onChangeText}
  secureTextEntry={secureTextEntry}
  keyboardType={keyboardType}
  autoCapitalize={autoCapitalize}
  autoCorrect={autoCorrect}
  textContentType={textContentType}
  editable={editable}
  maxLength={maxLength}
/>

{error ? (
  <Text style={styles.errorText}>
    {error}
  </Text>
) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: COLORS.black,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    backgroundColor: COLORS.white,
  },
  errorText: {
  color: "#DC2626",
  marginTop: 4,
  fontSize: 12,
},
inputError: {
  borderColor: "#DC2626",
},
});