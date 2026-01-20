import React from 'react';
import styles from './CVPreview.module.css';

const CVPreview = () => {
  return (
    <div className={styles.previewContainer}>
      <h2>General Information</h2>
      <h2>Educational Experience</h2>
      <h2>Practical Experience</h2>
    </div>
  );
};

export default CVPreview;
