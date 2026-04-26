import { create } from "zustand";
import { CreateNoteProps } from "../api";
import { persist } from "zustand/middleware";

type noteStore = {
  draft: CreateNoteProps;
  setDraft: (note: CreateNoteProps) => void;
  clearDraft: () => void;
};
const initialDraft: CreateNoteProps = {
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