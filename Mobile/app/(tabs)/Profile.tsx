import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import api from "../../api/client";
import { colors, radius, spacing } from "../../constants/theme";
import useAuthStore from "../../store/authStore";

export default function Profile() {
  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getProfile = async () => {
    if (!currentUser?.username) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(`/user/${currentUser.username}`);
      setProfile(response.data.user);
    } catch (error: any) {
      console.log(
        "Profile error:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    getProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </SafeAreaView>
    );
  }

  const user = profile || currentUser;
  const posts = profile?.posts || [];
  const likedPosts = profile?.likedPosts || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postContent}>{item.content}</Text>

            <Text style={styles.postLikes}>
              {item.likes?.length || 0} likes
            </Text>
          </View>
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.topRow}>
              <Text style={styles.title}>Profile</Text>

              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log out</Text>
              </Pressable>
            </View>

            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>

              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.username}>@{user?.username}</Text>

              {user?.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>
                    {user?.followers?.length || 0}
                  </Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statNumber}>
                    {user?.following?.length || 0}
                  </Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{posts.length}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Posts</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptyText}>Your posts will appear here.</Text>
          </View>
        }
        ListFooterComponent={
          likedPosts.length > 0 ? (
            <View style={styles.likedSection}>
              <Text style={styles.sectionTitle}>Liked posts</Text>

              {likedPosts.map((post: any) => (
                <View key={post._id} style={styles.postCard}>
                  <Text style={styles.postContent}>{post.content}</Text>

                  <Text style={styles.postLikes}>
                    @{post.author?.username || "user"}
                  </Text>
                </View>
              ))}
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 100,
    flexGrow: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  logoutText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },

  profileCard: {
    marginTop: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },

  avatar: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 39,
    backgroundColor: colors.border,
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },

  name: {
    marginTop: spacing.md,
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },

  username: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },

  bio: {
    marginTop: spacing.md,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },

  statsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },

  stat: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },

  statLabel: {
    marginTop: 3,
    fontSize: 12,
    color: colors.textMuted,
  },

  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },

  postCard: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },

  postContent: {
    fontSize: 16,
    lineHeight: 23,
    color: colors.text,
  },

  postLikes: {
    marginTop: spacing.md,
    fontSize: 13,
    color: colors.textSecondary,
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 36,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  emptyText: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.textSecondary,
  },

  likedSection: {
    marginTop: spacing.lg,
  },
});
