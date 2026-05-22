import { INITIAL_JOBS } from './data.js';

// Central Application State
const STATE_KEY = 'careerforge_state_v1';

class StateStore {
  constructor() {
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      try {
        this.state = JSON.parse(saved);
        // Ensure default jobs exist if array is empty
        if (!this.state.jobs || this.state.jobs.length === 0) {
          this.state.jobs = [...INITIAL_JOBS];
        }
      } catch (e) {
        console.error("Failed to parse state", e);
        this.initDefaultState();
      }
    } else {
      this.initDefaultState();
    }
  }

  initDefaultState() {
    this.state = {
      isEmployerMode: false,
      user: {
        name: "Kartikey",
        role: "Aspiring Developer"
      },
      jobs: [...INITIAL_JOBS],
      applications: [
        {
          id: "app-default",
          jobId: "job-1",
          jobTitle: "Associate Software Engineer",
          company: "Google",
          candidateName: "Kartikey",
          resumeName: "Kartikey_Resume_SDE.pdf",
          coverLetter: "I am extremely passionate about systems programming and solving algorithmic challenges. I would love to contribute to the Google Core Services team.",
          status: "Under Review",
          appliedDate: "3 days ago"
        }
      ],
      dsaProgress: {
        "dsa-1": "Todo",
        "dsa-2": "Todo",
        "dsa-3": "Todo",
        "dsa-4": "Todo",
        "dsa-5": "Todo",
        "dsa-6": "Todo"
      },
      quizScores: {}
    };
    this.saveState();
  }

  saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (e) {
        console.error("Listener error", e);
      }
    }
  }

  // Getters
  getState() {
    return this.state;
  }

  getJobs() {
    return this.state.jobs;
  }

  getApplications() {
    return this.state.applications;
  }

  getDsaProgress() {
    return this.state.dsaProgress;
  }

  getQuizScores() {
    return this.state.quizScores;
  }

  // Setters/Actions
  toggleEmployerMode() {
    this.state.isEmployerMode = !this.state.isEmployerMode;
    this.saveState();
  }

  addJob(jobData) {
    const newJob = {
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      ...jobData,
      tags: typeof jobData.tags === 'string' ? jobData.tags.split(',').map(t => t.trim()) : jobData.tags
    };
    this.state.jobs.unshift(newJob);
    this.saveState();
    return newJob;
  }

  applyToJob(jobId, appData) {
    const job = this.state.jobs.find(j => j.id === jobId);
    const newApp = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job ? job.title : "Unknown Title",
      company: job ? job.company : "Unknown Company",
      candidateName: this.state.user.name,
      resumeName: appData.resumeName || "Uploaded_Resume.pdf",
      coverLetter: appData.coverLetter || "",
      status: "Applied",
      appliedDate: "Just now"
    };
    this.state.applications.unshift(newApp);
    this.saveState();
    return newApp;
  }

  updateApplicationStatus(appId, newStatus) {
    const app = this.state.applications.find(a => a.id === appId);
    if (app) {
      app.status = newStatus;
      this.saveState();
    }
  }

  updateDsaProgress(problemId, status) {
    this.state.dsaProgress[problemId] = status;
    this.saveState();
  }

  updateQuizScore(categoryId, score, total) {
    const previous = this.state.quizScores[categoryId];
    if (!previous || score > previous.score) {
      this.state.quizScores[categoryId] = { score, total, timestamp: Date.now() };
      this.saveState();
    }
  }

  resetAllProgress() {
    this.initDefaultState();
  }
}

export const stateStore = new StateStore();
