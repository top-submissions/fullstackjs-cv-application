import { createContext } from 'react';
import initialGeneralInformation from '../FormPlaceholders/generalInformationPlaceholders.js';

const GeneralInformationContext = createContext(initialGeneralInformation);

export default GeneralInformationContext;
