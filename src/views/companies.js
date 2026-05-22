import { COMPANY_GUIDES } from '../data.js';

export const CompaniesView = {
  title: "Companies Hiring Guides",
  activeCompanyId: null,

  getHTML() {
    const companies = Object.keys(COMPANY_GUIDES);
    const searchHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">Hiring Process & Exam Guides</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">Review selection metrics, online round formats, and syllabus topics for top companies.</p>
        </div>
        <input type="text" id="company-search-input" class="form-control btn-sm" placeholder="Search company (e.g. Google)..." style="width: 250px;">
      </div>
    `;

    const gridHTML = `
      <div class="board-grid" id="companies-grid-container">
        ${companies.map(cName => {
          const comp = COMPANY_GUIDES[cName];
          return `
            <div class="glass-panel interactive company-card" data-name="${comp.name}" style="padding: 1.5rem; cursor: pointer; display: flex; flex-direction: column; height: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div class="company-logo-text" style="width: 44px; height: 44px; font-size: 1.25rem;">${comp.name[0]}</div>
                <span class="badge badge-indigo">${comp.name === 'Google' || comp.name === 'Microsoft' || comp.name === 'Amazon' || comp.name === 'Meta' ? 'Product Core' : 'Service Giant'}</span>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-primary);">${comp.name}</h3>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1rem; line-height: 1.3;">${comp.tagline}</p>
              
              <div style="margin-top: auto; border-top: 1px dashed var(--glass-border); padding-top: 0.75rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600;">
                <span>View Exam Guide</span>
                <span><i class="fa-solid fa-arrow-right"></i></span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    return `
      <div style="animation: slideUp var(--transition-normal);">
        ${searchHTML}
        ${gridHTML}

        <!-- Company Guide Details Modal -->
        <div id="company-details-modal" class="modal-overlay" style="display: none;">
          <div class="glass-panel modal-content" style="max-width: 750px;">
            <div id="company-modal-body-container">
              <!-- Content loaded dynamically on click -->
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getCompanyDetailHTML(cName) {
    const comp = COMPANY_GUIDES[cName];
    if (!comp) return '';

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.75rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div class="company-logo-text" style="width: 48px; height: 48px; font-size: 1.35rem;">${comp.name[0]}</div>
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 700;">${comp.name} Career Roadmap</h3>
            <p style="color: var(--accent-cyan); font-size: 0.85rem; font-weight: 500;">${comp.tagline}</p>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" id="btn-close-company-modal" style="padding: 0.25rem 0.5rem;"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <!-- Left details: Eligibility & Pattern -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: var(--radius-md);">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--accent-rose);"><i class="fa-solid fa-graduation-cap"></i> Eligibility Criteria</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${comp.eligibility}</p>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--accent-indigo);"><i class="fa-solid fa-sitemap"></i> Selection Round Process</h4>
            <ol style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 1.15rem; display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.45;">
              ${comp.examPattern.map(round => `<li>${round}</li>`).join('')}
            </ol>
          </div>
        </div>

        <!-- Right details: Syllabus -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: var(--radius-md);">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--accent-cyan);"><i class="fa-solid fa-book-open"></i> Technical Exam Syllabus</h4>
            <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.4;">
              <div><strong>Algorithms:</strong> <span style="font-family: monospace; color: var(--text-primary);">${comp.syllabus.coding}</span></div>
              <div><strong>Core Topics:</strong> <span style="font-family: monospace; color: var(--text-primary);">${comp.syllabus.coreCs}</span></div>
              <div><strong>Assessments:</strong> <span style="font-family: monospace; color: var(--text-primary);">${comp.syllabus.aptitude}</span></div>
            </div>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--accent-emerald);"><i class="fa-solid fa-lightbulb"></i> Cracking Strategy</h4>
            <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 1.15rem; display: flex; flex-direction: column; gap: 0.35rem; line-height: 1.4;">
              ${comp.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Quick Action Navigation Shortcuts -->
      <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid var(--glass-border); padding-top: 1.25rem;">
        <button class="btn btn-secondary btn-sm link-goto-prep" style="font-size: 0.8rem;">
          <i class="fa-solid fa-calculator"></i> Practice Aptitude
        </button>
        <button class="btn btn-primary btn-sm link-goto-dsa" style="font-size: 0.8rem;">
          <i class="fa-solid fa-code"></i> Jump to DSA Sheet
        </button>
      </div>
    `;
  },

  init() {
    const modal = document.getElementById('company-details-modal');
    const modalBody = document.getElementById('company-modal-body-container');

    // 1. Grid Cards clicking
    const cards = document.querySelectorAll('.company-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const cName = card.getAttribute('data-name');
        this.activeCompanyId = cName;
        
        if (modal && modalBody) {
          modalBody.innerHTML = this.getCompanyDetailHTML(cName);
          modal.style.display = 'flex';
          this.initModalEvents(); // bind buttons inside modal
        }
      });
    });

    // 2. Search Bar Filtering
    const searchInput = document.getElementById('company-search-input');
    const gridContainer = document.getElementById('companies-grid-container');
    if (searchInput && gridContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const companies = Object.keys(COMPANY_GUIDES);
        
        const filtered = companies.filter(c => 
          c.toLowerCase().includes(query) ||
          COMPANY_GUIDES[c].tagline.toLowerCase().includes(query)
        );

        gridContainer.innerHTML = filtered.map(cName => {
          const comp = COMPANY_GUIDES[cName];
          return `
            <div class="glass-panel interactive company-card" data-name="${comp.name}" style="padding: 1.5rem; cursor: pointer; display: flex; flex-direction: column; height: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div class="company-logo-text" style="width: 44px; height: 44px; font-size: 1.25rem;">${comp.name[0]}</div>
                <span class="badge badge-indigo">${comp.name === 'Google' || comp.name === 'Microsoft' || comp.name === 'Amazon' || comp.name === 'Meta' ? 'Product Core' : 'Service Giant'}</span>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-primary);">${comp.name}</h3>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1rem; line-height: 1.3;">${comp.tagline}</p>
              
              <div style="margin-top: auto; border-top: 1px dashed var(--glass-border); padding-top: 0.75rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600;">
                <span>View Exam Guide</span>
                <span><i class="fa-solid fa-arrow-right"></i></span>
              </div>
            </div>
          `;
        }).join('');

        // Re-bind click event for filtered cards
        const refilteredCards = gridContainer.querySelectorAll('.company-card');
        refilteredCards.forEach(c => {
          c.addEventListener('click', () => {
            const name = c.getAttribute('data-name');
            this.activeCompanyId = name;
            if (modal && modalBody) {
              modalBody.innerHTML = this.getCompanyDetailHTML(name);
              modal.style.display = 'flex';
              this.initModalEvents();
            }
          });
        });
      });
    }
  },

  initModalEvents() {
    const modal = document.getElementById('company-details-modal');
    const closeBtn = document.getElementById('btn-close-company-modal');
    if (modal && closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // Shortcut: Go to Prep
    const btnGotoPrep = document.querySelector('.link-goto-prep');
    if (btnGotoPrep) {
      btnGotoPrep.addEventListener('click', () => {
        modal.style.display = 'none';
        window.location.href = '/prep.html';
      });
    }

    // Shortcut: Go to DSA
    const btnGotoDsa = document.querySelector('.link-goto-dsa');
    if (btnGotoDsa) {
      btnGotoDsa.addEventListener('click', () => {
        modal.style.display = 'none';
        window.location.href = '/dsa.html';
      });
    }
  }
};
