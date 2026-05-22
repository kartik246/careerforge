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
            <a href="#dsa?id=${p.id}" class="btn btn-primary btn-sm">Solve <i class="fa-solid fa-play"></i></a>
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
            <!-- Overall Progress Widget -->
            <div class="glass-panel" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;">Placement Readiness</h3>
              
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
  }
};
