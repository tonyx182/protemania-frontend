import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex">
        {/* SIDEBAR*/}
        <aside className="2-64 bg-white shadow-lg p-5">
            <h2 className="text-2xl font-bold mb-5">🧇 Protemania</h2>

            <nav className="flex flex-col gap-3">
                <a href="/dashboard" className="hover:text-blue-500">Dashboard</a>
                <a href="/pedidos" className="hover:text-blue-500">Pedidos</a>
            </nav>
        </aside>

        {/* CONTENIDO */}
        <main className="felx-1 p-6">
            <div className="flex justify-between mb-6">
                <div>
                    <h1 className="text-2x1 font-bold">Panel</h1>
                    <p className="Text-gray-500">{user?.email}</p>
                </div>

                <button 
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Cerrar Sesión
                </button>
            </div>

            {children}
        </main>
    </div>
  );
}