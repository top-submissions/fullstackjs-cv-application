import React, { useState } from 'react';

function EducationalExperienceForm() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      schoolName: '',
      titleOfStudy: '',
      dateOfStudy: '',
      isSubmitted: false,
    },
  ]);

  const handleAdd = () => {
    setEntries([
      ...entries,
      {
        id: Date.now() + Math.random(),
        schoolName: '',
        titleOfStudy: '',
        dateOfStudy: '',
        isSubmitted: false,
      },
    ]);
  };

  const handleUpdate = (id, field, value) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleSubmit = (id) => {
    const entry = entries.find((e) => e.id === id);
    const dateRegex = /^[\d\s\-/]+$/;
    if (
      entry &&
      entry.schoolName.trim() &&
      entry.titleOfStudy.trim() &&
      entry.dateOfStudy.trim() &&
      dateRegex.test(entry.dateOfStudy)
    ) {
      setEntries(
        entries.map((entry) =>
          entry.id === id ? { ...entry, isSubmitted: true } : entry,
        ),
      );
    }
  };

  const handleEdit = (id) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, isSubmitted: false } : entry,
      ),
    );
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div>
      <h2>Educational Experience</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          {!entry.isSubmitted ? (
            <>
              <label>
                School Name:{' '}
                <input
                  type="text"
                  value={entry.schoolName}
                  onChange={(e) =>
                    handleUpdate(entry.id, 'schoolName', e.target.value)
                  }
                />{' '}
              </label>
              <label>
                Title of Study:{' '}
                <input
                  type="text"
                  value={entry.titleOfStudy}
                  onChange={(e) =>
                    handleUpdate(entry.id, 'titleOfStudy', e.target.value)
                  }
                />{' '}
              </label>
              <label>
                Date of Study:{' '}
                <input
                  type="date"
                  value={entry.dateOfStudy}
                  onChange={(e) =>
                    handleUpdate(entry.id, 'dateOfStudy', e.target.value)
                  }
                />{' '}
              </label>
              <button onClick={() => handleSubmit(entry.id)}>Submit</button>
              <div>
                <p>{entry.schoolName}</p>
                <p>{entry.titleOfStudy}</p>
                <p>{entry.dateOfStudy}</p>
              </div>
            </>
          ) : (
            <div>
              <p>{entry.schoolName}</p>
              <p>{entry.titleOfStudy}</p>
              <p>{entry.dateOfStudy}</p>
              <button onClick={() => handleEdit(entry.id)}>Edit</button>
              <button onClick={() => handleDelete(entry.id)}>
                Delete
              </button>{' '}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default EducationalExperienceForm;
