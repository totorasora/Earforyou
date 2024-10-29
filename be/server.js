const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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

// 로그인
app.post('/login', async (req, res) => {
  try {
    console.log(users)
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: '인증 실패' });
    }
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원가입
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).json({ message: '회원가입 성공' });
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
app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`));