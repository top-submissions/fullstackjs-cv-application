import React, { useState, useContext, useEffect } from 'react';
import styles from './PracticalExperienceForm.module.css';
import PracticalExperienceContext from '../../../modules/data/contexts/PracticalExperienceContext';

function PracticalExperienceForm() {
  const { practicalExperience, updatePracticalExperience } = useContext(
    PracticalExperienceContext,
  );

  const [entries, setEntries] = useState(practicalExperience);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setEntries(practicalExperience);
  }, [practicalExperience]);

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
      updatePracticalExperience([
        ...practicalExperience.map((contextEntry) =>
          contextEntry.id === id
            ? { ...entry, isSubmitted: true }
            : contextEntry,
        ),
        {
          id: crypto.randomUUID(),
          companyName: '',
          positionTitle: '',
          dateOfEmployment: '',
          isSubmitted: false,
        },
      ]);
    }
  };

  const handleEdit = (id) => {
    const entryToEdit = practicalExperience.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditingId(id);
      setEntries(
        entries.map((entry) =>
          !entry.isSubmitted
            ? {
                ...entry,
                companyName: entryToEdit.companyName,
                positionTitle: entryToEdit.positionTitle,
                dateOfEmployment: entryToEdit.dateOfEmployment,
              }
            : entry,
        ),
      );
    }
  };

  const handleDelete = (id) => {
    updatePracticalExperience(
      practicalExperience.filter((entry) => entry.id !== id),
    );
  };

  const submittedEntries = entries.filter((entry) => entry.isSubmitted);
  const unsubmittedEntries = entries.filter((entry) => !entry.isSubmitted);

  return (
    <div className={styles.formSection}>
      <h2>Practical Experience</h2>
      {unsubmittedEntries.map((entry) => (
        <div key={entry.id}>
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
        </div>
      ))}
      {submittedEntries.length > 0 && (
        <table className={styles.submittedEntriesTable}>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Position Title</th>
              <th>Date of Employment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.companyName}</td>
                <td>{entry.positionTitle}</td>
                <td>{entry.dateOfEmployment}</td>
                <td>
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
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PracticalExperienceForm;
