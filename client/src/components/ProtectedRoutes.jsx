import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Nếu chưa đăng nhập, chuyển hướng đến trang Login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung bên trong
  return children;
};

export default ProtectedRoute;
