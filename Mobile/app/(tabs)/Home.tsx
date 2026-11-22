import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
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
import { colors, sheetShadow, spacing, typography } from "../../constants/theme";
import LikeButton from "../../components/LikeButton";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getFeed = useCallback(async () => {
    try {
      const response = await api.get("/posts/feed");
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
  }, []);

  useFocusEffect(useCallback(() => {
    getFeed();
  }, [getFeed]));

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    getFeed();
  }, [getFeed]);

  function updateLikes(id: string, likes: string[]) {
    setPosts((posts) => posts.map((post) => post._id === id ? { ...post, likes } : post));
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
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
              <LikeButton postId={item._id} likes={item.likes} onChange={(likes) => updateLikes(item._id, likes)} />
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
            tintColor={colors.accent}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 100,
    flexGrow: 1,
  },

  title: {
    marginBottom: spacing.xl,
    fontFamily: typography.display,
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.text,
  },

  postCard: {
    ...sheetShadow,
    backgroundColor: colors.copy,
    marginBottom: spacing.lg,
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
    borderWidth: 1,
    borderColor: colors.toner,
    backgroundColor: colors.primary,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.toner,
  },

  name: {
    marginLeft: spacing.md,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.body,
    color: colors.toner,
  },

  username: {
    marginLeft: spacing.md,
    marginTop: 2,
    fontSize: 13,
    fontFamily: typography.body,
    color: colors.tonerMuted,
  },

  content: {
    marginTop: spacing.lg,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: typography.body,
    color: colors.toner,
  },

  postFooter: {
    marginTop: spacing.lg,
  },

  emptyContainer: {
    ...sheetShadow,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.copy,
    marginBottom: 120,
    padding: spacing.xl,
  },

  emptyTitle: {
    fontWeight: "700",
    fontFamily: typography.display,
    fontSize: 26,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.toner,
  },

  emptyText: {
    marginTop: spacing.sm,
    textAlign: "center",
    fontSize: 14,
    fontFamily: typography.body,
    color: colors.tonerMuted,
  },
});
