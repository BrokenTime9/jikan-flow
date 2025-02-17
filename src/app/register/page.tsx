"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState<{ success?: boolean; message?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        user,
        password,
      });

      setRes(response.data);
      if (response.data.success) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      setRes({ success: false, message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handlePass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={handleUser}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePass}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {res?.message && (
            <p className="text-red-400 text-sm text-center">{res.message}</p>
          )}
          <Link href="/login" className="ml-2 text-blue-400">
            click here to login
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-bold text-white disabled:bg-gray-600"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
