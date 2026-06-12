/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
    // const { user } = useContext(UserContext);
    const userId = localStorage.getItem("userId");

    const handleRedirect = async () => {
        await Swal.fire({
            title: 'You must be logged in!',
            text: 'Please log in to continue.',
            icon: 'warning',
            timer: 1500,
            showConfirmButton: false,
        });
    };

    if (!userId || (userId == null)) {
        handleRedirect();
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;