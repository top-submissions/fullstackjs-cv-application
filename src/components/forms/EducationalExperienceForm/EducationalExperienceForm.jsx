import React, { useContext, useState, useEffect } from 'react';
import styles from './EducationalExperienceForm.module.css';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext';

function EducationalExperienceForm() {
  const { educationalExperience, updateEducationalExperience } = useContext(
    EducationalExperienceContext,
  );

  const [localEntries, setLocalEntries] = useState(educationalExperience);

  useEffect(() => {
    setLocalEntries(educationalExperience);
  }, [educationalExperience]);

  const handleAdd = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      schoolName: '',
      titleOfStudy: '',
      dateOfStudy: '',
      isSubmitted: false,
    };
    updateEducationalExperience([...educationalExperience, newEntry]);
  };

  const handleUpdate = (id, field, value) => {
    setLocalEntries(
      localEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleSubmit = (id) => {
    const entry = localEntries.find((e) => e.id === id);
    const dateRegex = /^[\d\s\-/]+$/;
    if (
      entry &&
      entry.schoolName.trim() &&
      entry.titleOfStudy.trim() &&
      entry.dateOfStudy.trim() &&
      dateRegex.test(entry.dateOfStudy)
    ) {
      updateEducationalExperience(
        educationalExperience.map((contextEntry) =>
          contextEntry.id === id
            ? { ...entry, isSubmitted: true }
            : contextEntry,
        ),
      );
    }
  };

  const handleEdit = (id) => {
    updateEducationalExperience(
      educationalExperience.map((entry) =>
        entry.id === id ? { ...entry, isSubmitted: false } : entry,
      ),
    );
  };

  const handleDelete = (id) => {
    updateEducationalExperience(
      educationalExperience.filter((entry) => entry.id !== id),
    );
  };

  return (
    <div className={styles.formSection}>
      <h2>Educational Experience</h2>
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
          {localEntries.map((entry) => (
            <tr key={entry.id}>
              {!entry.isSubmitted ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={entry.schoolName}
                      onChange={(e) =>
                        handleUpdate(entry.id, 'schoolName', e.target.value)
                      }
                      aria-label="School Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={entry.titleOfStudy}
                      onChange={(e) =>
                        handleUpdate(entry.id, 'titleOfStudy', e.target.value)
                      }
                      aria-label="Title of Study"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={entry.dateOfStudy}
                      onChange={(e) =>
                        handleUpdate(entry.id, 'dateOfStudy', e.target.value)
                      }
                      aria-label="Date of Study"
                    />
                  </td>
                  <td>
                    <button
                      className={styles.submitButton}
                      onClick={() => handleSubmit(entry.id)}
                    >
                      Submit
                    </button>
                  </td>
                </>
              ) : (
                <>
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
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default EducationalExperienceForm;
