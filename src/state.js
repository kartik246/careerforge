import { INITIAL_JOBS } from './data.js';

// Central Application State
const STATE_KEY = 'careerforge_state_v1';
const AUTH_KEY = 'careerforge_auth_v1';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class StateStore {
  constructor() {
    this.listeners = [];
    this.state = {
      isEmployerMode: false,
      user: null,
      token: null,
      jobs: [],
      applications: [],
      dsaProgress: {},
      quizScores: {}
    };
    this.loadAuthState();
    this.loadLocalSettings();
    if (this.state.token) {
      this.fetchInitialData();
    }
  }

  loadAuthState() {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try {
        const authData = JSON.parse(saved);
        this.state.user = authData.user;
        this.state.token = authData.token;
      } catch (e) {
        console.error("Failed to parse auth state", e);
      }
    }
  }

  saveAuthState() {
    if (this.state.token) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        user: this.state.user,
        token: this.state.token
      }));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
    this.notify();
  }

  loadLocalSettings() {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      try {
        const localData = JSON.parse(saved);
        this.state.isEmployerMode = localData.isEmployerMode || false;
        this.state.dsaProgress = localData.dsaProgress || {};
        this.state.quizScores = localData.quizScores || {};
      } catch (e) {
        console.error("Failed to parse local settings", e);
      }
    }
  }

  async fetchInitialData() {
    try {
      const headers = { 'Authorization': `Bearer ${this.state.token}` };
      const [jobsRes, appsRes, progressRes, quizRes] = await Promise.all([
        fetch(`${API_BASE_URL}/jobs`),
        fetch(`${API_BASE_URL}/applications`),
        fetch(`${API_BASE_URL}/user/progress`, { headers }),
        fetch(`${API_BASE_URL}/user/quiz-scores`, { headers })
      ]);
      
      this.state.jobs = await jobsRes.json();
      this.state.applications = await appsRes.json();
      this.state.dsaProgress = await progressRes.json();
      this.state.quizScores = await quizRes.json();
      this.notify();
    } catch (e) {
      console.error("Failed to fetch initial data from API", e);
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        this.state.user = data.user;
        this.state.token = data.token;
        this.saveAuthState();
        await this.fetchInitialData();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (e) {
      return { success: false, message: 'Server connection failed' };
    }
  }

  async analyzeResume(file) {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.state.token}`
        },
        body: formData
      });
      
      const data = await response.json();
      if (response.ok) {
        return { success: true, recommendations: data.recommendations };
      } else {
        return { success: false, message: data.message };
      }
    } catch (e) {
      return { success: false, message: 'Resume analysis failed' };
    }
  }

  async register(name, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        this.state.user = data.user;
        this.state.token = data.token;
        this.saveAuthState();
        await this.fetchInitialData();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (e) {
      return { success: false, message: 'Server connection failed' };
    }
  }

  logout() {
    this.state.user = null;
    this.state.token = null;
    this.saveAuthState();
    window.location.href = '/login.html';
  }

  saveLocalSettings() {
    const localData = {
      isEmployerMode: this.state.isEmployerMode,
      dsaProgress: this.state.dsaProgress,
      quizScores: this.state.quizScores
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(localData));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
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

  // Setters/Actions
  toggleEmployerMode() {
    this.state.isEmployerMode = !this.state.isEmployerMode;
    this.saveLocalSettings();
  }

  async addJob(jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      const newJob = await response.json();
      this.state.jobs.unshift(newJob);
      this.notify();
      return newJob;
    } catch (e) {
      console.error("Failed to add job", e);
    }
  }

  async applyToJob(jobId, appData) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          candidateName: this.state.user.name,
          ...appData
        })
      });
      const newApp = await response.json();
      this.state.applications.unshift(newApp);
      this.notify();
      return newApp;
    } catch (e) {
      console.error("Failed to apply to job", e);
    }
  }

  async updateApplicationStatus(appId, newStatus) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedApp = await response.json();
      
      const index = this.state.applications.findIndex(a => a.id === appId);
      if (index !== -1) {
        this.state.applications[index] = updatedApp;
        this.notify();
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  }

  async updateDsaProgress(problemId, status) {
    this.state.dsaProgress[problemId] = status;
    this.notify();
    
    try {
      await fetch(`${API_BASE_URL}/user/progress`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
        body: JSON.stringify({ problemId, status })
      });
    } catch (e) {
      console.error("Failed to sync progress to server", e);
    }
  }

  async updateQuizScore(categoryId, score, total) {
    const previous = this.state.quizScores[categoryId];
    if (!previous || score > previous.score) {
      this.state.quizScores[categoryId] = { score, total, timestamp: Date.now() };
      this.notify();

      try {
        await fetch(`${API_BASE_URL}/user/quiz-scores`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`
          },
          body: JSON.stringify({ categoryId, score, total })
        });
      } catch (e) {
        console.error("Failed to sync quiz score to server", e);
      }
    }
  }

  resetAllProgress() {
    localStorage.removeItem(STATE_KEY);
    window.location.reload();
  }
}

export const stateStore = new StateStore();
