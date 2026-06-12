import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import AdminUsers from "../../components/admin/AdminUsers";
import Products from "../../components/admin/Products";
import AdminDashboard from "../../components/admin/AdminDashboard";
import SaleOrders from "../../components/admin/SaleOrders";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContextProvider";
import Swal from "sweetalert2";

const AdminLayout = () => {
    const { path } = useParams();
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.isAdmin === false) {
            Swal.fire({
                icon: 'error',
                title: 'Permission denied!',
                text: "You must be an admin to access this route.",
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
            });
        }
    }, [user, navigate]);

    const renderContent = () => {
        switch (path) {
            case 'users':
                return <AdminUsers />;
            case 'products':
                return <Products />;
            case 'saleOrders':
                return <SaleOrders />;
            default:
                return <AdminDashboard />;
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload();
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    const navItemClass = "mx-2 my-8 flex items-center gap-3 text-xl"; // Consolidated common class

    return (
        <div className="text-white text-xl dark:bg-black min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left Sidebar */}
                <div className="lg:min-h-screen lg:border-r-8 border-gray-600 lg:col-span-1">
                    <div className="flex flex-col items-center justify-center py-10 px-16 min-w-full border-b-4 border-gray-600 rounded-xl">
                        <FaUser className="text-9xl" />
                        <div className="mt-3 text-red-500">
                            Admin <span className="text-gray-200">{user?.username}</span>
                        </div>
                    </div>
                    <div className="mx-16 pt-4 pb-4 text-orange-600 lg:block hidden">
                        <NavLink to='/admin' className={navItemClass}>
                            <img src="/assets/iconImgs/dashboard.png" className="w-10 h-10" />
                            Dashboard
                        </NavLink>
                        <NavLink to='/admin/users' className={navItemClass}>
                            <img src="/assets/iconImgs/users.png" className="w-10 h-10 invert" />
                            Users
                        </NavLink>
                        <NavLink to='/admin/products' className={navItemClass}>
                            <img src="/assets/iconImgs/productsIcon.png" className="w-10 h-10" />
                            Products
                        </NavLink>
                        <NavLink to='/admin/saleOrders' className={navItemClass}>
                            <img src="/assets/iconImgs/salesOrder.jpg" className="w-10 h-12 invert" />
                            Sale Orders
                        </NavLink>
                        <div
                            className={`${navItemClass} cursor-pointer`}
                            onClick={handleLogout}
                        >
                            <IoLogOutOutline size={30} className="ml-2 text-white" />
                            Logout
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-4 col-span-1 p-4 lg:p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
