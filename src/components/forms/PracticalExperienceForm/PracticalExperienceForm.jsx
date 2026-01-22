import React, { useState, useContext, useEffect } from 'react';
import styles from './PracticalExperienceForm.module.css';
import PracticalExperienceContext from '../../../modules/data/contexts/PracticalExperienceContext';

function PracticalExperienceForm() {
  const { practicalExperience, updatePracticalExperience } = useContext(
    PracticalExperienceContext,
  );

  const [entries, setEntries] = useState(practicalExperience);

  useEffect(() => {
    setEntries(practicalExperience);
  }, [practicalExperience]);

  const handleAdd = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      companyName: '',
      positionTitle: '',
      dateOfEmployment: '',
      isSubmitted: false,
    };
    updatePracticalExperience([...practicalExperience, newEntry]);
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
      entry.companyName.trim() &&
      entry.positionTitle.trim() &&
      dateRegex.test(entry.dateOfEmployment)
    ) {
      updatePracticalExperience(
        practicalExperience.map((contextEntry) =>
          contextEntry.id === id
            ? { ...entry, isSubmitted: true }
            : contextEntry,
        ),
      );
    }
  };

  const handleEdit = (id) => {
    updatePracticalExperience(
      practicalExperience.map((entry) =>
        entry.id === id ? { ...entry, isSubmitted: false } : entry,
      ),
    );
  };

  const handleDelete = (id) => {
    updatePracticalExperience(
      practicalExperience.filter((entry) => entry.id !== id),
    );
  };

  return (
    <div className={styles.formSection}>
      <h2>Practical Experience</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          {!entry.isSubmitted ? (
            <>
              <div className={styles.formContainer}>
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
                    type="date"
                    value={entry.dateOfEmployment}
                    onChange={(e) =>
                      handleUpdate(entry.id, 'dateOfEmployment', e.target.value)
                    }
                  />{' '}
                </label>
                <button onClick={() => handleSubmit(entry.id)}>Submit</button>
              </div>
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
              <button
                className={styles.editButton}
                onClick={() => handleEdit(entry.id)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(entry.id)}
              >
                Delete
              </button>{' '}
            </div>
          )}
        </div>
      ))}
      <button className={styles.addButton} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default PracticalExperienceForm;
