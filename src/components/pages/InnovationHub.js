import { Navigate } from "react-router-dom";

/** The Innovation Hub was renamed to Jimmy's Corner (see components/corner). */
export default function InnovationHub() {
  return <Navigate to="/corner" replace />;
}
