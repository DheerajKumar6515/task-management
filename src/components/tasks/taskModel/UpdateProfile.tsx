"use client";

import { useState, useEffect } from "react";
import { useContextData } from "@/Context/GlobalContext";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { title } from "process";
import { toast } from "react-toastify";

interface ProfileProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

interface ProfileFormData {
  email: string;
  googleName: string;
  title: string;
  username: string;
}

function UpdateProfile({ isModalOpen, setIsModalOpen }: ProfileProps) {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const supabase = createClient();
  const { userDetails } = useContextData();
  const [loading, setLoading] = useState(false);
  // Modal State for Inputs
  const [modalFormData, setModalFormData] = useState<ProfileFormData>({
    email: userDetails ? userDetails.email : "",
    googleName: userDetails ? userDetails.googleName : "",
    title: "",
    username: "",
  });

  // Handle Input Changes inside Modal
  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profilePayload = {
      userId: userDetails?.userId,
      name: modalFormData.googleName,
      email: modalFormData.email.trim(),
      title: modalFormData.title,
      username: modalFormData.username,
      avatar: userDetails?.googleAvatar,
    };

    try {
      const res = await fetch(
        `${backendUrl}/tasks/profile/${userDetails?.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profilePayload),
        },
      );

      if (!res.ok) throw new Error("Failed to save profile");

      setIsModalOpen(false); // Close Modal
      toast.success("Update Profile Successfully.");
    } catch (err: any) {
      toast.error("Failed to update profile.");
      console.error("Profile update failed:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Profile Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-3">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email@gmail.com"
                  value={modalFormData.email}
                  onChange={handleModalInputChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="googleName"
                  placeholder="fullName"
                  value={modalFormData.googleName}
                  onChange={handleModalInputChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Title / Role
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder=" Your job title or role"
                  value={modalFormData.title}
                  onChange={handleModalInputChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="  One word, like a nickname or first name"
                  value={modalFormData.username}
                  onChange={handleModalInputChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 cursor-pointer py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 cursor-pointer py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
