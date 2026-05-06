"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const registered = searchParams.get("registered");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "Signin":
      case "OAuthSignin":
        return "An error occurred while initializing sign in";
      case "OAuthCallback":
        return "An error occurred while fetching data from Google (check Redirect URI)";
      case "OAuthCreateAccount":
        return "Could not create user account in the database";
      case "EmailCreateAccount":
        return "Could not send verification email";
      case "Callback":
        return "An error occurred in the callback function";
      case "OAuthAccountNotLinked":
        return "This email is already in use with another provider";
      case "CredentialsSignin":
        return "Invalid email or password";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError(result.error);
      } else if (result?.ok) {
        router.push("/user-requirement");
      }
    } catch (err) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
      style={{
        backgroundImage: "url(/images/ai-builder.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-96 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20 shadow-2xl p-8">
        <div className="card-body p-0">
          <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">
            Login to Your Account
          </h2>

          {registered && (
            <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
              <p className="text-sm">Registration successful! Please login.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
              <p className="font-bold">Error: {error}</p>
              <p className="text-xs">{getErrorMessage(error)}</p>
            </div>
          )}

          {loginError && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
              <p className="text-sm">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={loading}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
