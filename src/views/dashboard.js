import { stateStore } from '../state.js';
import { DSA_SHEET } from '../data.js';

export const DashboardView = {
  title: "Dashboard Overview",

  getHTML() {
    const state = stateStore.getState();
    
    // Calculate DSA Sheet Progress
    const totalDsa = DSA_SHEET.length;
    const solvedDsa = Object.values(state.dsaProgress).filter(status => status === 'Solved').length;
    const dsaPercent = totalDsa > 0 ? Math.round((solvedDsa / totalDsa) * 100) : 0;
    
    // Calculate Quiz Progress
    const totalQuizCats = 3; // quant, logical, verbal
    const quizzesTaken = Object.keys(state.quizScores).length;
    const quizPercent = Math.round((quizzesTaken / totalQuizCats) * 100);
    
    // Total applications
    const totalApps = state.applications.length;
    
    // Recommended Problems (limit to 2 incomplete ones)
    const recommendedProblems = DSA_SHEET.filter(p => state.dsaProgress[p.id] !== 'Solved').slice(0, 2);
    const recommendedListHTML = recommendedProblems.length > 0 
      ? recommendedProblems.map(p => `
          <div class="glass-panel interactive" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div>
              <h4 style="font-weight: 600; margin-bottom: 0.25rem;">${p.title}</h4>
              <span class="badge ${p.difficulty === 'Easy' ? 'badge-emerald' : p.difficulty === 'Medium' ? 'badge-amber' : 'badge-rose'}">${p.difficulty}</span>
              <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">${p.topic}</span>
            </div>
            <a href="/dsa.html?id=${p.id}" class="btn btn-primary btn-sm">Solve <i class="fa-solid fa-play"></i></a>
          </div>
        `).join('')
      : `<p style="color: var(--text-muted); font-size: 0.95rem;">🎉 You've solved all DSA Sheet problems! Excellent job!</p>`;

    // Recent applications table
    const recentAppsHTML = state.applications.length > 0
      ? state.applications.slice(0, 3).map(app => {
          let statusBadgeClass = 'badge-cyan';
          if (app.status === 'Offer Offered' || app.status === 'Offered') statusBadgeClass = 'badge-emerald';
          if (app.status === 'Rejected') statusBadgeClass = 'badge-rose';
          if (app.status === 'Interview Scheduled') statusBadgeClass = 'badge-indigo';
          return `
            <tr>
              <td style="padding: 0.85rem 0.5rem; font-weight: 500;">${app.jobTitle}</td>
              <td style="color: var(--text-secondary);">${app.company}</td>
              <td><span class="badge ${statusBadgeClass}">${app.status}</span></td>
              <td style="color: var(--text-muted); font-size: 0.85rem;">${app.appliedDate}</td>
            </tr>
          `;
        }).join('')
      : `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No active applications found. Check the Job Portal to apply!</td></tr>`;

    // SVG Circular progress configurations
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (dsaPercent / 100) * circumference;

    return `
      <div style="animation: slideUp var(--transition-normal);">
        <!-- Welcome banner -->
        <div class="glass-panel" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%); border-color: rgba(99, 102, 241, 0.25); margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; background: var(--grad-cyan-indigo); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hello, ${state.user.name}!</h2>
            <p style="color: var(--text-secondary); max-width: 600px; font-size: 1.05rem;">
              Ready for placement prep? Track your progress across quantitative assessments, master target structures in the DSA sheets, and land interviews directly.
            </p>
          </div>
          <button id="btn-reset-data" class="btn btn-secondary btn-sm" title="Clear all local data and reload">
            <i class="fa-solid fa-rotate-left"></i> Reset Progress
          </button>
        </div>

        <!-- Numeric statistics cards -->
        <div class="stats-row">
          <div class="glass-panel stat-card">
            <div class="stat-info">
              <span class="stat-label">Jobs Applied</span>
              <span class="stat-value" style="color: var(--accent-cyan);">${totalApps}</span>
            </div>
            <div class="stat-icon-wrapper" style="background: rgba(6, 182, 212, 0.1); color: var(--accent-cyan);">
              <i class="fa-solid fa-briefcase"></i>
            </div>
          </div>
          <div class="glass-panel stat-card">
            <div class="stat-info">
              <span class="stat-label">DSA Checklist</span>
              <span class="stat-value" style="color: var(--accent-indigo);">${solvedDsa}/${totalDsa}</span>
            </div>
            <div class="stat-icon-wrapper" style="background: rgba(99, 102, 241, 0.1); color: var(--accent-indigo);">
              <i class="fa-solid fa-code"></i>
            </div>
          </div>
          <div class="glass-panel stat-card">
            <div class="stat-info">
              <span class="stat-label">Quizzes Completed</span>
              <span class="stat-value" style="color: var(--accent-emerald);">${quizzesTaken}/${totalQuizCats}</span>
            </div>
            <div class="stat-icon-wrapper" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald);">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>

        <!-- Dashboard Layout Grid -->
        <div class="dashboard-grid">
          <!-- Left Main Area -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            
            <!-- Interactive Analytics Chart -->
            <div class="glass-panel">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-chart-area" style="color: var(--accent-cyan);"></i> Application Pipeline
              </h3>
              <div id="application-chart" style="min-height: 250px;"></div>
            </div>

            <!-- Recommended Tasks -->
            <div class="glass-panel">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-fire" style="color: var(--accent-rose);"></i> Next Recommended DSA Problems
              </h3>
              <div>
                ${recommendedListHTML}
              </div>
            </div>

            <!-- Job Applications Table -->
            <div class="glass-panel">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-paper-plane" style="color: var(--accent-cyan);"></i> Recent Applications Status
              </h3>
              <div class="dsa-table-wrapper">
                <table class="dsa-table">
                  <thead>
                    <tr>
                      <th style="padding: 0.5rem;">Job Role</th>
                      <th>Company</th>
                      <th>Application Status</th>
                      <th>Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${recentAppsHTML}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Right Sidebar Area -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            
            <!-- DSA Distribution Radar -->
            <div class="glass-panel">
               <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; text-align: center;">Skill Distribution</h3>
               <div id="skill-radar-chart"></div>
            </div>

            <!-- Overall Progress Widget -->
            <div class="glass-panel" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
              <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">Placement Readiness</h3>
              
              <!-- Circular gauge SVG -->
              <div style="position: relative; width: 150px; height: 150px; margin-bottom: 1.5rem;">
                <svg width="150" height="150">
                  <!-- Background Track -->
                  <circle 
                    cx="75" cy="75" r="${radius}" 
                    stroke="rgba(255,255,255,0.05)" 
                    stroke-width="12" 
                    fill="transparent"
                  />
                  <!-- Active Path -->
                  <circle 
                    class="progress-ring-circle"
                    cx="75" cy="75" r="${radius}" 
                    stroke="url(#cyanIndigoGrad)" 
                    stroke-width="12" 
                    fill="transparent"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${strokeDashoffset}"
                    stroke-linecap="round"
                  />
                  
                  <defs>
                    <linearGradient id="cyanIndigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="var(--accent-cyan)" />
                      <stop offset="100%" stop-color="var(--accent-indigo)" />
                    </linearGradient>
                  </defs>
                </svg>
                <!-- Percentage text inside -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <span style="font-size: 2rem; font-weight: 800; line-height: 1;">${dsaPercent}%</span>
                  <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; margin-top: 0.25rem;">Solved</span>
                </div>
              </div>

              <!-- Stat summaries -->
              <div style="width: 100%; display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid var(--glass-border); padding-top: 1rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span style="color: var(--text-secondary);">DSA Sheets Done:</span>
                  <span style="font-weight: 600;">${solvedDsa} / ${totalDsa}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span style="color: var(--text-secondary);">Quizzes Done:</span>
                  <span style="font-weight: 600;">${quizzesTaken} / ${totalQuizCats}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span style="color: var(--text-secondary);">Application Rate:</span>
                  <span style="font-weight: 600; color: var(--accent-cyan);">${totalApps} Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Reset Data Event
    const btnReset = document.getElementById('btn-reset-data');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all quiz scores, application statuses, job modifications, and DSA sheet checks? This resets the platform states.")) {
          stateStore.resetAllProgress();
          window.location.reload();
        }
      });
    }

    // Initialize Charts if ApexCharts is available
    if (typeof ApexCharts !== 'undefined') {
      this.renderApplicationChart();
      this.renderSkillRadar();
    }

    this.initResumeAnalyzer();
  },

  initResumeAnalyzer() {
    const uploadZone = document.getElementById('resume-upload-zone');
    const fileInput = document.getElementById('resume-file-input');
    const resultsContainer = document.getElementById('resume-analysis-results');
    const matchList = document.getElementById('match-list');

    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      uploadZone.style.opacity = '0.5';
      uploadZone.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2.5rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i>
        <p style="font-weight: 600;">Analyzing your resume...</p>
      `;

      const result = await stateStore.analyzeResume(file);

      uploadZone.style.opacity = '1';
      uploadZone.innerHTML = `
        <i class="fa-solid fa-cloud-arrow-up" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <p style="font-weight: 600; margin-bottom: 0.25rem;">Upload Resume (PDF)</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">We'll analyze your skills and match you with the best roles.</p>
      `;

      if (result.success) {
        resultsContainer.style.display = 'block';
        matchList.innerHTML = result.recommendations.map(rec => `
          <div class="glass-panel interactive" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02);">
            <div>
              <h5 style="font-weight: 700; margin-bottom: 0.25rem;">${rec.title}</h5>
              <p style="font-size: 0.8rem; color: var(--text-secondary);">${rec.company}</p>
              <div style="display: flex; gap: 0.35rem; margin-top: 0.5rem; flex-wrap: wrap;">
                ${rec.matchedKeywords.slice(0, 3).map(word => `<span class="badge badge-emerald" style="font-size: 0.65rem;">${word}</span>`).join('')}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent-emerald);">${rec.score}%</div>
              <p style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Match Score</p>
              <a href="/jobs.html?id=${rec.jobId}" class="btn btn-primary btn-sm" style="margin-top: 0.5rem; padding: 0.2rem 0.6rem; font-size: 0.75rem;">View</a>
            </div>
          </div>
        `).join('');
        
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Analysis failed: ' + result.message);
      }
    });
  },

  renderApplicationChart() {
    const state = stateStore.getState();
    const apps = state.applications;
    
    // Count status distribution
    const statusCounts = {
      'Applied': 0,
      'Under Review': 0,
      'Interview Scheduled': 0,
      'Offered': 0,
      'Rejected': 0
    };
    
    apps.forEach(app => {
      if (statusCounts.hasOwnProperty(app.status)) {
        statusCounts[app.status]++;
      } else if (app.status === 'Offer Offered') {
        statusCounts['Offered']++;
      }
    });

    const options = {
      series: [{
        name: 'Applications',
        data: Object.values(statusCounts)
      }],
      chart: {
        type: 'bar',
        height: 250,
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '50%',
          distributed: true,
        }
      },
      colors: ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981', '#ef4444'],
      dataLabels: { enabled: false },
      legend: { show: false },
      xaxis: {
        categories: Object.keys(statusCounts),
        labels: {
          style: { colors: '#94a3b8', fontSize: '11px' }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          style: { colors: '#94a3b8' }
        }
      },
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        strokeDashArray: 4
      },
      theme: { mode: 'dark' }
    };

    const chart = new ApexCharts(document.querySelector("#application-chart"), options);
    chart.render();
  },

  renderSkillRadar() {
    const state = stateStore.getState();
    const progress = state.dsaProgress;
    
    // Group problems by topic and count solved
    const topicStats = {};
    DSA_SHEET.forEach(p => {
      if (!topicStats[p.topic]) topicStats[p.topic] = { total: 0, solved: 0 };
      topicStats[p.topic].total++;
      if (progress[p.id] === 'Solved') topicStats[p.topic].solved++;
    });

    const topics = Object.keys(topicStats);
    const solvedData = topics.map(t => Math.round((topicStats[t].solved / topicStats[t].total) * 100));

    const options = {
      series: [{
        name: 'Mastery %',
        data: solvedData
      }],
      chart: {
        height: 280,
        type: 'radar',
        toolbar: { show: false },
        background: 'transparent'
      },
      colors: ['#06b6d4'],
      xaxis: {
        categories: topics,
        labels: {
          style: { colors: '#94a3b8', fontSize: '10px' }
        }
      },
      yaxis: { show: false, min: 0, max: 100 },
      fill: {
        opacity: 0.2,
        colors: ['#06b6d4']
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#06b6d4'],
        dashArray: 0
      },
      markers: {
        size: 4,
        colors: ['#06b6d4'],
        strokeColor: '#fff',
        strokeWidth: 2,
      },
      theme: { mode: 'dark' }
    };

    const chart = new ApexCharts(document.querySelector("#skill-radar-chart"), options);
    chart.render();
  }
};
