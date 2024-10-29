require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
  } else {
    console.log("Connected to Supabase PostgreSQL database.");
  }
});

pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) throw err;
    console.log("Table 'users' is created or already exists.");
  }
);

const SECRET_KEY = 'your_secret_key';

// 임시 사용자 데이터베이스
const users = [];

// middleware 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자 이름과 비밀번호를 이용해 로그인하고, JWT 토큰을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user1"
 *               password:
 *                 type: string
 *                 example: "password1"
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 반환
 *       401:
 *         description: 인증 실패
 */
app.post('/login', async (req, res) => {
  try {
    console.log(users)
    const { username, password } = req.body;

    pool.query("SELECT * FROM users WHERE username = $1", [username], async (err, result) => {
      if (err) {
        console.error("Error fetching item:", err);
        res.status(500).json({ error: "Failed to fetch item" });
      } else {
        user_data = result.rows[0] 
        if (user_data && await bcrypt.compare(password, user_data.password)) {
          const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ message: '인증 실패' });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 새 사용자 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user2"
 *               password:
 *                 type: string
 *                 example: "password2"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       500:
 *         description: 서버 오류
 */
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
          "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
          [username, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("Error inserting item:", err);
              res.status(500).json({ error: "Failed to add item" });
            } else {
              res.status(201).json({ message: '회원가입 성공' });
            }
          })
    } catch (error) {
        res.status(500).json({ message: '서버 오류' });
    }
});

app.get('/hello', async (req, res) => {
    res.json({message: 'hello1'})
})

// 인증이 필요한 API
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: '인증된 사용자만 볼 수 있는 중요한 데이터입니다.', user: req.user });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`)
  console.log(`Swagger docs are available at http://localhost:${PORT}/api-docs`);
});