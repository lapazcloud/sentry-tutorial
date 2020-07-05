const express = require('express');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./storage').client;

const router = express.Router();

const ITEMS_KEY = 'app_items';

const jwtOptions = {
  algorithm: 'HS256',
  expiresIn: 3600,
};

const JWT_SECRET = process.env.JWT_SECRET || 'some_secure_secret';
const auth = expressJWT({
  secret: JWT_SECRET,
  algorithms: ['HS256']
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if ((username !== 'admin' && username !== 'guest') || password !== '12345') {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  const accessToken = jwt.sign({ role: username }, JWT_SECRET, jwtOptions);
  return res.status(200).json({
    success: true,
    accessToken,
    role: username
  });
});

router.get('/items', auth, (req, res) => {
  const items = [];
  db.hgetall(ITEMS_KEY, (error, data) => {
    if (error) {
      throw new Error(error);
    }
    for (let key in data) {
      items.push({
        id: key,
        value: data[key]
      });
    }
    return res.json({
      success: true,
      data: items
    });
  });
});

router.post('/items', auth, (req, res) => {
  const { id, value } = req.body;
  if (!id || !value) {
    return res.status(400).json({
      success: false,
      message: 'Invalid parameters'
    });
  }
  db.hset(ITEMS_KEY, `${id}`, `${value}`, (err, data) => {
    if (err) {
      throw new Error(error);
    }
    return res.status(200).json({
      success: true,
      message: 'Item created successfully'
    });
  });

});

router.delete('/items/:itemId', auth, (req, res) => {
  const id = req.params.itemId
  db.hdel(ITEMS_KEY, `${id}`, (error) => {
    if (error) {
      throw new Error(error);
    }
    return res.status(200).json({
      success: true
    });
  });
});

module.exports = router;
