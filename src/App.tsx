import Layout from "@/components/Layout";
import LastWeek from "@/components/LastWeek";
import NavMenu from "@/components/NavMenu";

export default function App() {
  return (
    <Layout>
      <NavMenu
        tabs={[
          ["main", "메인"],
          ["saved", "저장 목록"],
        ]}
      />
      <LastWeek />
    </Layout>
  );
}
