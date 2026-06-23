import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/client";
import { colors, radius, spacing } from "../../constants/theme";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getFeed = async () => {
    try {
      const response = await api.get("/post/feed");
      setPosts(response.data.posts);
    } catch (error: any) {
      console.log(
        "Feed error:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.author?.name?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>

              <View>
                <Text style={styles.name}>{item.author?.name}</Text>
                <Text style={styles.username}>@{item.author?.username}</Text>
              </View>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            <View style={styles.postFooter}>
              <Text style={styles.likeText}>
                {item.likes?.length || 0} likes
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.title}>Home</Text>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptyText}>
              Follow people or create your first post.
            </Text>
          </View>
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

  title: {
    marginBottom: spacing.xl,
    fontSize: 28,
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

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: colors.border,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },

  name: {
    marginLeft: spacing.md,
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  username: {
    marginLeft: spacing.md,
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
  },

  content: {
    marginTop: spacing.lg,
    fontSize: 16,
    lineHeight: 23,
    color: colors.text,
  },

  postFooter: {
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },

  likeText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },

  emptyText: {
    marginTop: spacing.sm,
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
  },
});
