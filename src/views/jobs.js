import { stateStore } from '../state.js';

export const JobsView = {
  title: "Career Job Portal",
  activeJobId: null,

  getHTML(params) {
    const state = stateStore.getState();
    const isEmployer = state.isEmployerMode;

    if (isEmployer) {
      return this.getEmployerHTML(state);
    } else {
      return this.getCandidateHTML(state, params);
    }
  },

  // Candidate Mode HTML
  getCandidateHTML(state, params) {
    const jobs = state.jobs;
    
    // Set active job from URL param or default to first job
    if (params && params.id) {
      this.activeJobId = params.id;
    } else if (!this.activeJobId && jobs.length > 0) {
      this.activeJobId = jobs[0].id;
    }

    const activeJob = jobs.find(j => j.id === this.activeJobId) || jobs[0];
    const applications = state.applications;

    // Search query & filters (will hook up in init)
    const jobsListHTML = jobs.map(job => {
      const isApplied = applications.some(a => a.jobId === job.id);
      const isActive = job.id === this.activeJobId;
      const app = applications.find(a => a.jobId === job.id);

      return `
        <div class="glass-panel interactive job-list-card ${isActive ? 'active-job-card' : ''}" 
             data-id="${job.id}" 
             style="padding: 1.25rem; border-color: ${isActive ? 'var(--accent-cyan-border)' : 'var(--glass-border)'}; cursor: pointer;">
          <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.75rem;">
            <div class="company-logo-text">${job.company[0]}</div>
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="font-size: 1.05rem; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${job.title}</h4>
              <p style="color: var(--text-secondary); font-size: 0.85rem;">${job.company} &bull; ${job.location}</p>
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
            ${job.tags.slice(0, 3).map(tag => `<span class="badge badge-cyan" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${tag}</span>`).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--glass-border); padding-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted);">
            <span>${job.salary.split(' ')[0]}</span>
            ${isApplied ? `<span class="badge badge-emerald">Applied (${app.status})</span>` : `<span>${job.postedDate}</span>`}
          </div>
        </div>
      `;
    }).join('');

    // Detail Pane HTML
    let detailPaneHTML = '';
    if (activeJob) {
      const app = applications.find(a => a.jobId === activeJob.id);
      const isApplied = !!app;

      detailPaneHTML = `
        <div class="glass-panel" style="padding: 2rem; min-height: 100%; display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; gap: 1.25rem; align-items: center;">
              <div class="company-logo-text" style="width: 60px; height: 60px; font-size: 1.75rem;">${activeJob.company[0]}</div>
              <div>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${activeJob.title}</h2>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">
                  <span style="color: var(--accent-cyan); font-weight: 600;">${activeJob.company}</span> &bull; ${activeJob.location}
                </p>
              </div>
            </div>
            <div>
              ${isApplied 
                ? `<button class="btn btn-success" disabled><i class="fa-solid fa-check"></i> Applied (${app.status})</button>` 
                : `<button class="btn btn-primary" id="btn-open-apply-modal"><i class="fa-solid fa-paper-plane"></i> Apply Now</button>`
              }
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: var(--radius-md); margin-bottom: 2rem;">
            <div>
              <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Experience</span>
              <p style="font-weight: 600; font-size: 0.95rem;">${activeJob.experience}</p>
            </div>
            <div>
              <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Job Type</span>
              <p style="font-weight: 600; font-size: 0.95rem;">${activeJob.type}</p>
            </div>
            <div>
              <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Est. Salary</span>
              <p style="font-weight: 600; font-size: 0.95rem; color: var(--accent-emerald);">${activeJob.salary}</p>
            </div>
            <div>
              <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Prep Link</span>
              <p style="font-size: 0.95rem;"><a href="/companies.html" style="color: var(--accent-indigo); text-decoration: none; font-weight: 600;">Syllabus Guide &rarr;</a></p>
            </div>
          </div>

          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Job Description</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">${activeJob.description}</p>
          </div>

          <div style="margin-bottom: 2rem; flex-grow: 1;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Requirements</h3>
            <ul style="color: var(--text-secondary); padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.7;">
              ${activeJob.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${activeJob.tags.map(tag => `<span class="badge badge-indigo">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    } else {
      detailPaneHTML = `
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted);">
          Select a job from the panel to view descriptions.
        </div>
      `;
    }

    return `
      <div style="animation: slideUp var(--transition-normal);">
        <!-- Quick portal details -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">Candidate Board</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Find openings at top technology companies and track your application status.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <input type="text" id="job-search-input" class="form-control btn-sm" placeholder="Search title, company, tag..." style="width: 250px;">
          </div>
        </div>

        <!-- Split View Layout -->
        <div class="split-view">
          <!-- Left List Pane -->
          <div class="list-pane" id="jobs-list-container">
            ${jobsListHTML}
          </div>
          <!-- Right Detail Pane -->
          <div class="detail-pane" id="job-detail-container">
            ${detailPaneHTML}
          </div>
        </div>

        <!-- Application Modal (Hidden by default) -->
        <div id="apply-modal" class="modal-overlay" style="display: none;">
          <div class="glass-panel modal-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.75rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700;">Submit Application: ${activeJob ? activeJob.title : ''}</h3>
              <button class="btn btn-secondary btn-sm" id="btn-close-apply-modal" style="padding: 0.25rem 0.5rem;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form id="apply-job-form">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" value="${state.user.name}" readonly>
              </div>
              <div class="form-group">
                <label class="form-label">Resume PDF (Simulated Upload)</label>
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <button type="button" class="btn btn-secondary btn-sm" id="btn-mock-upload">
                    <i class="fa-solid fa-file-arrow-up"></i> Choose Resume File
                  </button>
                  <span id="uploaded-filename" style="font-size: 0.85rem; color: var(--text-secondary); font-family: monospace;">No file chosen</span>
                </div>
                <input type="hidden" id="resume-name-hidden" value="">
              </div>
              <div class="form-group">
                <label class="form-label">Cover Letter</label>
                <textarea class="form-control" id="cover-letter-input" placeholder="Explain why you are a great fit for this job... (optional)" rows="4"></textarea>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" id="btn-cancel-apply">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  // Employer Mode HTML
  getEmployerHTML(state) {
    const jobs = state.jobs;
    const applications = state.applications;

    // Applicants Manager rows
    const applicantRows = applications.map(app => {
      const job = jobs.find(j => j.id === app.jobId);
      const jobTitle = job ? job.title : app.jobTitle;
      
      return `
        <tr>
          <td style="padding: 1rem 0.5rem;">
            <div style="font-weight: 600;">${app.candidateName}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Applied ${app.appliedDate}</div>
          </td>
          <td>
            <div style="font-weight: 500;">${jobTitle}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${app.company}</div>
          </td>
          <td style="font-family: monospace; font-size: 0.85rem; color: var(--accent-cyan);">
            <i class="fa-regular fa-file-pdf"></i> ${app.resumeName}
          </td>
          <td>
            <button class="btn btn-secondary btn-sm btn-view-cover-letter" data-letter="${encodeURIComponent(app.coverLetter)}">
              <i class="fa-regular fa-message"></i> Read Statement
            </button>
          </td>
          <td>
            <select class="form-control btn-sm select-status-update" data-id="${app.id}" style="width: 170px; padding: 0.25rem 0.5rem; background: var(--bg-tertiary);">
              <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
              <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
              <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
              <option value="Offered" ${app.status === 'Offered' ? 'selected' : ''}>Offered</option>
              <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div style="animation: slideUp var(--transition-normal);">
        <!-- Employer header actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">Recruiter Console</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Publish job postings, inspect submitted resumes, and update candidate statuses.</p>
          </div>
          <button class="btn btn-primary" id="btn-open-post-modal">
            <i class="fa-solid fa-plus"></i> Post a Job
          </button>
        </div>

        <!-- Section grid -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          
          <!-- Applicants Console -->
          <div class="glass-panel">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-users" style="color: var(--accent-indigo);"></i> Candidate Applications
            </h3>
            <div class="dsa-table-wrapper">
              <table class="dsa-table">
                <thead>
                  <tr>
                    <th style="padding: 0.5rem;">Candidate</th>
                    <th>Role Applied</th>
                    <th>Resume File</th>
                    <th>Cover Statement</th>
                    <th>Action (Status Change)</th>
                  </tr>
                </thead>
                <tbody>
                  ${applicantRows.length > 0 ? applicantRows : `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">No candidates have applied yet.</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Active jobs list (short version) -->
          <div class="glass-panel">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;">Your Posted Openings (${jobs.length})</h3>
            <div class="board-grid">
              ${jobs.map(job => `
                <div class="glass-panel" style="padding: 1.25rem; background: rgba(0,0,0,0.15);">
                  <h4 style="font-weight: 600; margin-bottom: 0.25rem;">${job.title}</h4>
                  <p style="color: var(--accent-cyan); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500;">${job.company} &bull; ${job.location}</p>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${job.description}
                  </p>
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
                    <span>${job.type}</span>
                    <span>${job.salary.split(' ')[0]}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Post a Job Modal (Hidden by default) -->
        <div id="post-job-modal" class="modal-overlay" style="display: none;">
          <div class="glass-panel modal-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.75rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700;">Publish New Job Opening</h3>
              <button class="btn btn-secondary btn-sm" id="btn-close-post-modal" style="padding: 0.25rem 0.5rem;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form id="post-job-form">
              <div class="form-group">
                <label class="form-label">Job Title</label>
                <input type="text" class="form-control" id="post-title" placeholder="e.g. Associate Cloud Architect" required>
              </div>
              <div class="form-group">
                <label class="form-label">Company Name</label>
                <input type="text" class="form-control" id="post-company" placeholder="e.g. Amazon" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Location</label>
                  <input type="text" class="form-control" id="post-location" placeholder="e.g. Bangalore, India" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Salary Range</label>
                  <input type="text" class="form-control" id="post-salary" placeholder="e.g. ₹12,00,000 - ₹15,00,000 / year" required>
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Experience Requirement</label>
                  <input type="text" class="form-control" id="post-experience" placeholder="e.g. 0-2 Years" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Job Type</label>
                  <select class="form-control" id="post-type">
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Tags / Required Skills (Comma-separated)</label>
                <input type="text" class="form-control" id="post-tags" placeholder="e.g. React, C++, Docker" required>
              </div>
              <div class="form-group">
                <label class="form-label">Brief Description</label>
                <textarea class="form-control" id="post-description" rows="3" placeholder="Provide a summary of the position..." required></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Key Requirements (One requirement per line)</label>
                <textarea class="form-control" id="post-requirements" rows="3" placeholder="e.g. Bachelor's degree in CS&#10;Proficiency in Java" required></textarea>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" id="btn-cancel-post">Cancel</button>
                <button type="submit" class="btn btn-primary">Post Opening</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Read Statement Modal (Hidden by default) -->
        <div id="statement-modal" class="modal-overlay" style="display: none;">
          <div class="glass-panel modal-content" style="max-width: 500px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.75rem;">
              <h3 style="font-size: 1.15rem; font-weight: 700;"><i class="fa-regular fa-message"></i> Candidate Cover Statement</h3>
              <button class="btn btn-secondary btn-sm" id="btn-close-statement-modal" style="padding: 0.25rem 0.5rem;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <p id="statement-text-container" style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem; white-space: pre-wrap;"></p>
            <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
              <button class="btn btn-primary btn-sm" id="btn-ok-statement-modal">Close</button>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  // Event Listeners initialization
  init(params) {
    const state = stateStore.getState();
    const isEmployer = state.isEmployerMode;

    if (isEmployer) {
      this.initEmployerEvents();
    } else {
      this.initCandidateEvents();
    }
  },

  // Candidate Mode Actions
  initCandidateEvents() {
    // 1. Job cards clicking (change active job details)
    const cards = document.querySelectorAll('.job-list-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.activeJobId = id;
        // Update URL hash without reload to let router handle parameter state change,
        // or just re-render pane directly for instantaneous fluid feel!
        // Instantaneous pane re-render is much smoother:
        window.location.href = `/jobs.html?id=${id}`;
      });
    });

    // 2. Open application modal
    const openApplyBtn = document.getElementById('btn-open-apply-modal');
    const applyModal = document.getElementById('apply-modal');
    if (openApplyBtn && applyModal) {
      openApplyBtn.addEventListener('click', () => {
        applyModal.style.display = 'flex';
      });
    }

    // 3. Close application modal
    const closeApplyBtn = document.getElementById('btn-close-apply-modal');
    const cancelApplyBtn = document.getElementById('btn-cancel-apply');
    if (applyModal) {
      const closeModal = () => { applyModal.style.display = 'none'; };
      if (closeApplyBtn) closeApplyBtn.addEventListener('click', closeModal);
      if (cancelApplyBtn) cancelApplyBtn.addEventListener('click', closeModal);
    }

    // 4. Mock Resume Upload
    const mockUploadBtn = document.getElementById('btn-mock-upload');
    const filenameLabel = document.getElementById('uploaded-filename');
    const resumeHiddenInput = document.getElementById('resume-name-hidden');
    if (mockUploadBtn && filenameLabel && resumeHiddenInput) {
      mockUploadBtn.addEventListener('click', () => {
        // Mocking a file chooser: select from a predefined list of files
        const mockResumes = ["Kartikey_Resume_SDE.pdf", "Kartikey_Resume_FullStack.pdf", "Kartikey_Academic_CV.pdf"];
        const selected = mockResumes[Math.floor(Math.random() * mockResumes.length)];
        filenameLabel.textContent = selected;
        resumeHiddenInput.value = selected;
        mockUploadBtn.innerHTML = `<i class="fa-solid fa-file-circle-check" style="color: var(--accent-emerald);"></i> Change Resume`;
      });
    }

    // 5. Submit Application form
    const applyForm = document.getElementById('apply-job-form');
    if (applyForm) {
      applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const resumeName = resumeHiddenInput.value;
        if (!resumeName) {
          alert("Please upload a resume first!");
          return;
        }
        const coverLetter = document.getElementById('cover-letter-input').value;
        
        // Apply in state Store
        stateStore.applyToJob(this.activeJobId, { resumeName, coverLetter });
        
        // Close modal
        if (applyModal) applyModal.style.display = 'none';
        
        // Custom success animation alert
        alert("🎉 Application submitted successfully! You can track its progress in the Recruiter/Candidate views.");
        
        // Reload view
        window.location.reload();
      });
    }

    // 6. Search Bar Filtering
    const searchInput = document.getElementById('job-search-input');
    const listContainer = document.getElementById('jobs-list-container');
    if (searchInput && listContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const jobs = stateStore.getJobs();
        const applications = stateStore.getApplications();
        
        const filtered = jobs.filter(job => 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.tags.some(tag => tag.toLowerCase().includes(query))
        );

        listContainer.innerHTML = filtered.map(job => {
          const isApplied = applications.some(a => a.jobId === job.id);
          const isActive = job.id === this.activeJobId;
          const app = applications.find(a => a.jobId === job.id);

          return `
            <div class="glass-panel interactive job-list-card ${isActive ? 'active-job-card' : ''}" 
                 data-id="${job.id}" 
                 style="padding: 1.25rem; border-color: ${isActive ? 'var(--accent-cyan-border)' : 'var(--glass-border)'}; cursor: pointer;">
              <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.75rem;">
                <div class="company-logo-text">${job.company[0]}</div>
                <div style="flex-grow: 1; min-width: 0;">
                  <h4 style="font-size: 1.05rem; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${job.title}</h4>
                  <p style="color: var(--text-secondary); font-size: 0.85rem;">${job.company} &bull; ${job.location}</p>
                </div>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                ${job.tags.slice(0, 3).map(tag => `<span class="badge badge-cyan" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${tag}</span>`).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--glass-border); padding-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted);">
                <span>${job.salary.split(' ')[0]}</span>
                ${isApplied ? `<span class="badge badge-emerald">Applied (${app.status})</span>` : `<span>${job.postedDate}</span>`}
              </div>
            </div>
          `;
        }).join('');

        // Wire up list clicking for the newly filtered elements
        const refilteredCards = listContainer.querySelectorAll('.job-list-card');
        refilteredCards.forEach(card => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            this.activeJobId = id;
            window.location.href = `/jobs.html?id=${id}`;
          });
        });
      });
    }
  },

  // Employer Mode Actions
  initEmployerEvents() {
    // 1. Open post job modal
    const openPostBtn = document.getElementById('btn-open-post-modal');
    const postModal = document.getElementById('post-job-modal');
    if (openPostBtn && postModal) {
      openPostBtn.addEventListener('click', () => {
        postModal.style.display = 'flex';
      });
    }

    // 2. Close post job modal
    const closePostBtn = document.getElementById('btn-close-post-modal');
    const cancelPostBtn = document.getElementById('btn-cancel-post');
    if (postModal) {
      const closeModal = () => { postModal.style.display = 'none'; };
      if (closePostBtn) closePostBtn.addEventListener('click', closeModal);
      if (cancelPostBtn) cancelPostBtn.addEventListener('click', closeModal);
    }

    // 3. Post Job Form Submit
    const postJobForm = document.getElementById('post-job-form');
    if (postJobForm) {
      postJobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const company = document.getElementById('post-company').value;
        const location = document.getElementById('post-location').value;
        const salary = document.getElementById('post-salary').value;
        const experience = document.getElementById('post-experience').value;
        const type = document.getElementById('post-type').value;
        const tags = document.getElementById('post-tags').value;
        const description = document.getElementById('post-description').value;
        const requirementsRaw = document.getElementById('post-requirements').value;
        
        const requirements = requirementsRaw.split('\n').map(r => r.trim()).filter(r => r.length > 0);

        // Add Job
        stateStore.addJob({
          title, company, location, salary, experience, type, tags, description, requirements
        });

        if (postModal) postModal.style.display = 'none';
        alert("💼 Job opening published successfully!");
        window.location.reload();
      });
    }

    // 4. Update applicant status select change
    const statusSelects = document.querySelectorAll('.select-status-update');
    statusSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const appId = select.getAttribute('data-id');
        const newStatus = e.target.value;
        stateStore.updateApplicationStatus(appId, newStatus);
        
        // Visual indicator that update was saved
        select.style.borderColor = 'var(--accent-emerald)';
        setTimeout(() => {
          select.style.borderColor = 'var(--glass-border)';
        }, 1000);
      });
    });

    // 5. Open cover statement modal
    const coverBtns = document.querySelectorAll('.btn-view-cover-letter');
    const statementModal = document.getElementById('statement-modal');
    const statementText = document.getElementById('statement-text-container');
    const closeStatementBtn = document.getElementById('btn-close-statement-modal');
    const okStatementBtn = document.getElementById('btn-ok-statement-modal');

    if (statementModal && statementText) {
      const closeModal = () => { statementModal.style.display = 'none'; };
      
      coverBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const letter = decodeURIComponent(btn.getAttribute('data-letter'));
          statementText.textContent = letter || "No cover statement uploaded by candidate.";
          statementModal.style.display = 'flex';
        });
      });

      if (closeStatementBtn) closeStatementBtn.addEventListener('click', closeModal);
      if (okStatementBtn) okStatementBtn.addEventListener('click', closeModal);
    }
  }
};
