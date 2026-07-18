import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { OverlayProvider } from "overlay-kit";

import Layout from "@/components/Layout";
import "./App.css";

const MainPage = lazy(() => import("@/pages/main"));
const SavedPage = lazy(() => import("@/pages/saved"));

export default function App() {
  return (
    <OverlayProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div className="h-screen flex justify-center items-center">로딩 중...</div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/saved" element={<SavedPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </OverlayProvider>
  );
}
