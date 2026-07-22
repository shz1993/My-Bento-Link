import LinkButton from "../components/LinkButton";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }> | { username: string };
}) {
  const resolvedParams = await params;
  const usernameParam = resolvedParams.username?.toLowerCase().trim();

  if (!usernameParam) {
    notFound();
  }

  // Cari data profil dari Supabase
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", usernameParam)
    .maybeSingle();

  // Jika ada eror dari Supabase, tampilkan di terminal VS Code
  if (error) {
    console.error("Gagal mengambil data dari Supabase:", error.message);
  }

  // Jika profil tidak ditemukan, panggil halaman 404
  if (!profile) {
    console.log(`User dengan username '${usernameParam}' tidak ditemukan di database.`);
    notFound();
  }

  // Ambil daftar link milik user tersebut
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-gray-100 shadow-xl">
        {/* Header Profil */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.avatar_url || "https://via.placeholder.com/150"}
            alt={profile.full_name || profile.username}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
          />
          <h1 className="text-xl font-bold text-gray-900">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            @{profile.username} {profile.bio ? `• ${profile.bio}` : ""}
          </p>
        </div>

        {/* Daftar Link */}
        <div className="w-full">
          {links && links.length > 0 ? (
            links.map((link) => (
              <LinkButton key={link.id} title={link.title} url={link.url} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">
              Belum ada link yang ditambahkan.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}