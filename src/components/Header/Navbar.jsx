import { useAuthContext } from "@/context/AuthContext";
import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuth, handleLogout } = useAuthContext();
    return (
        <header className="bg-[#1D263B] border-b border-gray-100 shadow-sm sticky top-0 z-50">

            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo Section */}
                <div className="shrink-0 font-bold text-xl text-amber-500 ">
                    <Link to="/">MyTodoApp</Link>
                </div>

                {/* Desktop Links  */}
                <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    <Link to="/" className="hover:text-amber-500 transition">Home</Link>
                    <Link to="/about" className="hover:text-amber-500 transition">About</Link>
                    <Link to="/contact" className="hover:text-amber-500 transition">Contact</Link>
                    {isAuth && <>
                        <Link to="/addTodos" className="hover:text-amber-500 transition">AddTodos</Link>
                        <Link to="/todos" className="hover:text-amber-500 transition">Todos</Link>
                    </>}
                </ul>

                {/* Desktop Buttons  */}
                <div className="hidden md:flex items-center gap-4">
                    {!isAuth
                        ? <>
                            <Link to="/auth/login" className="text-sm font-medium border-2 border-amber-500 text-amber-500 px-5 py-2 rounded-lg hover:bg-amber-500 hover:text-[#1D263B] transition-all duration-300">
                                Login
                            </Link>
                            <Link to="/auth/register" className="text-sm font-medium bg-amber-500 border-2 border-amber-500 text-[#1D263B] px-5 py-2 rounded-lg hover:bg-amber-400 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300">
                                Register
                            </Link>
                        </>
                        : <>
                            <Link to="/dashboard" className="text-sm font-medium border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                Dashboard
                            </Link>
                            <Button size="large" type="primary" danger onClick={handleLogout}>Logout </Button>
                        </>
                    }
                </div>

                {/* Mobile Menu Button (Visible only on Mobile) */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600 hover:text-blue-600 focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar/Menu (Conditional Rendering) */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1">
                    <Link to="/" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Home</Link>
                    <Link to="/about" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">About</Link>
                    <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Contact</Link>
                    {isAuth && <>
                        <Link to="/addTodos" className="hover:text-amber-500 transition">AddTodos</Link>
                        <Link to="/todos" className="hover:text-amber-500 transition">Todos</Link>
                    </>}
                    <hr className="my-2" />
                    <div className="flex flex-col gap-2">
                        {!isAuth
                            ? <>
                                <Link to="/auth/login" className="text-sm font-medium border-2 border-amber-500 text-amber-500 px-5 py-2 rounded-lg hover:bg-amber-500 hover:text-[#1D263B] transition-all duration-300">
                                    Login
                                </Link>
                                <Link to="/auth/register" className="text-sm font-medium bg-amber-500 border-2 border-amber-500 text-[#1D263B] px-5 py-2 rounded-lg hover:bg-amber-400 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300">
                                    Register
                                </Link>

                            </>
                            : <>
                                <Link to="/dashboard" className="text-sm font-medium border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                    Dashboard
                                </Link>
                                <Button size="large" type="primary" danger onClick={handleLogout}>Logout </Button>
                            </>
                        }
                    </div>
                </div>
            )}

        </header>
    );
};

export default Navbar;