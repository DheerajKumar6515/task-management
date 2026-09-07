"use client";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import React, { useState, useEffect } from "react";
import { useContextData } from "@/Context/GlobalContext";
import { Pencil, X } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { CleanAvatar } from "@/components/ui/CleanAvatar";
import UpdateProfile from "@/components/tasks/taskModel/UpdateProfile";

interface UserProfileDataProps {
  email: string;
  name: string;
  title: string;
  username: string;
  avatar: string;
}

export default function ProfileSettings() {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const supabase = createClient();
  const { userDetails, setUserDetails } = useContextData();
  const AvatarUrl = CleanAvatar(userDetails?.googleAvatar);
  // Modal Open/Close State
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //for user data
  const [userData, setUserData] = useState<UserProfileDataProps | null>(null);

  const userId = userDetails?.userId;

  const fetchProfileById = async () => {
    try {
      const response = await fetch(`${backendUrl}/tasks/profileUser/${userId}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: UserProfile not found`);
      }

      const data = await response.json();
      setUserData(data);
      // setUserDetails({
      //   userId:data.id,
      //   email:data.email,
      //   googleName:data.name,
      //   title:data.title,
      //   username:data.username,
      //   googleAvatar:data.avatar
      // })
    } catch (err: any) {
      //setTask(null);
      console.log(err.message || "Failed to fetch UserProfile");
    }
  };

  //Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    // Login page par redirect
    window.location.href = "/";
  };

  // Open Modal & Pre-fill Input Values
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchProfileById();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50/30 text-gray-800 font-sans dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="w-full flex items-center justify-center px-2">
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 mt-3 xl:mt-8 mb-3 xl:mb-5">
              <h1 className="text-xl md:text-2xl font-sans font-medium text-black dark:text-gray-400">
                Profile
              </h1>
            </div>

            {/* Profile Card */}
            <div className="w-full xl:w-160 bg-white rounded-xl border border-gray-200 p-3 md:p-6 shadow-sm mb-5 space-y-6 dark:bg-gray-900">
              {/* Profile Picture Row */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-400">
                  Profile picture
                </span>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-100 border border-gray-200">
                  <Image
                    src={`${userDetails ? AvatarUrl : "/defaultimg.png"}`}
                    width={30}
                    height={30}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Email Row */}
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-400">
                  Email
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {`${userDetails ? userDetails.email : userData?.email}`}
                  </span>
                  <button
                    onClick={handleOpenModal}
                    className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500 cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Full Name Row */}
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-800 dark:text-gray-400"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={`${userDetails ? userDetails.googleName : userData?.name}`}
                  readOnly
                  className="w-36 md:w-64 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-sm px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium"
                />
              </div>

              {/* Title Row */}
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                  >
                    Title
                  </label>
                  <span className="text-xs text-gray-400">
                    Your job title or role
                  </span>
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={`${userData ? userData.title : "title"}`}
                  readOnly
                  className="w-36 md:w-64 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-sm px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium"
                />
              </div>

              {/* Username Row */}
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                  >
                    Username
                  </label>
                  <span className="text-xs text-gray-400">
                    One word, like a nickname or first name
                  </span>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={`${userData ? userData.username : "username"}`}
                  readOnly
                  className="w-36 md:w-64 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-sm px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium"
                />
              </div>
            </div>

            {/* Workspace Access Section */}
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-4 dark:text-gray-400">
              Workspace access
            </h2>

            <div className="w-full xl:w-160 bg-white rounded-xl border border-gray-200 p-3 md:p-6 shadow-sm flex items-center justify-between dark:bg-gray-900">
              <span className="text-sm text-gray-400">
                Remove yourself from the workspace
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Leave Workspace
              </button>
            </div>
          </div>

          <UpdateProfile
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </main>
    </div>
  );
}
