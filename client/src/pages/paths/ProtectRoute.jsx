import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children }) => {

    return children ? children : <Outlet />;
};

export default ProtectRoute;
