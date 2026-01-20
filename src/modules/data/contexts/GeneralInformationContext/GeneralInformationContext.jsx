import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const GeneralInformationContext = createContext();

export const GeneralInformationProvider = ({ children }) => {
  const [generalInformation, setGeneralInformation] = useState({
    name: '',
    email: '',
    phone: '',
  });

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

GeneralInformationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialData: PropTypes.object,
};

export const useGeneralInformation = () => {
  const context = useContext(GeneralInformationContext);

  if (context === undefined) {
    throw new Error(
      'useGeneralInformation must be used within a GeneralInformationProvider',
    );
  }

  return context;
};
