import { createContext } from 'react';
import initialGeneralInformation from '../FormPlaceholders/generalInformationPlaceholders.js';

export const GeneralInformationContext = createContext(
  initialGeneralInformation,
);
