import React, { useState } from 'react';
import styles from './GeneralInformationForm.module.css';

function GeneralInformationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className={styles.formSection}>
      <h2>General Information</h2>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:{' '}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default GeneralInformationForm;
