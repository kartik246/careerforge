const fs = require('fs');
const pdf = require('pdf-parse');
const { jobs } = require('../models/data');

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF resume' });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);
    const resumeText = data.text.toLowerCase();

    // Simple keyword matching algorithm
    const recommendations = jobs.map(job => {
      const requirements = job.requirements.map(r => r.toLowerCase());
      const tags = job.tags.map(t => t.toLowerCase());
      const allKeywords = [...new Set([...requirements, ...tags])];
      
      let matchCount = 0;
      const matchedKeywords = [];

      allKeywords.forEach(keyword => {
        // Basic word boundary check
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(resumeText)) {
          matchCount++;
          matchedKeywords.push(keyword);
        }
      });

      const score = Math.round((matchCount / allKeywords.length) * 100);

      return {
        jobId: job.id,
        title: job.title,
        company: job.company,
        score,
        matchedKeywords
      };
    });

    // Sort by score descending
    recommendations.sort((a, b) => b.score - a.score);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'Resume analyzed successfully',
      recommendations: recommendations.slice(0, 5) // Top 5 matches
    });
  } catch (err) {
    console.error('Resume Analysis Error:', err);
    res.status(500).json({ message: 'Error analyzing resume' });
  }
};

module.exports = {
  analyzeResume
};
