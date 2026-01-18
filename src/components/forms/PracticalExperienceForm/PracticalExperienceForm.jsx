import React, { useState } from 'react'; // ADDED: React and useState import

function PracticalExperienceForm() {
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [dateOfEmployment, setDateOfEmployment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <h2>Practical Experience</h2>
      {!isSubmitted ? (
        <>
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
          <button onClick={handleSubmit}>Submit</button>
          <div>
            <p>{companyName}</p>
            <p>{positionTitle}</p>
            <p>{dateOfEmployment}</p>
          </div>
        </>
      ) : (
        <div>
          <p>{companyName}</p>
          <p>{positionTitle}</p>
          <p>{dateOfEmployment}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default PracticalExperienceForm;
