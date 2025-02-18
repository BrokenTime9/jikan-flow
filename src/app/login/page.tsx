"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState<{ success?: boolean; message?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const response = await axios.post(
        "/api/auth/checklogin",
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        router.push("/");
      }
    };

    check();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { user, password });

      setRes(response.data);

      if (response.data.success) {
        router.prefetch("/");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setRes({ success: false, message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handleUser = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);
  const handlePass = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={handleUser}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePass}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {res?.message && (
            <p className="text-red-400 text-sm text-center">{res.message}</p>
          )}

          <Link href="/register" className="ml-2 text-blue-400">
            click here to register
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-lg font-bold text-white disabled:bg-gray-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
