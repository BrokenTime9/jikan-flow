"use client";

import { LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await axios.post(
      "/api/auth/logout",
      {},
      { withCredentials: true },
    );
    if (response.status === 200) {
      router.push("/login");
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="p-1 rounded bg-gray-700 hover:bg-red-700 hover:text-white transition"
    >
      <LogOut size={18} />
    </button>
  );
};

export default Logout;
