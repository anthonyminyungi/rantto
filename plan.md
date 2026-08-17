1. **Optimize `useWinningHistory` hook**
   - Change `useLiveQuery` in `src/hooks/winningHistory.ts` to fetch only the `targetRound` via `.get()` and the `.last()` record instead of loading the entire table with `.toArray()`. This alone drastically reduces memory allocation and overhead.
2. **Refactor `SavedList` to fetch histories in bulk**
   - Modify `src/components/SavedList/index.tsx` to collect all unique `round`s from the `list`.
   - Use a single `useLiveQuery` to bulk fetch these rounds via `db.winningHistory.where('round').anyOf(rounds).toArray()`, and also fetch the `last()` record.
   - Map the histories to their corresponding list items.
3. **Refactor `SavedItem` to accept `history` via props**
   - Modify `src/components/SavedItem/index.tsx` to receive `history` as a prop instead of calling `useWinningHistory` internally. This perfectly resolves the N+1 query problem because `SavedList` now handles the data fetching once at the parent level.
4. **Update the Benchmark**
   - Update `src/benchmark.spec.tsx` to supply the `history` prop so the test passes and measures the new performance.
5. **Complete pre-commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
6. **Submit PR**
   - Verify the performance boost, run tests and lints, and submit the changes.
