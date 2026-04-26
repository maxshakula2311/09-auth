import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404- NoteHub",
  description:
    "Unfortunately, the page you requested does not exist. Please return to the NoteHub homepage to continue creating notes.",
  openGraph: {
    title: "404- NoteHub",
    description:
      "Unfortunately, the page you requested does not exist. Please return to the NoteHub homepage to continue creating notes.",
    url: "/404",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub-images-logo",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <>
      <main className={css.main}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </main>
    </>
  );
};

export default NotFound;