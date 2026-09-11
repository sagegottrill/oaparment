import { createClient } from "@/lib/supabase/server";

export type BookableSuiteIds = {
  "unit-a": boolean;
  "unit-b": boolean;
};

/** Guest-facing availability. Hidden suites are filtered by RLS for anon users. */
export async function getBookableSuiteIds(): Promise<BookableSuiteIds> {
  const availability: BookableSuiteIds = { "unit-a": false, "unit-b": false };

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("suites").select("id");
    for (const row of data ?? []) {
      if (row.id === "unit-a" || row.id === "unit-b") {
        availability[row.id] = true;
      }
    }
  } catch {
    return { "unit-a": true, "unit-b": true };
  }

  return availability;
}

export async function isSuiteBookable(suiteId: string) {
  const availability = await getBookableSuiteIds();
  if (suiteId === "unit-a" || suiteId === "unit-b") {
    return availability[suiteId];
  }
  return false;
}
