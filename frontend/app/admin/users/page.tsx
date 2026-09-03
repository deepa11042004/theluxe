"use client";

import React, { useEffect, useState } from "react";
import { Users, UserPlus, Trash2, ShieldCheck, X } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/users");
      const json = await res.json();
      if (json.success) {
        setUsers(json.data.users);
        setRoles(json.data.roles);
        if (json.data.roles.length > 0) {
          setFormData((p) => ({ ...p, role_id: json.data.roles[0].id }));
        }
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/v1/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        setFormData({ name: "", email: "", password: "", role_id: roles[0]?.id || "" });
        fetchUsers();
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin user?")) return;
    try {
      const res = await fetch(`/api/v1/admin/users/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchUsers();
      else alert(json.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Admin User Accounts & RBAC</h2>
          <p className="text-xs text-gray-500 mt-1">Super Admin restricted panel for managing team roles and CMS permissions.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#B38E46] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Admin User
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl font-semibold">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">Loading user accounts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 text-xs">{u.name}</div>
                      <div className="text-[10px] text-gray-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-[10px] uppercase text-[#B38E46] bg-[#B38E46]/10 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" /> {u.role?.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-600 uppercase text-[10px]">{u.status}</td>
                    <td className="py-3 px-4 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE USER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Add New Admin Account</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-4 h-4 text-gray-500" /></button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="editor@theluxeyatra.com"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Assigned Role</label>
                <select
                  value={formData.role_id}
                  onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white font-semibold"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name} - {r.description}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#B38E46] text-white rounded-xl font-semibold">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
