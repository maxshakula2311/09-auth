import { fetchServerOneNote } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import css from "./NoteDetails.module.css";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerOneNote(id);

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.slice(0, 160),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: `Category: ${note.tag}. View the note on NoteHub.`,
      url: `/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${note.tag}: ${note.title}`,
        },
      ],
      type: "article",
    },
  };
}

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  console.log("note id:", id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerOneNote(id),
  });

  return (
    <>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
        </HydrationBoundary>
      </main>
    </>
  );
};

export default NoteDetails;