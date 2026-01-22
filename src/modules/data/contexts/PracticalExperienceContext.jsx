import { createContext } from 'react';
import { initialPracticalExperience } from '../FormPlaceholders/practicalExperiencePlaceholders.js';

const PracticalExperienceContext = createContext({
  practicalExperience: initialPracticalExperience,
  updatePracticalExperience: () => {},
});

export default PracticalExperienceContext;
