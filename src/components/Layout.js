import { stateStore } from '../state.js';

export function renderSidebar() {
  const currentPath = window.location.pathname;
  const isIndex = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('dashboard.html');
  
  return `
    <aside class="sidebar">
      <div class="logo-container">
        <div class="logo-icon">CF</div>
        <span class="logo-text">CareerForge</span>
      </div>
      
      <ul class="nav-menu">
        <li class="nav-item ${isIndex ? 'active' : ''}">
          <a href="/index.html">
            <i class="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="nav-item ${currentPath.includes('jobs.html') ? 'active' : ''}">
          <a href="/jobs.html">
            <i class="fa-solid fa-briefcase"></i>
            <span>Job Portal</span>
          </a>
        </li>
        <li class="nav-item ${currentPath.includes('prep.html') ? 'active' : ''}">
          <a href="/prep.html">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>Preparation Hub</span>
          </a>
        </li>
        <li class="nav-item ${currentPath.includes('companies.html') ? 'active' : ''}">
          <a href="/companies.html">
            <i class="fa-solid fa-building"></i>
            <span>Company Guides</span>
          </a>
        </li>
        <li class="nav-item ${currentPath.includes('dsa.html') ? 'active' : ''}">
          <a href="/dsa.html">
            <i class="fa-solid fa-code"></i>
            <span>DSA Sheet</span>
          </a>
        </li>
      </ul>

      <div style="margin-top: auto; padding: 1rem;">
        <button id="btn-logout" class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center; gap: 0.5rem; background: rgba(239, 68, 68, 0.1); color: var(--accent-rose); border-color: rgba(239, 68, 68, 0.2);">
          <i class="fa-solid fa-right-from-bracket"></i> <span>Sign Out</span>
        </button>
      </div>

      <div class="user-profile-badge">
        <div class="user-avatar" id="profile-avatar">K</div>
        <div class="user-info">
          <span class="user-name" id="profile-name">Guest</span>
          <span class="user-role" id="profile-role">Candidate Mode</span>
        </div>
      </div>
    </aside>
  `;
}

export function renderHeader(title) {
  return `
    <header class="top-header">
      <h1 class="view-title">${title}</h1>
      <div class="header-actions">
        <div class="toggle-switch-container">
          <span class="toggle-label" id="toggle-role-label">Recruiter Console</span>
          <label class="toggle-switch">
            <input type="checkbox" id="role-toggle">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </header>
  `;
}

function syncLayoutUI(state) {
  const profileName = document.getElementById('profile-name');
  const profileRole = document.getElementById('profile-role');
  const profileAvatar = document.getElementById('profile-avatar');
  const toggleLabel = document.getElementById('toggle-role-label');
  const roleToggleInput = document.getElementById('role-toggle');

  if (profileName && state.user) {
    profileName.textContent = state.user.name;
  }

  if (state.isEmployerMode) {
    if (profileRole) profileRole.textContent = "Recruiter Mode";
    if (profileAvatar) {
      profileAvatar.textContent = state.user ? state.user.name[0].toUpperCase() : "R";
      profileAvatar.style.background = "var(--grad-indigo-rose)";
    }
    if (toggleLabel) toggleLabel.textContent = "Employer / Recruiter View";
    if (roleToggleInput) roleToggleInput.checked = true;
  } else {
    if (profileRole) profileRole.textContent = "Candidate Mode";
    if (profileAvatar) {
      profileAvatar.textContent = state.user ? state.user.name[0].toUpperCase() : "K";
      profileAvatar.style.background = "var(--grad-cyan-indigo)";
    }
    if (toggleLabel) toggleLabel.textContent = "Candidate Portal View";
    if (roleToggleInput) roleToggleInput.checked = false;
  }
}

export function initLayout(title) {
  const state = stateStore.getState();

  // Auth Check
  if (!state.token && !window.location.pathname.includes('login.html')) {
    window.location.href = '/login.html';
    return;
  }

  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
  if (sidebarPlaceholder) sidebarPlaceholder.innerHTML = renderSidebar();

  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) headerPlaceholder.innerHTML = renderHeader(title);

  // Initial sync
  syncLayoutUI(state);

  // Wire up toggle
  const roleToggle = document.getElementById('role-toggle');
  if (roleToggle) {
    roleToggle.addEventListener('change', () => {
      stateStore.toggleEmployerMode();
    });
  }

  // Wire up logout
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      stateStore.logout();
    });
  }

  // Subscribe to changes
  stateStore.subscribe((state) => {
    syncLayoutUI(state);
  });
}
