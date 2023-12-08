import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const RoleBaseRoute = (props) => {
    //get URL
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const admin = useSelector(state => state.accountAdmin.user)
    const userRole = admin.role
    if (isAdminRoute === true && userRole === 'admin') {
        return (<>{props.children}</>)
    } else {
        return (<Loading />)
    }
}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.accountAdmin.isAuthenticated)

    return (
        <>
            {isAuthenticated === true
                ? <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                : <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRoute;