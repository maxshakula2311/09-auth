import { create } from "zustand";
import { CreateNoteRequest } from "../api/clientApi";
import { persist } from "zustand/middleware";

type noteStore = {
  draft: CreateNoteRequest;
  setDraft: (note: CreateNoteRequest) => void;
  clearDraft: () => void;
};
const initialDraft: CreateNoteRequest = {
  title: "",
  content: "",
  tag: "Todo",
};
export const useNoteStore = create<noteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: "note-draft", partialize: (state) => ({ draft: state.draft }) },
  ),
);