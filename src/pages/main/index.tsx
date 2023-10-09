import DrawSection from "@/components/DrawSection";
import LastWeek from "@/components/LastWeek";
import Spacer from "@/components/Spacer";

export default function MainPage() {
  return (
    <>
      <LastWeek />
      <Spacer direction="vertical" space={"4"} />
      <DrawSection />
    </>
  );
}
