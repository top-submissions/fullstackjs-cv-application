import { createContext } from 'react';
import { initialEducationalExperience } from '../FormPlaceholders/educationalExperiencePlaceholders.js';

const EducationalExperienceContext = createContext({
  educationalExperience: initialEducationalExperience,
  updateEducationalExperience: () => {},
});

export default EducationalExperienceContext;
