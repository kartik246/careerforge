import { stateStore } from './state.js';
import Router from './router.js';

// Import Views
import { DashboardView } from './views/dashboard.js';
import { JobsView } from './views/jobs.js';
import { PrepView } from './views/prep.js';
import { CompaniesView } from './views/companies.js';
import { DsaView } from './views/dsa.js';

// Register Routes mapping hashes to Views
const routes = {
  '#dashboard': DashboardView,
  '#jobs': JobsView,
  '#prep': PrepView,
  '#companies': CompaniesView,
  '#dsa': DsaView
};

// Initialize Router after DOM elements load
document.addEventListener('DOMContentLoaded', () => {
  const router = new Router(routes, 'content-body', 'page-title');

  // Sync initial layout UI from state
  const state = stateStore.getState();
  syncLayoutUI(state);

  // Wire up Employer/Candidate switch toggle
  const roleToggle = document.getElementById('role-toggle');
  if (roleToggle) {
    roleToggle.addEventListener('change', () => {
      stateStore.toggleEmployerMode();
    });
  }

  // Subscribe to state changes to update layouts dynamically
  stateStore.subscribe((updatedState) => {
    syncLayoutUI(updatedState);
    // Instantly refresh active view on state change (e.g. toggled Recruiter mode, applied to job)
    router.handleRouting();
  });
});

// Helper to update sidebar and header toggle elements
function syncLayoutUI(state) {
  const profileRole = document.getElementById('profile-role');
  const profileAvatar = document.getElementById('profile-avatar');
  const toggleLabel = document.getElementById('toggle-role-label');
  const roleToggleInput = document.getElementById('role-toggle');

  if (state.isEmployerMode) {
    if (profileRole) profileRole.textContent = "Recruiter Mode";
    if (profileAvatar) {
      profileAvatar.textContent = "R";
      profileAvatar.style.background = "var(--grad-indigo-rose)";
    }
    if (toggleLabel) toggleLabel.textContent = "Employer / Recruiter View";
    if (roleToggleInput) roleToggleInput.checked = true;
  } else {
    if (profileRole) profileRole.textContent = "Candidate Mode";
    if (profileAvatar) {
      profileAvatar.textContent = "K";
      profileAvatar.style.background = "var(--grad-cyan-indigo)";
    }
    if (toggleLabel) toggleLabel.textContent = "Candidate Portal View";
    if (roleToggleInput) roleToggleInput.checked = false;
  }
}
