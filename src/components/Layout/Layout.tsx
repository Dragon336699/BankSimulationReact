import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto w-full p-6">
                <Outlet />
            </main>
            <footer className="py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Bank Simulation. All rights reserved.
            </footer>
        </div>
    )
}