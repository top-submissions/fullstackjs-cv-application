import React from 'react';
import styles from './App.module.css';
import GeneralInformationForm from './components/forms/GeneralInformationForm/GeneralInformationForm';
import EducationalExperienceForm from './components/forms/EducationalExperienceForm/EducationalExperienceForm';
import PracticalExperienceForm from './components/forms/PracticalExperienceForm/PracticalExperienceForm';
import CVPreview from './components/views/CVPreview/CVPreview';

function App() {
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.headerTitle}>CV Application</h1>
      <div className={styles.mainContent}>
        <div className={styles.formSide}>
          <GeneralInformationForm />
          <EducationalExperienceForm />
          <PracticalExperienceForm />
        </div>
        <div className={styles.previewSide}>
          <CVPreview />
        </div>
      </div>
      <button className={styles.printButton} onClick={() => window.print()}>
        Print / Export
      </button>
    </div>
  );
}

export default App;
