export interface IDropZoneFile extends File {
  path?: string;
}

export interface IDocument {
  id?: number;
  name: string;
  type: string;
  description: string;
  candidateId: string;
  path?: string;
  file: IDropZoneFile;
}
