import React, { useState } from 'react';

function PracticalExperienceForm() {
  const [entries, setEntries] = useState([
    {
      id: crypto.randomUUID(),
      companyName: '',
      positionTitle: '',
      dateOfEmployment: '',
      isSubmitted: false,
    },
  ]);

  const handleAdd = () => {
    setEntries([
      ...entries,
      {
        id: crypto.randomUUID(),
        companyName: '',
        positionTitle: '',
        dateOfEmployment: '',
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
    if (
      entry &&
      entry.companyName.trim() &&
      entry.positionTitle.trim() &&
      entry.dateOfEmployment.trim()
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
      <h2>Practical Experience</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          {!entry.isSubmitted ? (
            <>
              <label>
                Company Name:{' '}
                <input
                  type="text"
                  value={entry.companyName}
                  onChange={(e) =>
                    handleUpdate(entry.id, 'companyName', e.target.value)
                  }
                />{' '}
              </label>
              <label>
                Position Title:{' '}
                <input
                  type="text"
                  value={entry.positionTitle}
                  onChange={(e) =>
                    handleUpdate(entry.id, 'positionTitle', e.target.value)
                  }
                />{' '}
              </label>
              <label>
                Date of Employment:{' '}
                <input
                  type="text"
                  value={entry.dateOfEmployment}
                  onChange={(e) =>
                    handleUpdate(entry.id, 'dateOfEmployment', e.target.value)
                  }
                />{' '}
              </label>
              <button onClick={() => handleSubmit(entry.id)}>Submit</button>
              <div>
                <p>{entry.companyName}</p>
                <p>{entry.positionTitle}</p>
                <p>{entry.dateOfEmployment}</p>
              </div>
            </>
          ) : (
            <div>
              <p>{entry.companyName}</p>
              <p>{entry.positionTitle}</p>
              <p>{entry.dateOfEmployment}</p>
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

export default PracticalExperienceForm;
