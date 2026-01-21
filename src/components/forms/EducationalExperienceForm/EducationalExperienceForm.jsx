import React, { useContext } from 'react'; // MODIFIED: Added useContext import
import styles from './EducationalExperienceForm.module.css';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext'; // ADDED: Import context

function EducationalExperienceForm() {
  const { educationalExperience, updateEducationalExperience } = useContext(
    EducationalExperienceContext,
  );

  const handleAdd = () => {
    updateEducationalExperience([
      ...educationalExperience,
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
    updateEducationalExperience(
      educationalExperience.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleSubmit = (id) => {
    const entry = educationalExperience.find((e) => e.id === id);
    const dateRegex = /^[\d\s\-/]+$/;
    if (
      entry &&
      entry.schoolName.trim() &&
      entry.titleOfStudy.trim() &&
      entry.dateOfStudy.trim() &&
      dateRegex.test(entry.dateOfStudy)
    ) {
      updateEducationalExperience(
        educationalExperience.map((entry) =>
          entry.id === id ? { ...entry, isSubmitted: true } : entry,
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
      {educationalExperience.map((entry) => (
        <div key={entry.id}>
          {!entry.isSubmitted ? (
            <>
              <div className={styles.formContainer}>
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
              </div>
            </>
          ) : (
            <div>
              <p>{entry.schoolName}</p>
              <p>{entry.titleOfStudy}</p>
              <p>{entry.dateOfStudy}</p>
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

export default EducationalExperienceForm;
