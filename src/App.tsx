import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OverlayProvider } from "overlay-kit";

import Layout from "@/components/Layout";
import MainPage from "@/pages/main";
import SavedPage from "@/pages/saved";
import "./App.css";

export default function App() {
  return (
    <OverlayProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/saved" element={<SavedPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </OverlayProvider>
  );
}
