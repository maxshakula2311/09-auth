"use client";

import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesClientProps {
  tag: string | undefined;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes({ search, page, tag: tag }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 800);

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox onSearch={handleSearch} />}
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              setPage={setPage}
            />
          )}

          {
            <Link href={"/notes/action/create"} className={css.button}>
              Create note +
            </Link>
          }
        </header>
        {isLoading && <div>Loading posts...</div>}
        {isError && (
          <>
            <div>Something wrong...</div>
            <p>{error.message}</p>
          </>
        )}
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isSuccess && data.notes.length === 0 && (
          <p>Notes not found for your request.</p>
        )}
      </div>
    </>
  );
};

export default NotesClient;