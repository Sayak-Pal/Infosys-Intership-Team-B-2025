import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const WorkoutDay = () => {
  const { week, day } = useParams();
  const { fitnessData } = useUser();

  if (!fitnessData) {
    return <div>Loading...</div>;
  }

  const workoutData = fitnessData.workoutPlan[`week${week}`][`day${day}`];
  
  if (!workoutData) {
    return <div>Workout not found</div>;
  }

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayName = dayNames[parseInt(day) - 1];

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
                Week {week} - {dayName}
              </h1>
              <p style={{ opacity: 0.9 }}>
                {workoutData.title} • {workoutData.phase}
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
        {workoutData.type === 'rest' ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--fitness-green)', marginBottom: '1rem' }}>
              🛌 Rest Day
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-gray)' }}>
              Recovery is just as important as training. Take time to rest and recharge.
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem' }}>
                <h4>💧 Stay Hydrated</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                  Drink plenty of water throughout the day
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.5rem' }}>
                <h4>🧘 Light Stretching</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                  Gentle stretches to maintain flexibility
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem' }}>
                <h4>😴 Quality Sleep</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                  Aim for 7-9 hours of restful sleep
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Workout Overview */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Workout Overview</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--fitness-green)' }}>Type</h4>
                  <p>{workoutData.type.charAt(0).toUpperCase() + workoutData.type.slice(1)}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--energy-orange)' }}>Duration</h4>
                  <p>60 minutes</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--fitness-green)' }}>Intensity</h4>
                  <p>{Math.round(workoutData.intensity * 100)}%</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--energy-orange)' }}>Phase</h4>
                  <p>{workoutData.phase}</p>
                </div>
              </div>
            </div>

            {/* Warm-up */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--energy-orange)', marginBottom: '1rem' }}>
                🔥 Warm-up (10 minutes)
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem'
              }}>
                {workoutData.template.warmup.map((exercise, index) => (
                  <div key={index} style={{ 
                    padding: '1rem', 
                    backgroundColor: '#fff7ed', 
                    borderRadius: '0.5rem',
                    border: '1px solid #fed7aa'
                  }}>
                    <h4>{exercise.exercise}</h4>
                    <p style={{ color: 'var(--text-gray)' }}>{exercise.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Workout */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--fitness-green)', marginBottom: '1rem' }}>
                💪 Main Workout (40 minutes)
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1rem'
              }}>
                {workoutData.template.main.map((exercise, index) => (
                  <div key={index} style={{ 
                    padding: '1rem', 
                    backgroundColor: '#f0fdf4', 
                    borderRadius: '0.5rem',
                    border: '1px solid #bbf7d0'
                  }}>
                    <h4>{exercise.exercise}</h4>
                    <div style={{ marginTop: '0.5rem' }}>
                      {exercise.sets && (
                        <p><strong>Sets:</strong> {exercise.sets}</p>
                      )}
                      {exercise.reps && (
                        <p><strong>Reps:</strong> {exercise.reps}</p>
                      )}
                      {exercise.duration && (
                        <p><strong>Duration:</strong> {exercise.duration}</p>
                      )}
                      {exercise.work && (
                        <p><strong>Work:</strong> {exercise.work} | <strong>Rest:</strong> {exercise.rest}</p>
                      )}
                      {exercise.rounds && (
                        <p><strong>Rounds:</strong> {exercise.rounds}</p>
                      )}
                      {exercise.rest && !exercise.work && (
                        <p><strong>Rest:</strong> {exercise.rest}</p>
                      )}
                      {exercise.intensity && (
                        <p><strong>Intensity:</strong> {exercise.intensity}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cool-down */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--energy-orange)', marginBottom: '1rem' }}>
                🧘 Cool-down (10 minutes)
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem'
              }}>
                {workoutData.template.cooldown.map((exercise, index) => (
                  <div key={index} style={{ 
                    padding: '1rem', 
                    backgroundColor: '#fff7ed', 
                    borderRadius: '0.5rem',
                    border: '1px solid #fed7aa'
                  }}>
                    <h4>{exercise.exercise}</h4>
                    <p style={{ color: 'var(--text-gray)' }}>{exercise.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Week {week} Schedule</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '0.5rem'
          }}>
            {Array.from({ length: 7 }, (_, i) => i + 1).map(dayNum => {
              const dayWorkout = fitnessData.workoutPlan[`week${week}`][`day${dayNum}`];
              const isCurrentDay = dayNum === parseInt(day);
              
              return (
                <Link
                  key={dayNum}
                  to={`/plan/workout/${week}/${dayNum}`}
                  style={{
                    textDecoration: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    backgroundColor: isCurrentDay ? 'var(--fitness-green)' : '#f3f4f6',
                    color: isCurrentDay ? 'white' : 'var(--text-dark)',
                    border: isCurrentDay ? 'none' : '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    {dayNames[dayNum - 1].slice(0, 3)}
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {dayWorkout.type === 'rest' ? '🛌' : '💪'}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDay;