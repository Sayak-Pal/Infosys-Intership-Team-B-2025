import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user, updateUser, logout, fitnessData } = useUser(); // Destructure logout
  const navigate = useNavigate(); // Hook for redirection
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});

  // Safety check: Don't render if data is missing
  if (!user || !fitnessData) {
    return <div style={{padding: '2rem', textAlign: 'center'}}>Loading Profile...</div>;
  }

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleReset = () => {
    // We treat "Reset" as Logout for now, since we handle data in the backend
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login'); // Redirect to login page
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setEditData(prev => {
      const currentArray = prev[field] || []; // Ensure array exists
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ 
        background: 'linear-gradient(135deg, var(--fitness-green), var(--energy-orange))',
        color: 'white',
        padding: '2rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Profile Settings
              </h1>
              <p style={{ opacity: 0.9 }}>
                Manage your fitness profile and preferences
              </p>
            </div>
            <Link to="/dashboard" className="btn" style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              textDecoration: 'none'
            }}>
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Basic Information */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Basic Information</h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={handleSave}
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(user);
                    }}
                    className="btn"
                    style={{ backgroundColor: 'var(--text-gray)', color: 'white' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem'
            }}>
              <div className="form-group">
                <label className="form-label">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    className="form-input"
                    value={editData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                ) : (
                  <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                    {user.age} years
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Sex</label>
                {isEditing ? (
                  <div className="checkbox-group">
                    {['male', 'female', 'other'].map(option => (
                      <div
                        key={option}
                        className={`checkbox-item ${editData.sex === option ? 'selected' : ''}`}
                        onClick={() => handleInputChange('sex', option)}
                      >
                        <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                    {user.sex ? (user.sex.charAt(0).toUpperCase() + user.sex.slice(1)) : ''}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Height</label>
                {isEditing ? (
                  <input
                    type="number"
                    className="form-input"
                    value={editData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                ) : (
                  <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                    {user.height} cm
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Weight</label>
                {isEditing ? (
                  <input
                    type="number"
                    className="form-input"
                    value={editData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                ) : (
                  <div>
                    <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                      {user.weight} kg
                    </p>
                    {fitnessData.bmi && (
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: fitnessData.bmiCategory?.color || 'black',
                        fontWeight: '600'
                      }}>
                        BMI: {fitnessData.bmi} ({fitnessData.bmiCategory?.category || ''})
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Fitness Goals</h3>
            
            <div className="form-group">
              <label className="form-label">Current Goal</label>
              {isEditing ? (
                <div className="checkbox-group">
                  {['weight_loss', 'muscle_gain', 'fat_loss_toning', 'general_fitness', 'endurance'].map(goal => (
                    <div
                      key={goal}
                      className={`checkbox-item ${editData.fitnessGoal === goal ? 'selected' : ''}`}
                      onClick={() => handleInputChange('fitnessGoal', goal)}
                    >
                      <span>{goal.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  {user.fitnessGoal ? user.fitnessGoal.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : ''}
                </p>
              )}
            </div>

            <div className="form-group" style={{marginTop: '1rem'}}>
              <label className="form-label">Fitness Level</label>
              {isEditing ? (
                <div className="checkbox-group">
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <div
                      key={level}
                      className={`checkbox-item ${editData.fitnessLevel === level ? 'selected' : ''}`}
                      onClick={() => handleInputChange('fitnessLevel', level)}
                    >
                      <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  {user.fitnessLevel ? (user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)) : ''}
                </p>
              )}
            </div>
          </div>

          {/* Health & Diet */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Health & Dietary Preferences</h3>
            
            <div className="form-group">
              <label className="form-label">Health Problems</label>
              {isEditing ? (
                <div className="checkbox-group">
                  {['none', 'knee_pain', 'back_pain', 'heart_condition', 'diabetes', 'asthma'].map(problem => (
                    <div
                      key={problem}
                      className={`checkbox-item ${editData.healthProblems?.includes(problem) ? 'selected' : ''}`}
                      onClick={() => handleMultiSelect('healthProblems', problem)}
                    >
                      <span>{problem.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  {user.healthProblems && user.healthProblems.length > 0 ? user.healthProblems.join(', ') : 'None'}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Cuisines</label>
              {isEditing ? (
                <div className="checkbox-group">
                  {['indian', 'continental', 'mediterranean', 'asian', 'keto', 'vegan'].map(cuisine => (
                    <div
                      key={cuisine}
                      className={`checkbox-item ${editData.preferredCuisines?.includes(cuisine) ? 'selected' : ''}`}
                      onClick={() => handleMultiSelect('preferredCuisines', cuisine)}
                    >
                      <span>{cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  {user.preferredCuisines && user.preferredCuisines.length > 0 ? user.preferredCuisines.join(', ') : 'None'}
                </p>
              )}
            </div>
          </div>

          {/* Logout Zone */}
          <div className="card" style={{ border: '2px solid #ef4444' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Logout</h3>
            <p style={{ marginBottom: '1rem', color: 'var(--text-gray)' }}>
              Sign out of your account on this device.
            </p>
            <button 
              onClick={handleReset}
              className="btn"
              style={{ backgroundColor: '#ef4444', color: 'white' }}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;