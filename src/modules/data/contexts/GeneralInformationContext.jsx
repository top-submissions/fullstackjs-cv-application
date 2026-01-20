import { createContext } from 'react';
import { initialGeneralInformation } from '../FormPlaceholders/generalInformationPlaceholders.js';

const GeneralInformationContext = createContext({
  generalInformation: initialGeneralInformation,
  updateGeneralInformation: () => {},
});

export default GeneralInformationContext;
