import React from 'react';
import GeneralInformationForm from './components/forms/GeneralInformationForm/GeneralInformationForm';
import EducationalExperienceForm from './components/forms/EducationalExperienceForm/EducationalExperienceForm';

function App() {
  return (
    <div>
      <h1>CV Application</h1>
      <GeneralInformationForm />
      <EducationalExperienceForm />
    </div>
  );
}

export default App;
