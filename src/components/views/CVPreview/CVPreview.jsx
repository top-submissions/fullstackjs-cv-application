import React from 'react';
import styles from './CVPreview.module.css';
import { useContext } from 'react';
import { GeneralInformationContext } from '../../../modules/data/contexts/GeneralInformationContext';

const CVPreview = () => {
  const { generalInformation } = useContext(GeneralInformationContext);

  return (
    <div className={styles.previewContainer}>
      <h2>General Information</h2>
      <p>{generalInformation.name}</p>
      <p>{generalInformation.email}</p>
      <p>{generalInformation.phone}</p>
      <h2>Educational Experience</h2>
      <h2>Practical Experience</h2>
    </div>
  );
};

export default CVPreview;
