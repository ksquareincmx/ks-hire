import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useField } from 'formik';
import KChip from 'components/KChip';
import { formatBytes } from 'utils/helpers';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: 'rgba(0, 0, 0, 0.38)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  minHeight: '30vh',
  justifyContent: 'center',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export interface KDropZoneProps {
  name: string;
  label: string;
}

const KDropZone: React.FC<KDropZoneProps> = ({ name }) => {
  const [field, , helpers] = useField(name);

  const onDrop = useCallback((acceptedFiles) => {
    // do nothing if no files
    if (acceptedFiles.length === 0) {
      return;
    }

    // on drop we add to the existing files
    helpers.setValue(acceptedFiles[0]);
    // eslint-disable-next-line
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.doc,.docx,',
    onDrop,
    maxSize: 52428800,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  ) as React.CSSProperties;

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>UPLOAD RESUME</p>
          <CloudUploadIcon fontSize="large" />
        </div>
        <p>Drag 'n' drop file here, or click to select file</p>
        <p>.pdf .doc .docx</p>
        <p>Max file size: 50MB</p>
      </div>
      {!Array.isArray(field.value) ? (
        <aside>
          <h4>File - Size: {formatBytes(field.value.size)} </h4>
          <KChip
            label={field.value.path}
            onDelete={() => helpers.setValue([])}
          />
        </aside>
      ) : (
        <>
          <h4>File:</h4>
          <p>The added file will be displayed here</p>
        </>
      )}
    </section>
  );
};

export default KDropZone;
