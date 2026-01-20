import { useState } from 'react';
import initialGeneralInformation from '../../../modules/data/FormPlaceholders/generalInformationPlaceholders.js';
import GeneralInformationContext from '../../../modules/data/contexts/GeneralInformationContext.jsx';

const GeneralInformationProvider = ({ children }) => {
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

export default GeneralInformationProvider;
