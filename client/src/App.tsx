import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Layout from "./components/Layout";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/loginPage";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          {/* public route */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/productDetail/:id" element={<ProductDetailPage />} />
            
            {/* protect route */}
            <Route element={<ProtectRoute allowedRole={["admin"]} />}>
              <Route path="/admin/:id" element={<AdminPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
