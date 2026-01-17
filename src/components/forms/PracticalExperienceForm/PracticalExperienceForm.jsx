import React, { useState } from 'react'; // ADDED: React and useState import

function PracticalExperienceForm() {
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [dateOfEmployment, setDateOfEmployment] = useState('');

  return (
    <div>
      <h2>Practical Experience</h2>
      <label>
        Company Name:{' '}
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />{' '}
      </label>
      <label>
        Position Title:{' '}
        <input
          type="text"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
        />{' '}
      </label>
      <label>
        Date of Employment:{' '}
        <input
          type="text"
          value={dateOfEmployment}
          onChange={(e) => setDateOfEmployment(e.target.value)}
        />{' '}
      </label>
      <div>
        <p>{companyName}</p>
        <p>{positionTitle}</p>
        <p>{dateOfEmployment}</p>
      </div>
    </div>
  );
}

export default PracticalExperienceForm;
