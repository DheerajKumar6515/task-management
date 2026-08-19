"use client";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  User,
  Sun,
  Palette,
  Pencil,
} from "lucide-react";

interface ProfileFormData {
  email: string;
  fullName: string;
  title: string;
  username: string;
}

export default function ProfileSettings() {
    // Mobile sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    email: "dexter@gmail.com",
    fullName: "Dexter",
    title: "Designer",
    username: "Dexuser",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50/30 text-gray-800 font-sans">
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen}
        onClose={()=>setSidebarOpen(false)}
      />


      {/* Main Content Area */}
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)}/>
        <div className="w-[70%] mx-auto">
        {/* Header */}      
        <div className="flex items-center gap-4 mt-8 mb-5">
          <h1 className="text-xl font-medium text-gray-900">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-5 space-y-6">
          {/* Profile Picture Row */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-800">
              Profile picture
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-100 border border-gray-200">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dexter"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Email Row */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-800">Email</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {formData.email}
              </span>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500 cursor-pointer">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full Name Row */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-800">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-64 bg-gray-100 text-sm px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium"
            />
          </div>

          {/* Title Row */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-800">
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
              value={formData.title}
              onChange={handleChange}
              className="w-64 bg-gray-100 text-sm px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium"
            />
          </div>

          {/* Username Row */}
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-800">
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
              value={formData.username}
              onChange={handleChange}
              className="w-64 bg-gray-100 text-sm px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium"
            />
          </div>
        </div>

        {/* Workspace Access Section */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Workspace access
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Remove yourself from the workspace
          </span>
          <button className="bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Leave Workspace
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}
