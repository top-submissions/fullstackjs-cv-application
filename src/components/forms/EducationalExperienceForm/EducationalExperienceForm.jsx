import React, { useState } from 'react'; // ADDED: React and useState import

function EducationalExperienceForm() {
  const [schoolName, setSchoolName] = useState('');
  const [titleOfStudy, setTitleOfStudy] = useState('');
  const [dateOfStudy, setDateOfStudy] = useState('');

  return (
    <div>
      <h2>Educational Experience</h2>
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
      <div>
        <p>{schoolName}</p>
        <p>{titleOfStudy}</p>
        <p>{dateOfStudy}</p>
      </div>
    </div>
  );
}

export default EducationalExperienceForm;
