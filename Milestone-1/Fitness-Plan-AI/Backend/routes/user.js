const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(403).json('Not Authorized');
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user_id;
    next();
  } catch (err) {
    res.status(403).json('Invalid Token');
  }
};

router.get('/dashboard', authorize, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT p.*, g.workout_plan_json, g.diet_plan_json, g.start_date
       FROM user_profiles p
       JOIN generated_plans g ON p.user_id = g.user_id
       WHERE p.user_id = ? AND g.is_active = TRUE`,
      [req.user]
    );

    if (rows.length === 0) return res.status(404).json('User data not found');

    const data = rows[0];
    const responseData = {
      user: {
        age: data.age,
        sex: data.sex,
        height: data.height_cm,
        weight: data.current_weight_kg,
        fitnessGoal: data.fitness_goal,
        fitnessLevel: data.fitness_level,
        healthProblems: [], 
        preferredCuisines: [],
        dietaryRestrictions: []
      },
      fitnessData: {
        workoutPlan: data.workout_plan_json, 
        dietPlan: data.diet_plan_json,
        targetCalories: data.target_calories,
        startDate: data.start_date
      }
    };

    res.json(responseData);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/log-activity', authorize, async (req, res) => {
  try {
    const { week, day } = req.body;
    await pool.execute(
      `INSERT INTO daily_activity (user_id, week_number, day_number, is_workout_completed, date_completed)
       VALUES (?, ?, ?, TRUE, CURDATE())
       ON DUPLICATE KEY UPDATE is_workout_completed = TRUE`,
      [req.user, week, day]
    );

    res.json('Activity Logged');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;