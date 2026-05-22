const prisma = require('../prisma/db');

const getProgress = async (req, res) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: req.userId }
    });
    
    const progressMap = {};
    progress.forEach(p => {
      progressMap[p.problemId] = p.status;
    });
    
    res.json(progressMap);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { problemId, status } = req.body;
    const userId = req.userId;

    const progress = await prisma.progress.upsert({
      where: {
        userId_problemId: { userId, problemId }
      },
      update: { status },
      create: { userId, problemId, status }
    });

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error updating progress' });
  }
};

const getQuizScores = async (req, res) => {
  try {
    const scores = await prisma.quizScore.findMany({
      where: { userId: req.userId }
    });
    
    const scoreMap = {};
    scores.forEach(s => {
      scoreMap[s.categoryId] = { score: s.score, total: s.total, timestamp: s.timestamp };
    });
    
    res.json(scoreMap);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quiz scores' });
  }
};

const updateQuizScore = async (req, res) => {
  try {
    const { categoryId, score, total } = req.body;
    const userId = req.userId;

    const quizScore = await prisma.quizScore.upsert({
      where: {
        userId_categoryId: { userId, categoryId }
      },
      update: { score, total, timestamp: new Date() },
      create: { userId, categoryId, score, total }
    });

    res.json(quizScore);
  } catch (err) {
    res.status(500).json({ message: 'Error updating quiz score' });
  }
};

module.exports = {
  getProgress,
  updateProgress,
  getQuizScores,
  updateQuizScore
};
