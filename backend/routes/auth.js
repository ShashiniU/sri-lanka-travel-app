// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Register
router.post('/register', async (req, res) => {
  console.log('Register request received:', req.body);
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

   

    const [result] = await db.promise().query(
        'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, false],
        (err) => {
            if (err) return res.status(500).json({ message: 'DB error' });
            // Generate JWT token
      const token = jwt.sign(
        { userId: result.insertId, email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );
      
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          userId: result.insertId,
          name,
         
          email
        }
      });
          }
      );
  });
})

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', req.body);

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user.userid, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' } // Token valid for 1 hour
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.userid, name: user.name, email: user.email }
      });
  });
});

module.exports = router;
