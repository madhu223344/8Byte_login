require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
      res.send(`<h2>Welcome, ${email}!</h2>`);
    } else {
      res.status(401).send('<h2>Invalid credentials</h2>');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
