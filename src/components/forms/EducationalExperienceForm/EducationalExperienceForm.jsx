import React, { useContext, useState, useEffect } from 'react';
import styles from './EducationalExperienceForm.module.css';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext';

function EducationalExperienceForm() {
  const { educationalExperience, updateEducationalExperience } = useContext(
    EducationalExperienceContext,
  );

  const [localEntries, setLocalEntries] = useState(educationalExperience);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setLocalEntries(educationalExperience);
  }, [educationalExperience]);

  const handleUpdate = (id, field, value) => {
    setLocalEntries(
      localEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleUpdateEntry = () => {
    // Find the entry being edited from the context
    const entryToUpdate = educationalExperience.find((e) => e.id === editingId);
    // Find the unsubmitted entry which holds the current form data
    const formState = localEntries.find((e) => !e.isSubmitted);

    if (entryToUpdate && formState) {
      // Update the educationalExperience context with modified data
      updateEducationalExperience(
        educationalExperience.map((entry) =>
          entry.id === editingId
            ? {
                ...entryToUpdate,
                schoolName: formState.schoolName,
                titleOfStudy: formState.titleOfStudy,
                dateOfStudy: formState.dateOfStudy,
                isSubmitted: true,
              }
            : entry,
        ),
      );
      // Reset editing state
      setEditingId(null);
    }
  };

  const handleCreateEntry = (id) => {
    const entry = localEntries.find((e) => e.id === id);
    const dateRegex = /^[\d\s\-/]+$/;
    if (
      entry &&
      entry.schoolName.trim() &&
      entry.titleOfStudy.trim() &&
      entry.dateOfStudy.trim() &&
      dateRegex.test(entry.dateOfStudy)
    ) {
      updateEducationalExperience([
        ...educationalExperience.map((contextEntry) =>
          contextEntry.id === id
            ? { ...entry, isSubmitted: true }
            : contextEntry,
        ),
        {
          id: crypto.randomUUID(),
          schoolName: '',
          titleOfStudy: '',
          dateOfStudy: '',
          isSubmitted: false,
        },
      ]);
    }
  };

  const handleSubmit = (id) => {
    if (editingId) {
      handleUpdateEntry();
    } else {
      handleCreateEntry(id);
    }
  };

  const handleEdit = (id) => {
    // Find the entry being edited from the context
    const entryToEdit = educationalExperience.find((entry) => entry.id === id);

    if (entryToEdit) {
      setEditingId(id);
      // Update localEntries to load the data into the unsubmitted form
      setLocalEntries(
        localEntries.map((entry) =>
          !entry.isSubmitted
            ? {
                ...entry,
                schoolName: entryToEdit.schoolName,
                titleOfStudy: entryToEdit.titleOfStudy,
                dateOfStudy: entryToEdit.dateOfStudy,
              }
            : entry,
        ),
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    // Clear the form fields when canceling
    setLocalEntries(
      localEntries.map((entry) =>
        !entry.isSubmitted
          ? {
              ...entry,
              schoolName: '',
              titleOfStudy: '',
              dateOfStudy: '',
            }
          : entry,
      ),
    );
  };

  const handleDelete = (id) => {
    updateEducationalExperience(
      educationalExperience.filter((entry) => entry.id !== id),
    );
  };

  const submittedEntries = localEntries.filter((entry) => entry.isSubmitted);
  const unsubmittedEntries = localEntries.filter((entry) => !entry.isSubmitted);

  return (
    <div className={styles.formSection}>
      <h2>Educational Experience</h2>
      {unsubmittedEntries.map((entry) => (
        <div key={entry.id}>
          <div className={styles.formContainer}>
            <label>
              School Name:{' '}
              <input
                type="text"
                value={entry.schoolName}
                onChange={(e) =>
                  handleUpdate(entry.id, 'schoolName', e.target.value)
                }
                aria-label="School Name"
              />
            </label>
            <label>
              Title of Study:{' '}
              <input
                type="text"
                value={entry.titleOfStudy}
                onChange={(e) =>
                  handleUpdate(entry.id, 'titleOfStudy', e.target.value)
                }
                aria-label="Title of Study"
              />
            </label>
            <label>
              Date of Study:{' '}
              <input
                type="date"
                value={entry.dateOfStudy}
                onChange={(e) =>
                  handleUpdate(entry.id, 'dateOfStudy', e.target.value)
                }
                aria-label="Date of Study"
              />
            </label>
            <button onClick={() => handleSubmit(entry.id)}>
              {editingId ? 'Update' : 'Submit'}
            </button>
            {editingId && <button onClick={handleCancel}>Cancel</button>}
          </div>
        </div>
      ))}
      {submittedEntries.length > 0 && (
        <table className={styles.formContainer}>
          <thead>
            <tr>
              <th>School Name</th>
              <th>Title of Study</th>
              <th>Date of Study</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.schoolName}</td>
                <td>{entry.titleOfStudy}</td>
                <td>{entry.dateOfStudy}</td>
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

export default EducationalExperienceForm;
