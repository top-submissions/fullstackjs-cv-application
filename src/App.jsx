import React from 'react';
import GeneralInformationForm from './components/forms/GeneralInformationForm/GeneralInformationForm';
import EducationalExperienceForm from './components/forms/EducationalExperienceForm/EducationalExperienceForm';
import PracticalExperienceForm from './components/forms/PracticalExperienceForm/PracticalExperienceForm';

function App() {
  return (
    <div>
      <h1>CV Application</h1>
      <GeneralInformationForm />
      <EducationalExperienceForm />
      <PracticalExperienceForm />
    </div>
  );
}

export default App;
