"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      // Check active login session from Supabase
      const { data: { user } } = await supabase.auth.getUser();

      // Redirect to login if unauthenticated
      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      fetchUserProfile(user.id, user);
      fetchLinks(user.id);
    };

    checkUserSession();
  }, [router]);

  // Fetch user profile to get username dynamically
  const fetchUserProfile = async (userId: string, currentUser: any) => {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    if (data?.username) {
      setUsername(data.username);
    } else if (currentUser?.user_metadata?.username) {
      setUsername(currentUser.user_metadata.username);
    }
  };

  // Fetch links for current user
  const fetchLinks = async (userId: string) => {
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false });

    if (data) setLinks(data);
  };

  // Add Link Handler
  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !user) return;

    setLoading(true);
    const { error } = await supabase
      .from("links")
      .insert([{ title, url, profile_id: user.id }]);

    setLoading(false);
    if (!error) {
      setTitle("");
      setUrl("");
      fetchLinks(user.id);
    } else {
      alert("Failed to add link: " + error.message);
    }
  };

  // Delete Link Handler
  const handleDeleteLink = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this link?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("links").delete().eq("id", id);

    if (!error && user) {
      fetchLinks(user.id);
    } else {
      alert("Failed to delete link: " + (error?.message || "An error occurred"));
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Loading state during auth check
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Tombol Cek Profil Publik (Dinamis Sesuai Username) */}
          {username && (
            <a
              href={`/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition flex items-center"
            >
              View Profile ↗
            </a>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Add Link Form */}
      <form onSubmit={handleAddLink} className="bg-white p-6 rounded-2xl border shadow-sm mb-8 space-y-4">
        <h2 className="font-semibold text-lg text-gray-800">Add New Link</h2>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Link Title</label>
          <input
            type="text"
            placeholder="e.g. My GitHub Profile"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Target URL</label>
          <input
            type="url"
            placeholder="https://github.com/username"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          {loading ? "Saving..." : "Add Link"}
        </button>
      </form>

      {/* Existing Links List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Your Links</h2>
        {links.length > 0 ? (
          links.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-xl flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.url}</p>
              </div>
              <button
                onClick={() => handleDeleteLink(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No links added yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}