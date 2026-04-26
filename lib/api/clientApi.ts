import type { Note } from "@/types/note";
import { fetchAxios } from "./api";
import { User } from "@/types/user";

export const PER_PAGE = 12;

export interface FetchNotesRequest {
  tag?: string;
  search: string;
  page: number;
}

export type CreateNoteRequest = {
  title: string;
  content: string;
  tag: Note["tag"];
};
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNotesRequest): Promise<FetchNotesResponse> {
  const response = await fetchAxios.get<FetchNotesResponse>("notes", {
    params: {
      tag,
      search,
      page,
      perPage: PER_PAGE,
    },
  });
  return response.data;
}

export async function fetchOneNote(id: string): Promise<Note> {
  const response = await fetchAxios.get<Note>(`notes/${id}`);
  return response.data;
}

export async function createNote(note: CreateNoteRequest) {
  const { data } = await fetchAxios.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await fetchAxios.delete<Note>(`/notes/${id}`);
  return data;
}

interface AuthRequest {
  email: string;
  password: string;
}

export const register = async (user: AuthRequest) => {
  const { data } = await fetchAxios.post<User>("/auth/register", user);
  return data;
};

export const login = async (user: AuthRequest) => {
  const { data } = await fetchAxios.post<User>("/auth/login", user);
  return data;
};

export const logout = async () => {
  const { data } = await fetchAxios.post<User>("/auth/logout");
  return data;
};

export const checkSession = async () => {
  const { data } = await fetchAxios.get("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await fetchAxios.get<User>("/users/me");
  return data;
};
export interface UpdateMeRequest {
  username?: string;
  email?: string;
}

export const updateMe = async (user: UpdateMeRequest) => {
  const { data } = await fetchAxios.patch<User>("/users/me", user);
  return data;
};