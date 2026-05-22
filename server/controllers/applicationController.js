const prisma = require('../prisma/db');

const getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: true,
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { appliedDate: 'desc' }
    });
    
    // Transform to match frontend expected format if needed
    const formatted = applications.map(app => ({
      id: app.id,
      jobId: app.jobId,
      jobTitle: app.job.title,
      company: app.job.company,
      candidateName: app.user.name,
      resumeName: app.resumeName,
      coverLetter: app.coverLetter,
      status: app.status,
      appliedDate: app.appliedDate
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

const applyToJob = async (req, res) => {
  try {
    const { jobId, candidateName, resumeName, coverLetter } = req.body;
    // Note: In a real auth flow, userId comes from req.userId (JWT)
    // For now I'll use a hack or assume the user is Kartikey (the only user usually)
    // Let's use the userId from the token if available
    const userId = req.userId; 

    const newApp = await prisma.application.create({
      data: {
        userId,
        jobId,
        resumeName,
        coverLetter,
        status: "Applied"
      },
      include: {
        job: true
      }
    });
    
    res.status(201).json({
      id: newApp.id,
      jobId: newApp.jobId,
      jobTitle: newApp.job.title,
      company: newApp.job.company,
      candidateName: candidateName, // From body for now
      resumeName: newApp.resumeName,
      coverLetter: newApp.coverLetter,
      status: newApp.status,
      appliedDate: newApp.appliedDate
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting application' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedApp = await prisma.application.update({
      where: { id },
      data: { status },
      include: { job: true, user: true }
    });

    res.json({
      id: updatedApp.id,
      jobId: updatedApp.jobId,
      jobTitle: updatedApp.job.title,
      company: updatedApp.job.company,
      candidateName: updatedApp.user.name,
      resumeName: updatedApp.resumeName,
      coverLetter: updatedApp.coverLetter,
      status: updatedApp.status,
      appliedDate: updatedApp.appliedDate
    });
  } catch (err) {
    res.status(404).json({ message: 'Application not found' });
  }
};

module.exports = {
  getApplications,
  applyToJob,
  updateStatus
};
