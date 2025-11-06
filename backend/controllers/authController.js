import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
export async function registerUser(req, res) {
  const { name, email, mobile_number, password } = req.body;

  if (!name || !email || !mobile_number || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email or mobile already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email=$1 OR mobile_number=$2',
      [email, mobile_number]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (name, email, mobile_number, password)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, name, email, mobile_number, profile_pic, is_admin, created_at`,
      [name, email, mobile_number, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// LOGIN
export async function loginUser(req, res) {
  const { emailOrMobile, password } = req.body;

  if (!emailOrMobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find user by email or mobile
    const userQuery = await pool.query(
      'SELECT * FROM users WHERE email=$1 OR mobile_number=$1',
      [emailOrMobile]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userQuery.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    // Return user info without password
    const userData = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      profile_pic: user.profile_pic,
      is_admin: user.is_admin,
      created_at: user.created_at,
    };

    res.json({
      message: 'Login successful',
      user: userData,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
