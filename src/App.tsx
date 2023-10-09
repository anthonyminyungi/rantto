import Layout from "@/components/Layout";
import { useMenuStore } from "@/store";
import MainPage from "@/pages/main";

export default function App() {
  const { menu } = useMenuStore();
  return (
    <Layout>
      {menu === "main" && <MainPage />}
      {menu === "saved" && <div> saved </div>}
    </Layout>
  );
}
