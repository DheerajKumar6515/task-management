"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ActionDropdown from "@/components/projects/ActionDropdown";
import EditProjectModal, {
  Project,
} from "@/components/projects/EditProjectModal";
import DeleteWarnModal from "@/components/projects/DeleteWarnModal";

export default function ProjectsTable() {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${backendUrl}/tasks/allproject`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Projects
      </h1>

      <div className="overflow-visible rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500">
              <th className="py-3 px-6">Projects</th>
              <th className="py-3 px-6">Priority</th>
              <th className="py-3 px-6">Lead</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="py-3.5 px-6 font-medium text-gray-800 dark:text-gray-200">
                    {project.title}
                  </td>
                  <td className="py-3.5 px-6">{project.priority}</td>
                  <td className="py-3.5 px-6 text-gray-600 dark:text-gray-300">
                    {project.lead}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    {/* Component 1: Action Dropdown */}
                    <ActionDropdown
                      onEdit={() => setEditingProject(project)}
                      onDelete={() => setDeletingProject(project)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer Add Project */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-3">
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <Plus className="w-4 h-4" /> Add Projects
          </button>
        </div>
      </div>

      {/* Component 2: Add Modal */}
      {/* {isAddOpen && (
        <AddProjectModal
          onClose={() => setIsAddOpen(false)}
          onSuccess={fetchProjects}
        />
      )} */}

      {/* Component 3: Edit Modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={fetchProjects}
        />
      )}

      {/* Component 4: Delete Warning Modal */}
      {deletingProject && (
        <DeleteWarnModal
          projectId={deletingProject.id}
          projectTitle={deletingProject.title}
          onClose={() => setDeletingProject(null)}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
}
