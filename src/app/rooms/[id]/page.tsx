import { notFound } from "next/navigation";
import SuiteProductView from "@/components/booking/SuiteProductView";
import { isSuiteBookable } from "@/lib/suite-availability";
import { getSuite, suites } from "@/lib/suites";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return suites.map((suite) => ({ id: suite.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const suite = getSuite(id);
  if (!suite) return { title: "Suite not found" };
  return {
    title: `${suite.title} | The O' Apartments`,
    description: suite.description.slice(0, 155),
  };
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const suite = getSuite(id);
  if (!suite) notFound();
  const bookable = await isSuiteBookable(suite.id);
  return <SuiteProductView suite={suite} bookable={bookable} />;
}
