import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        My Bento Link 🍱
      </h1>
      <p className="text-slate-400 text-lg max-w-md mb-8">
        Buat halaman profil personal dan tampilkan semua link pentingmu dalam satu tautan elegan.
      </p>

      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-all"
        >
          Masuk ke Dashboard
        </Link>
        <Link
          href="/shz1993"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-full transition-all border border-slate-700"
        >
          Lihat Contoh Profil
        </Link>
      </div>
    </main>
  );
}