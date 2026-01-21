import React from 'react';
import styles from './CVPreview.module.css';
import { useContext } from 'react';
import GeneralInformationContext from '../../../modules/data/contexts/GeneralInformationContext';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext';

const CVPreview = () => {
  const { generalInformation } = useContext(GeneralInformationContext);
  const { educationalExperience } = useContext(EducationalExperienceContext);

  return (
    <div className={styles.previewContainer}>
      <h2>General Information</h2>
      <p>{generalInformation.name}</p>
      <p>{generalInformation.email}</p>
      <p>{generalInformation.phone}</p>
      <h2>Educational Experience</h2>
      {educationalExperience.map((entry) => (
        <div key={entry.id}>
          <p>{entry.schoolName}</p>
          <p>{entry.titleOfStudy}</p>
          <p>{entry.dateOfStudy}</p>
        </div>
      ))}
      <h2>Practical Experience</h2>
    </div>
  );
};

export default CVPreview;
