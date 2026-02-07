import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Progress = () => {
  const { user, fitnessData } = useUser();

  if (!user || !fitnessData) {
    return <div>Loading...</div>;
  }

  // Mock progress data - in a real app, this would be tracked over time
  const currentWeek = 1;
  const completedWorkouts = 0;
  const totalWorkouts = 70; // 10 weeks * 7 days
  const progressPercentage = (completedWorkouts / totalWorkouts) * 100;

  const mockStats = {
    startWeight: user.weight,
    currentWeight: user.weight, // Would change over time
    weightChange: 0,
    workoutsCompleted: completedWorkouts,
    caloriesBurned: 0,
    averageCaloriesPerDay: fitnessData.targetCalories
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
                Progress Tracking
              </h1>
              <p style={{ opacity: 0.9 }}>
                Monitor your fitness journey and achievements
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
        {/* Overall Progress */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Overall Progress</h3>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Program Completion</span>
              <span>{currentWeek}/10 weeks ({Math.round((currentWeek/10) * 100)}%)</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentWeek/10) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Workouts Completed</span>
              <span>{mockStats.workoutsCompleted}/{totalWorkouts} ({Math.round(progressPercentage)}%)</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--fitness-green)', fontSize: '2rem' }}>
              {mockStats.currentWeight}kg
            </h3>
            <p style={{ color: 'var(--text-gray)' }}>Current Weight</p>
            <p style={{ fontSize: '0.875rem', color: mockStats.weightChange >= 0 ? 'var(--energy-orange)' : 'var(--fitness-green)' }}>
              {mockStats.weightChange >= 0 ? '+' : ''}{mockStats.weightChange}kg from start
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--energy-orange)', fontSize: '2rem' }}>
              {mockStats.workoutsCompleted}
            </h3>
            <p style={{ color: 'var(--text-gray)' }}>Workouts Done</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
              {totalWorkouts - mockStats.workoutsCompleted} remaining
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--fitness-green)', fontSize: '2rem' }}>
              {mockStats.caloriesBurned}
            </h3>
            <p style={{ color: 'var(--text-gray)' }}>Calories Burned</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
              Total from workouts
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--energy-orange)', fontSize: '2rem' }}>
              {mockStats.averageCaloriesPerDay}
            </h3>
            <p style={{ color: 'var(--text-gray)' }}>Daily Calories</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
              Target intake
            </p>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Weekly Breakdown</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem'
          }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(week => {
              const isCompleted = week < currentWeek;
              const isCurrent = week === currentWeek;
              const isUpcoming = week > currentWeek;
              
              return (
                <div 
                  key={week}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    backgroundColor: isCompleted ? '#f0fdf4' : isCurrent ? '#fff7ed' : '#f9fafb',
                    border: `2px solid ${isCompleted ? 'var(--fitness-green)' : isCurrent ? 'var(--energy-orange)' : 'var(--border-light)'}`
                  }}
                >
                  <h4>Week {week}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                    {isCompleted ? '✅ Completed' : isCurrent ? '🔄 In Progress' : '⏳ Upcoming'}
                  </p>
                  {isCompleted && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--fitness-green)' }}>
                      7/7 workouts
                    </p>
                  )}
                  {isCurrent && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--energy-orange)' }}>
                      0/7 workouts
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>🏆 Achievements</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem'
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f9fafb', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              opacity: 0.6
            }}>
              <h4>🎯 First Week Complete</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Complete your first week of training
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                Not yet achieved
              </p>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f9fafb', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              opacity: 0.6
            }}>
              <h4>💪 Strength Builder</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Complete 10 strength training sessions
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                0/10 sessions
              </p>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f9fafb', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              opacity: 0.6
            }}>
              <h4>🔥 Calorie Crusher</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Burn 1000 calories through workouts
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                {mockStats.caloriesBurned}/1000 calories
              </p>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f9fafb', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              opacity: 0.6
            }}>
              <h4>🏃 Consistency Champion</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Complete 7 consecutive days of workouts
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                Not yet achieved
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>🎯 Next Steps</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem'
          }}>
            <Link 
              to={`/plan/workout/${currentWeek}/1`}
              className="btn btn-primary"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              Start Today's Workout
            </Link>
            <Link 
              to={`/plan/diet/${currentWeek}`}
              className="btn btn-secondary"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              View Diet Plan
            </Link>
            <Link 
              to="/plan/overview"
              className="btn"
              style={{ 
                backgroundColor: 'var(--text-gray)', 
                color: 'white',
                textDecoration: 'none', 
                textAlign: 'center' 
              }}
            >
              Plan Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;