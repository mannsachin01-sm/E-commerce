import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/user/getAllUsers`, {
                method: "GET",
            });
            const data = await response.json();
            setUsers(data);
            console.log("Fetched users:", data); // Correct placement of console log
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/user/delete/${id}`, {
                method: "DELETE",
                // headers: {
                //     Authorization: authorizationToken, // If required, uncomment and use authorization
                // },
            });
            const data = await response.json();
            console.log(`User After Delete: ${data}`);
            if (response.ok) {
                getAllUsersData();
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className="text-white dark:bg-gray-900 min-h-screen">
            <div className="text-5xl text-center font-bold py-10 bg-black min-w-full border-gray-600 rounded-xl">
                Admin User Panel
            </div>
            <div className="overflow-x-auto p-4">
                <table className="table-auto min-w-full text-center">
                    <thead>
                        <tr className="border-b-8 border-gray-600 bg-gray-950">
                            <td className="px-4 py-6 font-bold text-2xl">Name</td>
                            <td className="px-4 py-6 font-bold text-2xl">Email</td>
                            <td className="px-4 py-6 font-bold text-2xl">Phone</td>
                            <td className="px-4 py-6 font-bold text-2xl">Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users?.map((curr) => (
                            <tr key={curr?._id} className="border-b-8 border-gray-600 hover:shadow-2xl shadow-orange-600">
                                <td className="px-4 py-4">{curr?.username}</td>
                                <td className="px-4 py-4">{curr?.email}</td>
                                <td className="px-4 py-4">{curr?.phone}</td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => deleteUser(curr?._id)}
                                        className="bg-orange-600 p-2 rounded-lg hover:border hover:border-orange-600 hover:bg-transparent transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
