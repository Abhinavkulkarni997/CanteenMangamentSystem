// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { COLORS } from "../constants/colors";

// interface PickerItem {
//   label: string;
//   value: string;
// }

// interface Props {
//   label: string;
//   selectedValue: string;
//   onValueChange: (value: string) => void;
//   items: PickerItem[];
// }

// export default function AppPicker({
//   label,
//   selectedValue,
//   onValueChange,
//   items,
// }: Props) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{label}</Text>

//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedValue}
//           onValueChange={onValueChange}
//         >
//           {items.map((item) => (
//             <Picker.Item
//               key={item.value}
//               label={item.label}
//               value={item.value}
//             />
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 18,
//   },

//   label: {
//     marginBottom: 6,
//     fontWeight: "600",
//     color: COLORS.black,
//   },

//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: COLORS.white,
//   },
// });




import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface PickerItem {
  label: string;
  value: string;
}

interface Props {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  placeholder?: string;
  error?: string;
}

export default function AppPicker({
  label,
  selectedValue,
  onValueChange,
  items,
  placeholder = "Select",
  error
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Dropdown
        style={[
  styles.dropdown,
  error && styles.dropdownError,
]}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        data={items}
        labelField="label"
        valueField="value"
        value={selectedValue}
        placeholder={placeholder}
        onChange={(item) => onValueChange(item.value)}
        renderRightIcon={() => (
          <MaterialCommunityIcons
            name="chevron-down"
            size={22}
            color={COLORS.primary}
          />
        )}
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

  dropdown: {
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
  },

  placeholder: {
    color: "#888",
    fontSize: 15,
  },

  selectedText: {
    color: COLORS.black,
    fontSize: 15,
  },
  errorText: {
  color: "#DC2626",
  marginTop: 4,
  fontSize: 12,
},
dropdownError: {
  borderColor: "#DC2626",
},
});