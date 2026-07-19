import { useLiveQuery } from "dexie-react-hooks";

import SavedList from "@/components/SavedList";
import WinningStats from "@/components/WinningStats";
import SortDropdown from "@/components/WinningStats/SortDropdown";
import { db } from "@/db/savedDraw";

export default function SavedPage() {
  const total = useLiveQuery(() => db.savedDraws.count(), [], 0);

  return (
    <div className="m-auto flex max-w-2xl flex-col items-center justify-center gap-4">
      {total > 0 && <WinningStats />}
      <div className="flex w-full max-w-xl justify-end">
        <SortDropdown />
      </div>
      <SavedList />
    </div>
  );
}
