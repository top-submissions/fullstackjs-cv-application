import { createContext, useState } from 'react';

const initialGeneralInformation = {
  name: '',
  email: '',
  phone: '',
};

export const GeneralInformationContext = createContext(
  initialGeneralInformation,
);

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
