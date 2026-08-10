import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";
import ProfileOption from "../../components/ProfileOption";

import { useAuth } from "../../context/AuthContext";
import { COLORS } from "../../constants/colors";

export default function Profile() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();

  // router.dismissAll();

  router.replace("/(auth)/login");
        },
      },
    ]
  );
};

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}

        <Card>
          <View style={styles.header}>

          {user?.photoUrl ? (
            <Image
              source={{ uri: user.photoUrl }}
              style={styles.avatar}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={100}
              color={COLORS.primary}
            />
          )}

          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.designation}>
            {user?.designation}
          </Text>

          <Text style={styles.division}>
            {user?.division}
          </Text>
          </View>

        </Card>

        {/* Personal Information */}

        <SectionTitle title="Personal Information" />

        <Card>

          <InfoRow
            icon="phone"
            label="Mobile"
            value={user?.mobile}
          />

          <Divider />

          <InfoRow
            icon="card-account-details"
            label="Employee ID"
            value={user?.employeeId || user?.projectStaffId }
          />

          <Divider />

          <InfoRow
            icon="account-group"
            label="User Type"
            value={user?.userType}
          />

          <Divider />

          <InfoRow
            icon="shield-account"
            label="Role"
            value={user?.role}
          />

        </Card>

        {/* Settings */}

        <SectionTitle title="Settings" />

        <ProfileOption
          icon="lock-reset"
          title="Change Password"
          onPress={() =>
            router.push("/(user)/change-password")
          }
        />

        <ProfileOption
          icon="logout"
          title="Logout"
          onPress={handleLogout}
        />

        <Text style={styles.version}>
          Version 1.0.0
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

interface InfoRowProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value?: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <View style={styles.infoRow}>

      <View style={styles.left}>

        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={COLORS.primary}
        />

        <Text style={styles.label}>
          {label}
        </Text>

      </View>

      <Text style={styles.value}>
        {value || "-"}
      </Text>

    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: "center",
},
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15,
    alignItems:"center"
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    
  },

  designation: {
    marginTop: 6,
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "center",
  },

  division: {
    marginTop: 4,
    color: "#777",
    textAlign: "center",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.black,
    fontWeight: "500",
  },

  value: {
    fontSize: 15,
    color: "#666",
    flexShrink: 1,
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  version: {
    marginTop: 25,
    textAlign: "center",
    color: "#999",
    fontSize: 13,
  },

});