import Layout from "@/components/Layout";
import LastWeek from "@/components/LastWeek";
import DrawSection from "@/components/DrawSection";
import Spacer from "@/components/Spacer";

export default function App() {
  return (
    <Layout>
      <LastWeek />
      <Spacer direction="vertical" space={"4"} />
      <DrawSection />
    </Layout>
  );
}
