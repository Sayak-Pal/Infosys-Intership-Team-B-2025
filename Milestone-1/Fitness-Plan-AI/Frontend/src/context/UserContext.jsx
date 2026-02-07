import React, { createContext, useContext, useState, useEffect } from 'react';
import rulesData from '../data/rules.json';
import workoutsData from '../data/workouts.json';
import dietsData from '../data/diets.json';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fitnessData, setFitnessData] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 1. HELPER FUNCTIONS (Defined first so they can be used below) ---

  const calculateBMR = (userData) => {
    const { age, sex, height, weight } = userData;
    let bmr;
    if (sex === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    return Math.round(bmr * rulesData.calorieRules.activityMultiplier);
  };

  const calculateBMI = (userData) => {
    const { height, weight } = userData;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { category: 'Underweight', color: '#3b82f6', risk: 'Low' };
    if (bmiValue < 25) return { category: 'Normal', color: '#22c55e', risk: 'Low' };
    if (bmiValue < 30) return { category: 'Overweight', color: '#f59e0b', risk: 'Moderate' };
    if (bmiValue < 35) return { category: 'Obese', color: '#ef4444', risk: 'High' };
    return { category: 'Extremely Obese', color: '#991b1b', risk: 'Very High' };
  };

  const generateWorkoutPlan = (userData) => {
    const { fitnessLevel, healthProblems } = userData;
    const schedule = workoutsData.weeklySchedule[fitnessLevel];
    const workoutPlan = {};
    
    for (let week = 1; week <= 10; week++) {
      const weekKey = `week${week}`;
      const progressionKey = week <= 2 ? '1-2' : week <= 4 ? '3-4' : week <= 6 ? '5-6' : week <= 8 ? '7-8' : '9-10';
      const progression = rulesData.weeklyProgression[progressionKey];
      
      workoutPlan[weekKey] = {};
      
      schedule.pattern.forEach((workoutType, dayIndex) => {
        const dayKey = `day${dayIndex + 1}`;
        if (workoutType === 'rest') {
          workoutPlan[weekKey][dayKey] = {
            type: 'rest',
            title: 'Rest Day',
            description: 'Recovery and light stretching'
          };
        } else {
          let template = workoutsData.workoutTemplates[workoutType];
          if (healthProblems && healthProblems.length > 0) {
            healthProblems.forEach(condition => {
              if (workoutsData.modifications[condition]) {
                const modifications = workoutsData.modifications[condition].replace;
                template = { ...template };
                template.main = template.main.map(exercise => ({
                  ...exercise,
                  exercise: modifications[exercise.exercise] || exercise.exercise
                }));
              }
            });
          }
          workoutPlan[weekKey][dayKey] = {
            type: workoutType,
            title: `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Training`,
            phase: progression.phase,
            intensity: progression.intensityMultiplier,
            template: template
          };
        }
      });
    }
    return workoutPlan;
  };

  const generateDietPlan = (userData) => {
    const { fitnessGoal, preferredCuisines, dietaryRestrictions } = userData;
    const goalData = rulesData.goals[fitnessGoal];
    const baseBMR = calculateBMR(userData);
    const targetCalories = Math.round(baseBMR * goalData.calorieMultiplier);

    const dietPlan = {};
    const primaryCuisine = preferredCuisines && preferredCuisines[0] ? preferredCuisines[0] : 'continental';
    const mealTemplates = dietsData.mealTemplates[primaryCuisine];

    for (let week = 1; week <= 10; week++) {
      const weekKey = `week${week}`;
      dietPlan[weekKey] = {};
      for (let day = 1; day <= 7; day++) {
        const dayKey = `day${day}`;
        const mealIndex = (week + day) % 3;
        let meals = {
          breakfast: mealTemplates.breakfast[mealIndex],
          lunch: mealTemplates.lunch[mealIndex],
          snack: mealTemplates.snack[mealIndex],
          dinner: mealTemplates.dinner[mealIndex]
        };
        const dailyCalories = meals.breakfast.calories + meals.lunch.calories + 
                            meals.snack.calories + meals.dinner.calories;
        dietPlan[weekKey][dayKey] = {
          meals,
          totalCalories: dailyCalories,
          targetCalories
        };
      }
    }
    return dietPlan;
  };

  const generateFitnessData = (userData) => {
    const workoutPlan = generateWorkoutPlan(userData);
    const dietPlan = generateDietPlan(userData);
    const bmr = calculateBMR(userData);
    const bmi = calculateBMI(userData);
    const bmiCategory = getBMICategory(bmi);

    return {
      workoutPlan,
      dietPlan,
      bmr,
      bmi,
      bmiCategory,
      targetCalories: Math.round(bmr * rulesData.goals[userData.fitnessGoal].calorieMultiplier),
      startDate: new Date().toISOString().split('T')[0]
    };
  };

  // --- 2. API ACTIONS ---

  const logout = () => {
    setUser(null);
    setFitnessData(null);
    setIsRegistered(false);
    localStorage.removeItem('token');
  };

  const fetchDashboardData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/dashboard', {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // RECALCULATE METRICS HERE to fix Profile Page
        const bmi = calculateBMI(data.user);
        const bmiCategory = getBMICategory(bmi);
        const bmr = calculateBMR(data.user);

        setUser(data.user);
        setFitnessData({
          ...data.fitnessData,
          bmi,
          bmiCategory,
          bmr
        });
        setIsRegistered(true);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data);

      localStorage.setItem('token', data.token);
      await fetchDashboardData(data.token); 
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const registerUser = async (formData) => {
    try {
      const generatedPlan = generateFitnessData(formData);

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          generatedPlan: generatedPlan
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('token', data.token);
      setUser(formData);
      setFitnessData(generatedPlan);
      setIsRegistered(true);
      return true;

    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed: " + error.message);
      return false;
    }
  };

  const updateUser = (updates) => {
    // Note: To make this persist, you would need a PUT endpoint on your backend
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    const newData = generateFitnessData(updatedUser);
    setFitnessData(newData);
  };

  const resetUser = logout;

  // --- 3. INIT ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchDashboardData(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      fitnessData,
      isRegistered,
      loading,
      registerUser,
      loginUser,
      updateUser,
      resetUser,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};