import { Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import PrivateRouting from "@/components/Misc/PrivateRouting";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRouting
              Component={Dashboard}
              allowedRoles={["admin", "user", "super_admin"]}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Index;
