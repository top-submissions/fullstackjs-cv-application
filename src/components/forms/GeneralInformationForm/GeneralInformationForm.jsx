import React, { useContext } from 'react';
import styles from './GeneralInformationForm.module.css';
import GeneralInformationContext from '../../../modules/data/contexts/GeneralInformationContext'; // ADDED: Import context

function GeneralInformationForm() {
  const { generalInformation, updateGeneralInformation } = useContext(
    GeneralInformationContext,
  );

  const handleNameChange = (e) => {
    updateGeneralInformation({
      ...generalInformation,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    updateGeneralInformation({
      ...generalInformation,
      email: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    updateGeneralInformation({
      ...generalInformation,
      phone: e.target.value,
    });
  };

  return (
    <div className={styles.formSection}>
      <h2>General Information</h2>
      <div className={styles.formContainer}>
        <label>
          Name:{' '}
          <input
            type="text"
            value={generalInformation.name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Email:{' '}
          <input
            type="email"
            value={generalInformation.email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Phone:{' '}
          <input
            type="tel"
            value={generalInformation.phone}
            onChange={handlePhoneChange}
          />
        </label>
      </div>
    </div>
  );
}

export default GeneralInformationForm;
