import React, { useState } from 'react';
import styles from './KFile.module.scss';
import AttachFileIcon from '@material-ui/icons/AttachFile';

interface KFileProps {
  name?: string;
  accept?: string;
  onChange: (ev: any) => void;
}

const KFile: React.FC<KFileProps> = ({ name, accept, onChange }) => {
  const [label, setLabel] = useState<string>('Upload Resume');

  const handleChange = (ev: any) => {
    const fileName: string = ev.target?.files[0].name;
    setLabel(fileName);

    onChange(ev);
  };

  return (
    <>
      <input
        accept={accept}
        name={name}
        id="file"
        type="file"
        className={styles.kFile}
        onChange={handleChange}
      />
      <label htmlFor="file" className={styles.kFileLabel}>
        <AttachFileIcon />
        <span>{label}</span>
      </label>
    </>
  );
};

export default KFile;
