import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import MainPage from "@/pages/main";
import SavedPage from "@/pages/saved";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
