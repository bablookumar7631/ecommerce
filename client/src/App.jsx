import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Product from "./components/Product";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
