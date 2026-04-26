import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Create a new note in NoteHub. Capture your ideas and save them securely in your personal space.",
  openGraph: {
    title: "Create New Note | NoteHub",
    description:
      "Capture your ideas and save them securely in your personal space.",
    url: "/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub-create-note",
      },
    ],
    type: "website",
  },
};

const CreateNote = () => {
  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </div>
      </main>
    </>
  );
};

export default CreateNote;