import React from 'react';
import { useField } from 'formik';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './KRichText.module.scss';
import classnames from 'classnames';

export interface KRichTextProps {
  name: string;
  placeholder?: string;
}

const KRichText: React.FC<KRichTextProps> = (props) => {
  const { name, placeholder } = props;
  const [field] = useField(name);

  const BackgroundClass = Quill.import(
    'attributors/class/background',
  );

  const SizeStyle = Quill.import('attributors/style/size');
  const Align = Quill.import('attributors/style/align');
  Quill.register(BackgroundClass, true);
  Quill.register(SizeStyle, true);
  Quill.register(Align, true);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ color: [] }], // dropdown with defaults from theme
      ['link'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ direction: 'rtl' }], // text direction
      ['clean'], // remove formatting button
    ],
  };

  return (
    <ReactQuill
      className={classnames(styles.tooltip, styles.editor)}
      value={field.value}
      onChange={field.onChange(field.name)}
      modules={modules}
      placeholder={placeholder}
    />
  );
};

export default KRichText;
