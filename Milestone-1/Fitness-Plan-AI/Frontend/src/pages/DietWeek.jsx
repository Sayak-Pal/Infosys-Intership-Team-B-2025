import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const DietWeek = () => {
  const { week } = useParams();
  const { fitnessData } = useUser();

  if (!fitnessData) {
    return <div>Loading...</div>;
  }

  const weekDiet = fitnessData.dietPlan[`week${week}`];
  
  if (!weekDiet) {
    return <div>Diet plan not found</div>;
  }

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ 
        background: 'linear-gradient(135deg, var(--energy-orange), var(--fitness-green))',
        color: 'white',
        padding: '2rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Week {week} Diet Plan
              </h1>
              <p style={{ opacity: 0.9 }}>
                Your personalized meal plan for optimal results
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
        {/* Week Summary */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Week {week} Overview</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--energy-orange)' }}>Target Calories</h4>
              <p>{fitnessData.targetCalories}/day</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--fitness-green)' }}>Meals per Day</h4>
              <p>4 meals</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--energy-orange)' }}>Avg Protein</h4>
              <p>~25g per meal</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--fitness-green)' }}>Variety</h4>
              <p>Rotating menu</p>
            </div>
          </div>
        </div>

        {/* Daily Meal Plans */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '1.5rem'
        }}>
          {Array.from({ length: 7 }, (_, i) => i + 1).map(day => {
            const dayData = weekDiet[`day${day}`];
            const dayName = dayNames[day - 1];
            
            return (
              <div key={day} className="card">
                <h3 style={{ 
                  color: 'var(--energy-orange)', 
                  marginBottom: '1rem',
                  borderBottom: '2px solid var(--border-light)',
                  paddingBottom: '0.5rem'
                }}>
                  {dayName}
                </h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  {/* Breakfast */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--fitness-green)', marginBottom: '0.5rem' }}>
                      🌅 Breakfast
                    </h4>
                    <div style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#f0fdf4', 
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <p style={{ fontWeight: '600' }}>{dayData.meals.breakfast.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                        {dayData.meals.breakfast.calories} cal • 
                        {dayData.meals.breakfast.protein}g protein • 
                        {dayData.meals.breakfast.carbs}g carbs • 
                        {dayData.meals.breakfast.fat}g fat
                      </p>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--energy-orange)', marginBottom: '0.5rem' }}>
                      ☀️ Lunch
                    </h4>
                    <div style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#fff7ed', 
                      borderRadius: '0.5rem',
                      border: '1px solid #fed7aa'
                    }}>
                      <p style={{ fontWeight: '600' }}>{dayData.meals.lunch.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                        {dayData.meals.lunch.calories} cal • 
                        {dayData.meals.lunch.protein}g protein • 
                        {dayData.meals.lunch.carbs}g carbs • 
                        {dayData.meals.lunch.fat}g fat
                      </p>
                    </div>
                  </div>

                  {/* Snack */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--fitness-green)', marginBottom: '0.5rem' }}>
                      🍎 Evening Snack
                    </h4>
                    <div style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#f0fdf4', 
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <p style={{ fontWeight: '600' }}>{dayData.meals.snack.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                        {dayData.meals.snack.calories} cal • 
                        {dayData.meals.snack.protein}g protein • 
                        {dayData.meals.snack.carbs}g carbs • 
                        {dayData.meals.snack.fat}g fat
                      </p>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--energy-orange)', marginBottom: '0.5rem' }}>
                      🌙 Dinner
                    </h4>
                    <div style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#fff7ed', 
                      borderRadius: '0.5rem',
                      border: '1px solid #fed7aa'
                    }}>
                      <p style={{ fontWeight: '600' }}>{dayData.meals.dinner.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                        {dayData.meals.dinner.calories} cal • 
                        {dayData.meals.dinner.protein}g protein • 
                        {dayData.meals.dinner.carbs}g carbs • 
                        {dayData.meals.dinner.fat}g fat
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily Total */}
                <div style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <p style={{ fontWeight: '600' }}>
                    Daily Total: {dayData.totalCalories} calories
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                    Target: {dayData.targetCalories} calories
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nutrition Tips */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>💡 Nutrition Tips for Week {week}</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem'
          }}>
            <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem' }}>
              <h4>💧 Hydration</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Drink at least 8-10 glasses of water daily
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.5rem' }}>
              <h4>⏰ Meal Timing</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Eat every 3-4 hours to maintain energy levels
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem' }}>
              <h4>🥗 Portion Control</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Use smaller plates and eat slowly
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.5rem' }}>
              <h4>🍽️ Meal Prep</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Prepare meals in advance for consistency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietWeek;