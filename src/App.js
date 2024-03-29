import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Admin from "./pages/AdminHome";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProducts from "./pages/NewProducts";
import { useSelector } from "react-redux";
import Success from "./pages/Success";
import { useContext } from "react";
import { MenuContext } from "./Context/MenuContext";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import SalesAnalytics from "./pages/SalesAnalytics";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/user/ScrollToTop";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const overlayStyle = {
  background: "rgba(0, 0, 0, 0.4)",
  zIndex: "9",
  transition: "all .3s ease",
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
};

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = useSelector((state) => state.user.currentUser?.data.isAdmin);
  const { darker } = useContext(MenuContext);

  return (
    <div style={{ position: "relative", }}>
      <div style={darker ? overlayStyle : undefined} />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/products/:cat" element={<Category />} />
          <Route
            path="/login"
            exact
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            exact
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/forgot"
            exact
            element={user ? <Navigate to="/" /> : <ForgotPassword/>}
          />
          <Route
            path="/resetpassword"
            exact
            element={user ? <Navigate to="/" /> : <ResetPassword/>}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="orders/:id" element={<Order />} />
          {admin && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="admin/userlist" element={<UserList />} />
              <Route path="admin/productlist" element={<ProductList />} />
              <Route path="admin/product/:productid" element={<Product />} />
              <Route path="admin/newproduct" element={<NewProducts />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="sales" element={<SalesAnalytics />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
