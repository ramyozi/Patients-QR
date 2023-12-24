const express = require('express');
const jwt = require('jsonwebtoken');
const { admin } = require('../config/firebaseConfig'); 
const router = express.Router();

const firebaseAuth = admin.auth();

router.get('/user', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.data();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/signout', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    await firebaseAuth.revokeRefreshTokens(token);

    res.json({ message: 'User signed out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const userRecord = await firebaseAuth.createUser({
      email,
      password
    });

    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      role
    });

    res.status(201).json({ message: "User created successfully", userId: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const token = jwt.sign({ userId: decodedToken.uid }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
