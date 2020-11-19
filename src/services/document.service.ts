import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';
import { apiClient } from './Client';

const addNew = async (document: IDocument): Promise<IDocument> => {
  const formData = new FormData();
  formData.set('name', document.name);
  formData.set('candidateId', String(document.candidateId));
  formData.set('type', document.type);
  formData.set('description', document.description);
  formData.append('file', document.file);
  const user = window.sessionStorage.getItem('user');
  const userJSON = user ? JSON.parse(user) : '';
  const { REACT_APP_API_URL } = process.env;

  const res: Response = await fetch(
    `${REACT_APP_API_URL}/api/v1/document`,
    {
      headers: {
        authorization: `Bearer ${userJSON.token}`,
      },
      method: 'POST',
      body: formData,
    },
  );
  const doc: IDocument = await res.json();
  return doc;
};

const deleteOne = (id: number) => {
  return apiClient
    .delete<IDocument>(`/document/${id}`)
    .then((res) => res);
};

const getAll = (): Promise<IDocument[]> => {
  return apiClient
    .get<IDocument[]>('/document')
    .then((res: IDocument[]) => res);
};

const getDocument = async (path: string): Promise<string> => {
  const user = window.sessionStorage.getItem('user');
  const userJSON = user ? JSON.parse(user) : '';
  const res: Response = await fetch(path, {
    headers: {
      authorization: `Bearer ${userJSON.token}`,
    },
    method: 'GET',
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  return url;
};

export default {
  addNew,
  deleteOne,
  getAll,
  getDocument,
};
