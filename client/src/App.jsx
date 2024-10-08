// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home";
// import Layout from "./components/Layout";
// import Product from "./components/Product";
// import Signin from "./auth/Signin";
// import Signup from "./auth/Signup";
// import UserProfile from "./components/UserProfile";
// import AdminLayout from "./components/Admin/AdminLayout";
// import Dashboard from "./components/Admin/Dashboard";
// import Products from "./components/Admin/Products";
// import AddProduct from "./components/Admin/AddProduct";
// import Payments from "./components/Admin/Payments";
// import Customers from "./components/Admin/Customers";
// import Orders from "./components/Admin/Orders";
// import AddCategory from "./components/Admin/AddCategory";
// import CartItems from "./components/CartItems";
// import Category from "./components/Category";
// import SinglePage from "./components/SinglePage";
// import NotFound from "./components/NotFound";
// import SearchResults from "./components/SearchResults";
// import UpdateCategory from "./components/Admin/UpdateCategory";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/product" element={<Product />} />
//           <Route path="/sign-in" element={<Signin />} />
//           <Route path="/sign-up" element={<Signup />} />
//           <Route path="/user-profile" element={<UserProfile />} />
//           <Route path="/cart" element={<CartItems />} />
//           <Route path="/category/:categoryName" element={<Category />} />
//           <Route path="/product/:id/:name" element={<SinglePage/>} />
//           <Route path="/search" element={<SearchResults />} />
//         </Route>
        
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="/admin/dashboard" />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="products" element={<Products />} />
//           <Route path="customers" element={<Customers />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="payments" element={<Payments />} />
//           <Route path="add-product" element={<AddProduct />} />
//           <Route path="add-category" element={<AddCategory />} />
//           <Route path="update-category" element={<UpdateCategory />} />
//           <Route path="update-product/:productId" element={<AddProduct />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Product from "./components/Product";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import UserProfile from "./components/UserProfile";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import Products from "./components/Admin/Products";
import AddProduct from "./components/Admin/AddProduct";
import Payments from "./components/Admin/Payments";
import Customers from "./components/Admin/Customers";
import Orders from "./components/Admin/Orders";
import AddCategory from "./components/Admin/AddCategory";
import CartItems from "./components/CartItems";
import Category from "./components/Category";
import SinglePage from "./components/SinglePage";
import NotFound from "./components/NotFound";
import SearchResults from "./components/SearchResults";
import UpdateCategory from "./components/Admin/UpdateCategory";
import UserOrders from "./components/Orders";
import AdminRoute from "./components/Admin/AdminRoute";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";
import 'animate.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:id/:name" element={<SinglePage/>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/user-orders" element={<UserOrders/>} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<AdminRoute element={Dashboard} />} />
          <Route path="products" element={<AdminRoute element={Products} />} />
          <Route path="customers" element={<AdminRoute element={Customers} />} />
          <Route path="orders" element={<AdminRoute element={Orders} />} />
          <Route path="payments" element={<AdminRoute element={Payments} />} />
          <Route path="add-product" element={<AdminRoute element={AddProduct} />} />
          <Route path="add-category" element={<AdminRoute element={AddCategory} />} />
          <Route path="update-category" element={<AdminRoute element={UpdateCategory} />} />
          <Route path="update-product/:productId" element={<AdminRoute element={AddProduct} />} />
        </Route>

        <Route path="/payment-successful" element={<PaymentSuccess/>} />
        <Route path="/payment-cancel" element={<PaymentCancel/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;