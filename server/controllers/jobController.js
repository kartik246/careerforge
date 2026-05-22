const prisma = require('../prisma/db');

const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { postedDate: 'desc' }
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id }
    });
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job details' });
  }
};

const createJob = async (req, res) => {
  try {
    const newJob = await prisma.job.create({
      data: req.body
    });
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Error creating job' });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob
};
