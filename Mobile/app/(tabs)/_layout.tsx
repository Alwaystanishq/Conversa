import { useEffect } from "react";
import { isAxiosError } from "axios";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Tabs, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import api from "../../api/client";
import { colors } from "../../constants/theme";
import useAuthStore from "../../store/authStore";

function AuthGuard() {
  const router = useRouter();
  const segments = useSegments();

  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) await logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, logout, setLoading]);

  useEffect(() => {
    if (isLoading) return;

    const isInsideTabs = segments[0] === "(tabs)";

    if (!user && isInsideTabs) {
      router.replace("/");
    }

    if (user && !isInsideTabs) {
      router.replace("/Home");
    }
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
      tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      sceneStyle: { backgroundColor: colors.background },
    }}>
      <Tabs.Screen name="Home" options={{ title: "Home", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="Search" options={{ title: "Discover", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="Create" options={{ title: "Post", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={25} color={color} /> }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} /> }} />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <AuthGuard />
    </>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
