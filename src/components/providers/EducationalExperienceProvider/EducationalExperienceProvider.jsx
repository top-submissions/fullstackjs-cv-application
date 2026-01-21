import { useState } from 'react';
import { initialEducationalExperience } from '../../../modules/data/FormPlaceholders/educationalExperiencePlaceholders.js';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext.jsx';

const EducationalExperienceProvider = ({ children }) => {
  const [educationalExperience, setEducationalExperience] = useState(
    initialEducationalExperience,
  );

  const updateEducationalExperience = (newData) => {
    setEducationalExperience(newData);
  };

  const values = {
    educationalExperience,
    updateEducationalExperience,
  };

  return (
    <EducationalExperienceContext.Provider value={values}>
      {children}
    </EducationalExperienceContext.Provider>
  );
};

export default EducationalExperienceProvider;
