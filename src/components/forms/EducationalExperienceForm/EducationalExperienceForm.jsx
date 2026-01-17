import React, { useState } from 'react';

function EducationalExperienceForm() {
  const [schoolName, setSchoolName] = useState('');
  const [titleOfStudy, setTitleOfStudy] = useState('');
  const [dateOfStudy, setDateOfStudy] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>Educational Experience</h2>
      {!isSubmitted ? (
        <>
          <label>
            School Name:{' '}
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />{' '}
          </label>
          <label>
            Title of Study:{' '}
            <input
              type="text"
              value={titleOfStudy}
              onChange={(e) => setTitleOfStudy(e.target.value)}
            />{' '}
          </label>
          <label>
            Date of Study:{' '}
            <input
              type="text"
              value={dateOfStudy}
              onChange={(e) => setDateOfStudy(e.target.value)}
            />{' '}
          </label>
          <button onClick={handleSubmit}>Submit</button>{' '}
          <div>
            <p>{schoolName}</p>
            <p>{titleOfStudy}</p>
            <p>{dateOfStudy}</p>
          </div>
        </>
      ) : (
        <div>
          <p>{schoolName}</p>
          <p>{titleOfStudy}</p>
          <p>{dateOfStudy}</p>
        </div>
      )}
    </div>
  );
}

export default EducationalExperienceForm;
