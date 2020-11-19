import React from 'react';
import styles from './KContent.module.scss';

const KContent: React.FC = ({ children }) => (
  <main className={styles.content}>{children}</main>
);

export default KContent;
