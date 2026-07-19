import DrawSection from "@/components/DrawSection";
import LastWeek from "@/components/LastWeek";
import InfoLink from "@/components/InfoLink";

export default function MainPage() {
  return (
    <div className="m-auto flex max-w-2xl flex-col items-center justify-center gap-4">
      <div className="m-auto my-6">
        <InfoLink />
      </div>
      <LastWeek />
      <DrawSection />
    </div>
  );
}
