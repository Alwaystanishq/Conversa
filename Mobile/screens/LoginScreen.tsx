import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-1 justify-between px-6 py-8">
          <View>
            <View className="mb-12 flex-row items-center">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white">
                <Text className="text-2xl font-black text-zinc-950">C</Text>
              </View>

              <Text className="ml-3 text-2xl font-bold tracking-tight text-white">Conversa</Text>
            </View>

            <Text className="text-4xl font-bold tracking-tight text-white">Welcome back</Text>

            <Text className="mt-3 text-base leading-6 text-zinc-400">
              Log in to share thoughts, follow people, and join the conversation.
            </Text>

            <View className="mt-10">
              <Text className="mb-2 text-sm font-semibold text-zinc-300">Email address</Text>

              <TextInput
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-base text-white"
                placeholder="you@example.com"
                placeholderTextColor="#71717a"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
              />

              <View className="mb-2 mt-5 flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-zinc-300">Password</Text>

                <Pressable>
                  <Text className="text-sm font-semibold text-zinc-400">Forgot password?</Text>
                </Pressable>
              </View>

              <View className="flex-row items-center rounded-2xl border border-zinc-800 bg-zinc-900">
                <TextInput
                  className="flex-1 px-4 py-4 text-base text-white"
                  placeholder="Enter your password"
                  placeholderTextColor="#71717a"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />

                <Pressable
                  className="px-4 py-4"
                  onPress={() => setShowPassword((current) => !current)}>
                  <Text className="text-sm font-semibold text-zinc-300">
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </View>

              <Pressable className="mt-7 items-center rounded-2xl bg-white py-4 active:opacity-80">
                <Text className="text-base font-bold text-zinc-950">Log in</Text>
              </Pressable>
            </View>
          </View>

          <View className="items-center">
            <Text className="text-sm text-zinc-500">
              New to Conversa? <Text className="font-bold text-white">Create an account</Text>
            </Text>

            <Text className="mt-5 text-center text-xs leading-5 text-zinc-600">
              By continuing, you agree to Conversa’s Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
