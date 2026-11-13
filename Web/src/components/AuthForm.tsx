import { useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../api/client";
import useAuthStore from "../store/authStore";
import AuthLayout from "./AuthLayout";
import Icon from "./Icon";

export default function AuthForm({ register = false }: { register?: boolean }) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useAuthStore((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setError("");
    setIsLoading(true);
    try {
      const response = await api.post(register ? "/auth/register" : "/auth/login", {
        ...(register ? { name: String(values.get("name")).trim(), username: String(values.get("username")).trim() } : {}),
        email: String(values.get("email")).trim(),
        password: values.get("password"),
      });
      setAuth(response.data.token, response.data.user);
      navigate("/home", { replace: true });
    } catch (error) {
      setError(isAxiosError(error) && error.response?.data?.message || "We couldn't connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (user) return <Navigate to="/home" replace />;

  return (
    <AuthLayout>
      <div className="auth-form-heading"><h2>{register ? "Create an account" : "Welcome back"}</h2><p>{register ? "Choose your details to get started." : "Log in to see what’s new."}</p></div>
      <form onSubmit={handleSubmit} className="auth-form" aria-busy={isLoading}>
        {register && <div className="form-row"><div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" placeholder="Your name" required pattern=".*\S.*" /></div><div className="field"><label htmlFor="username">Username</label><input id="username" name="username" autoComplete="username" placeholder="yourname" required pattern="\S+" title="Choose a username without spaces" /></div></div>}
        <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div>
        <div className="field"><label htmlFor="password">Password</label><div className="password-field"><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} placeholder={register ? "Create a password" : "Enter your password"} required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>{showPassword ? "Hide" : "Show"}</button></div></div>
        {error && <p className="error-message" role="alert">{error}</p>}
        <button type="submit" disabled={isLoading} className="button button-primary auth-submit">{isLoading ? (register ? "Creating your account…" : "Signing you in…") : (register ? "Create account" : "Log in")}<Icon name="arrow" size={18} /></button>
      </form>
      <div className="auth-switch">{register ? "Already have an account?" : "New to Conversa?"} <Link to={register ? "/login" : "/register"}>{register ? "Log in" : "Create an account"}</Link></div>
    </AuthLayout>
  );
}
