import React from 'react';
import styles from './CVPreview.module.css';
import { useContext } from 'react';
import GeneralInformationContext from '../../../modules/data/contexts/GeneralInformationContext';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext';
import PracticalExperienceContext from '../../../modules/data/contexts/PracticalExperienceContext';

const CVPreview = () => {
  const { generalInformation } = useContext(GeneralInformationContext);
  const { educationalExperience } = useContext(EducationalExperienceContext);
  const { practicalExperience } = useContext(PracticalExperienceContext);

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
      {practicalExperience.map((entry) => (
        <div key={entry.id}>
          <p>{entry.companyName}</p>
          <p>{entry.positionTitle}</p>
          <p>{entry.dateOfEmployment}</p>
        </div>
      ))}
    </div>
  );
};

export default CVPreview;
