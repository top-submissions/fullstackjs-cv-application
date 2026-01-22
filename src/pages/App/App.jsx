import React from 'react';
// import '../../styles/index.css';
import styles from './App.module.css';
import GeneralInformationForm from '../../components/forms/GeneralInformationForm/GeneralInformationForm';
import EducationalExperienceForm from '../../components/forms/EducationalExperienceForm/EducationalExperienceForm';
import PracticalExperienceForm from '../../components/forms/PracticalExperienceForm/PracticalExperienceForm';
import CVPreview from '../../components/views/CVPreview/CVPreview';
import GeneralInformationProvider from '../../components/providers/GeneralInformationProvider/GeneralInformationProvider';
import EducationalExperienceProvider from '../../components/providers/EducationalExperienceProvider/EducationalExperienceProvider';
import PracticalExperienceProvider from '../../components/providers/PracticalExperienceProvider/PracticalExperienceProvider';

function App() {
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.headerTitle}>CV Application</h1>
      <GeneralInformationProvider>
        <EducationalExperienceProvider>
          <PracticalExperienceProvider>
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
          </PracticalExperienceProvider>
        </EducationalExperienceProvider>
      </GeneralInformationProvider>
      <button className={styles.printButton} onClick={() => window.print()}>
        Print / Export
      </button>
    </div>
  );
}

export default App;
