import { INote } from 'modules/Candidates/typings';
import { apiClient } from './Client';

const addNew = (note: INote): Promise<INote> => {
  return apiClient
    .post<INote>('/note', {
      body: {
        candidateId: note.candidateId,
        note: note.noteComment,
        mentions: note.mentions,
      },
    })
    .then((res: INote) => res);
};

const deleteOne = (id: string) => {
  return apiClient.delete<INote>(`/note/${id}`).then((res) => res);
};

const editOne = (id: string, note: INote): Promise<INote> => {
  return apiClient
    .put<INote>(`/note/${id}`, {
      body: {
        candidateId: note.candidateId,
        note: note.noteComment,
        mentions: note.mentions,
      },
    })
    .then((res: INote) => res);
};

const getById = (id: string): Promise<INote> => {
  return apiClient
    .get<INote>(`/note/${id}`)
    .then((res: INote) => res);
};

export default {
  addNew,
  deleteOne,
  editOne,
  getById,
};
