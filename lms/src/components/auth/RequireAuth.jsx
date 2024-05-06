import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function RequireAuth({ allowedRoles }) {
    const { isloggedIn, role } = useSelector((state) => state.auth);
    console.log(isloggedIn,role)
    return isloggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isloggedIn ? ( 
        <Navigate to="/denied" />
    ) : (
        <Navigate to="/login" />
    );
}

// PropTypes validation
RequireAuth.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RequireAuth;
