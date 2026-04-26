import { fetchServerOneNote } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

interface NotesPreviewProps {
  params: Promise<{ id: string }>;
}

const NotesPreview = async ({ params }: NotesPreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerOneNote(id),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient />
      </HydrationBoundary>
    </>
  );
};
export default NotesPreview;