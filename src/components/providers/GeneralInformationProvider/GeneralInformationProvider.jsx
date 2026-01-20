import { useState } from 'react';
import initialGeneralInformation from '../../FormPlaceholders/generalInformationPlaceholders.js';

export const GeneralInformationProvider = ({ children }) => {
  const [generalInformation, setGeneralInformation] = useState(
    initialGeneralInformation,
  );

  const updateGeneralInformation = (newData) => {
    setGeneralInformation(newData);
  };

  const values = {
    generalInformation,
    updateGeneralInformation,
  };

  return (
    <GeneralInformationContext.Provider value={values}>
      {children}
    </GeneralInformationContext.Provider>
  );
};
