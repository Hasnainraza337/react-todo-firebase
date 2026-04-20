import { useAuthContext } from "@/context/AuthContext";
import { Spin } from "antd";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouting = ({ Component, allowedRoles }) => {
  const { isAuth, role, isAppLoading } = useAuthContext();
  const toastShown = useRef(false);

  const hasPermission =
    Array.isArray(role) &&
    Array.isArray(allowedRoles) &&
    role.some((r) => allowedRoles.includes(r));

  useEffect(() => {
    if (!isAppLoading && isAuth && Array.isArray(role) && role.length > 0) {
      if (!hasPermission && !toastShown.current && allowedRoles) {
        window.toastify("You are not authorized to access this page", "error");
        toastShown.current = true;
      }
    }
  }, [isAppLoading, isAuth, hasPermission, role, allowedRoles]);

  if (isAppLoading) return null;
  if (!isAuth) return <Navigate to="/auth/login" />;

  if (isAppLoading || (isAuth && (!role || role.length === 0))) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Spin size="large" />
        <p style={{ color: "#1890ff", fontWeight: "500" }}>
          Verifying Access...
        </p>
      </div>
    );
  }

  if (allowedRoles && !hasPermission) {
    return <Navigate to="/" />;
  }
  return <Component />;
};

export default PrivateRouting;

// import { useAuthContext } from "@/context/AuthContext";
// import { Navigate } from "react-router-dom";

// const PrivateRouting = ({ Component, allowedRoles }) => {
//   const { isAuth, role, isAppLoading } = useAuthContext();

//   if (isAppLoading) return null;
//   if (!isAuth) return <Navigate to="/auth/login" />;

//   const hasPermission =
//     Array.isArray(role) && role.some((r) => allowedRoles.includes(r));

//   if (allowedRoles && !hasPermission) {
//     window.toastify("You are not authorized", "error");
//   }

//   return <Component />;
// };

// export default PrivateRouting;
