import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteTag } from "@/types/note";
import { sidebarTags } from "@/lib/tags";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug?.[0];

  if (
    slug.length !== 1 ||
    !(currentTag === "all" || sidebarTags.includes(currentTag as NoteTag))
  ) {
    notFound();
  }

  const displayTag =
    currentTag === "all" ? "All notes" : `Notes: ${currentTag}`;

  return {
    title: `${displayTag} | NoteHub`,
    description: `View and manage notes in the '${currentTag}' category on NoteHub.`,
    openGraph: {
      title: `Note: ${currentTag}`,
      description: `View and manage notes in the '${currentTag}' category on NoteHub.`,
      url: `/notes/filter/${currentTag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${currentTag}`,
        },
      ],
      type: "website",
    },
  };
}

type NoteFiltersProps = {
  params: Promise<{ slug: string[] }>;
};

const NoteFilters = async ({ params }: NoteFiltersProps) => {
  const { slug } = await params;

  const category = slug[0] === "all" ? undefined : slug[0];
  console.log("🚀 ~ NoteFilters ~ category:", category);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotes({ search: "", page: 1, tag: category }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={category} />
      </HydrationBoundary>
    </>
  );
};

export default NoteFilters;