import { cookies } from 'next/headers';
import type {Note} from '@/types/note';
import type {User} from '@/types/user';
import { fetchAxios } from './api';
import { FetchNotesRequest, FetchNotesResponse, PER_PAGE } from './clientApi';

export async function fetchServerNotes({
  search,
  page,
  tag,
}: FetchNotesRequest): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const response = await fetchAxios.get<FetchNotesResponse>('notes', {
    params: {
      tag,
      search,
      page,
      perPage: PER_PAGE,
    },

    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export async function fetchServerOneNote(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await fetchAxios.get<Note>(`notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const data = await fetchAxios.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await fetchAxios.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};