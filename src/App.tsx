import Layout from "@/components/Layout";
import { useMenuStore } from "@/store";
import MainPage from "@/pages/main";
import SavedPage from "@/pages/saved";
import "./App.css";

export default function App() {
  const { menu } = useMenuStore();
  return (
    <Layout>
      {menu === "main" && <MainPage />}
      {menu === "saved" && <SavedPage />}
    </Layout>
  );
}
