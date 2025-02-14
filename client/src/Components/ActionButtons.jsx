import { useContext, useState } from "react";
import { FaSignOutAlt, FaPlus, FaCogs, FaMedal, FaBars, FaTimes, FaEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

export default function ActionButtons() {
    const { loggedIn, setLoggedIn } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()
    const handleLogout = () => {
        setLoggedIn(false)
        localStorage.removeItem('Auth')
        navigate('/')
    };

    return (
        <div>
            <div className="hidden md:flex justify-between">
                {/* Dashboard Button */}

                <div className="flex gap-3">
                    <Link to='/dashboard'
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg shadow transition-all"
                    >
                        Dashboard
                    </Link>
                    {/* Logout Button */}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition-all"
                    >
                        <FaSignOutAlt /> Logout
                    </button>

                </div>
                <div className="flex gap-3">
                    {/* Create Post Button */}
                    <Link to='/create'
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow transition-all"
                    >
                        <FaPlus /> Create Post
                    </Link>

                    {/* Manage Posts Button */}
                    <Link to='/manage'
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow transition-all"
                    >
                        <FaCogs /> Manage Posts
                    </Link>
                </div>

            </div>
            <div className="fixed bottom-3 right-5 md:hidden z-[100] ">
            {/* Floating Menu Button */}
            <button
                className="bg-white text-blue-600 p-3 rounded-full shadow-lg focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Menu Items */}
            {isOpen && (
                <div className="absolute bottom-12 right-0 bg-white shadow-md rounded-lg py-2 w-40">
                     <Link to='/dashboard'
                        className="flex items-center gap-2 w-full px-4 py-2 text-blue-600 hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>
                    <Link to="/create" className="flex items-center gap-2 w-full px-4 py-2 text-blue-600 hover:bg-gray-100">
                        <FaPlus /> Create Post
                    </Link>
                    <Link to='/manage' className="flex items-center gap-2 w-full px-4 py-2 text-blue-600 hover:bg-gray-100">
                        <FaEdit /> Manage Posts
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            )}
        </div>


        </div>

    );
}
