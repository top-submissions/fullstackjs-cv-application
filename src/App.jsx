import React from 'react';
import styles from './App.module.css';
import GeneralInformationForm from './components/forms/GeneralInformationForm/GeneralInformationForm';
import EducationalExperienceForm from './components/forms/EducationalExperienceForm/EducationalExperienceForm';
import PracticalExperienceForm from './components/forms/PracticalExperienceForm/PracticalExperienceForm';

function App() {
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.headerTitle}>CV Application</h1>
      <GeneralInformationForm />
      <EducationalExperienceForm />
      <PracticalExperienceForm />
      <button className={styles.printButton} onClick={() => window.print()}>
        Print / Export
      </button>
    </div>
  );
}

export default App;
