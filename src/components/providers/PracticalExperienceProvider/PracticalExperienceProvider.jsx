import { useState } from 'react';
import { initialPracticalExperience } from '../../../modules/data/FormPlaceholders/practicalExperiencePlaceholders.js';
import PracticalExperienceContext from '../../../modules/data/contexts/PracticalExperienceContext.jsx';

const PracticalExperienceProvider = ({ children }) => {
  const [practicalExperience, setPracticalExperience] = useState(
    initialPracticalExperience,
  );

  const updatePracticalExperience = (newData) => {
    setPracticalExperience(newData);
  };

  const values = {
    practicalExperience,
    updatePracticalExperience,
  };

  return (
    <PracticalExperienceContext.Provider value={values}>
      {children}
    </PracticalExperienceContext.Provider>
  );
};

export default PracticalExperienceProvider;
