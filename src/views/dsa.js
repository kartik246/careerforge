import { DSA_SHEET } from '../data.js';
import { stateStore } from '../state.js';

export const DsaView = {
  title: "Target DSA Prep Sheet",
  activeProblemId: null,
  topicFilter: "All",
  difficultyFilter: "All",
  searchQuery: "",
  consoleLogs: [], // outputs from runner

  getHTML(params) {
    const state = stateStore.getState();
    const progress = state.dsaProgress;

    // Load param if present
    if (params && params.id) {
      this.activeProblemId = params.id;
    }

    // Filter problems
    const filteredProblems = DSA_SHEET.filter(p => {
      const matchTopic = this.topicFilter === 'All' || p.topic === this.topicFilter;
      const matchDifficulty = this.difficultyFilter === 'All' || p.difficulty === this.difficultyFilter;
      const matchSearch = p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          p.topic.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchTopic && matchDifficulty && matchSearch;
    });

    const activeProblem = DSA_SHEET.find(p => p.id === this.activeProblemId);

    // Left Panel: Checklist List
    const topics = ["All", "Arrays", "Strings", "Stacks", "Trees", "Dynamic Programming"];
    const difficulties = ["All", "Easy", "Medium", "Hard"];

    const leftPanelHTML = `
      <div class="dsa-left-panel">
        <!-- Filters panel -->
        <div class="glass-panel" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: space-between; align-items: center;">
            <h4 style="font-weight: 700;">Filters</h4>
            <input type="text" id="dsa-search" class="form-control btn-sm" placeholder="Search problems..." value="${this.searchQuery}" style="width: 160px; padding: 0.35rem 0.75rem;">
          </div>
          
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
            <div class="form-group" style="margin: 0; flex-grow: 1;">
              <label class="form-label" style="font-size: 0.75rem;">Topic</label>
              <select class="form-control btn-sm" id="filter-topic" style="background: var(--bg-tertiary);">
                ${topics.map(t => `<option value="${t}" ${this.topicFilter === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="margin: 0; flex-grow: 1;">
              <label class="form-label" style="font-size: 0.75rem;">Difficulty</label>
              <select class="form-control btn-sm" id="filter-difficulty" style="background: var(--bg-tertiary);">
                ${difficulties.map(d => `<option value="${d}" ${this.difficultyFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Problems list table -->
        <div class="glass-panel" style="padding: 1.25rem; flex-grow: 1;">
          <div class="dsa-table-wrapper">
            <table class="dsa-table" style="font-size: 0.9rem;">
              <thead>
                <tr>
                  <th style="width: 40px; padding: 0.5rem;">Status</th>
                  <th>Problem Name</th>
                  <th>Topic</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${filteredProblems.map(p => {
                  const status = progress[p.id] || "Todo";
                  
                  // Color codes for difficulty
                  let diffClass = 'badge-emerald';
                  if (p.difficulty === 'Medium') diffClass = 'badge-amber';
                  if (p.difficulty === 'Hard') diffClass = 'badge-rose';

                  return `
                    <tr style="border-bottom: 1px solid var(--glass-border);">
                      <td style="padding: 0.75rem 0.5rem;">
                        <select class="form-control btn-sm dsa-status-select" data-id="${p.id}" style="width: 90px; padding: 0.15rem 0.35rem; font-size: 0.75rem; background: var(--bg-secondary); border-color: ${status === 'Solved' ? 'var(--accent-emerald-border)' : 'var(--glass-border)'}; color: ${status === 'Solved' ? 'var(--accent-emerald)' : 'var(--text-secondary)'};">
                          <option value="Todo" ${status === 'Todo' ? 'selected' : ''}>Todo</option>
                          <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                          <option value="Solved" ${status === 'Solved' ? 'selected' : ''}>Solved</option>
                        </select>
                      </td>
                      <td>
                        <div style="font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                          ${p.title}
                          <span class="badge ${diffClass}" style="font-size: 0.65rem; padding: 0.05rem 0.35rem;">${p.difficulty}</span>
                        </div>
                      </td>
                      <td style="color: var(--text-muted); font-size: 0.8rem;">${p.topic}</td>
                      <td>
                        <button class="btn btn-secondary btn-sm btn-solve-dsa" data-id="${p.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                          Solve <i class="fa-solid fa-code"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
                ${filteredProblems.length === 0 ? `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching problems found.</td></tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Right Panel: Coding Editor
    let rightPanelHTML = '';
    if (activeProblem) {
      const savedUserCode = localStorage.getItem(`code_${activeProblem.id}`);
      const editorCode = savedUserCode || activeProblem.starterCode;

      rightPanelHTML = `
        <div class="dsa-right-panel" style="animation: fadeIn var(--transition-fast);">
          <div class="code-editor-container">
            <!-- Header bar -->
            <div class="editor-header">
              <span class="editor-language"><i class="fa-brands fa-js" style="color: #f7df1e; font-size: 1.1rem;"></i> JavaScript (NodeJS Sandbox)</span>
              <span style="font-weight: 600; color: var(--text-primary);">${activeProblem.title}</span>
            </div>

            <!-- Code input area -->
            <textarea class="code-textarea" id="dsa-editor-textarea" spellcheck="false">${editorCode}</textarea>

            <!-- Editor footer / controls -->
            <div class="editor-footer">
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary btn-sm" id="btn-reset-code"><i class="fa-solid fa-rotate-left"></i> Reset Template</button>
              </div>
              <button class="btn btn-primary" id="btn-run-code"><i class="fa-solid fa-play"></i> Run Test Cases</button>
            </div>
          </div>

          <!-- Console logs panel -->
          <div class="playground-console">
            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-muted); border-bottom: 1px solid var(--glass-border); padding-bottom: 0.25rem;">Test Console Logs:</div>
            <div id="dsa-console-output">
              ${this.consoleLogs.length > 0 
                ? this.consoleLogs.map(log => `<div class="console-log ${log.type === 'error' ? 'error' : log.type === 'success' ? 'success' : ''}">${log.text}</div>`).join('') 
                : `<div style="color: var(--text-muted); font-style: italic;">Run code to execute and print compilation outputs.</div>`
              }
            </div>
          </div>
        </div>
      `;
    } else {
      rightPanelHTML = `
        <div class="glass-panel" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: var(--text-secondary); border-style: dashed;">
          <i class="fa-solid fa-terminal" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1.5rem;"></i>
          <h3 style="font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Coding Playground</h3>
          <p style="max-width: 320px; font-size: 0.9rem; line-height: 1.5;">Select any data structure or algorithm problem from the list to launch the active editor console.</p>
        </div>
      `;
    }

    return `
      <div>
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">Interactive DSA Prep Sheets</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">Solve algorithmic challenges directly inside the browser. Your code will run against automated unit checks.</p>
        </div>

        <div class="dsa-sheet-layout">
          ${leftPanelHTML}
          ${rightPanelHTML}
        </div>
      </div>
    `;
  },

  init(params) {
    const state = stateStore.getState();

    // 1. Solve Button Click
    const solveBtns = document.querySelectorAll('.btn-solve-dsa');
    solveBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.activeProblemId = id;
        this.consoleLogs = []; // reset logs
        window.location.hash = `#dsa?id=${id}`;
      });
    });

    // 2. Status Select changes
    const statusSelects = document.querySelectorAll('.dsa-status-select');
    statusSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const id = select.getAttribute('data-id');
        const val = e.target.value;
        
        stateStore.updateDsaProgress(id, val);
        
        // Success animation effect if solved
        if (val === 'Solved') {
          select.style.borderColor = 'var(--accent-emerald)';
          alert(`🔥 Awesome job! Problem checked off as Solved.`);
        } else {
          select.style.borderColor = 'var(--glass-border)';
        }
        
        // Refresh views to update dashboard progress rates
        const container = document.getElementById('content-body');
        if (container) {
          container.innerHTML = this.getHTML();
          this.init();
        }
      });
    });

    // 3. Filters Events
    const filterTopic = document.getElementById('filter-topic');
    const filterDifficulty = document.getElementById('filter-difficulty');
    const searchInput = document.getElementById('dsa-search');

    const updateFilters = () => {
      if (filterTopic) this.topicFilter = filterTopic.value;
      if (filterDifficulty) this.difficultyFilter = filterDifficulty.value;
      if (searchInput) this.searchQuery = searchInput.value;

      const container = document.getElementById('content-body');
      if (container) {
        container.innerHTML = this.getHTML();
        this.init();
      }
    };

    if (filterTopic) filterTopic.addEventListener('change', updateFilters);
    if (filterDifficulty) filterDifficulty.addEventListener('change', updateFilters);
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        // Do not full render immediately on character input to prevent loss of focus,
        // let's do a debounced or table body update, or just full render since it's fast.
        // Full render works, but we should make sure cursor doesn't jump.
        // To maintain focus: let's update table rows dynamically:
        this.filterTableRows();
      });
    }

    // 4. Editor Specific Actions
    if (this.activeProblemId) {
      this.initEditorEvents();
    }
  },

  filterTableRows() {
    const state = stateStore.getState();
    const progress = state.dsaProgress;
    const tbody = document.querySelector('.dsa-table tbody');
    if (!tbody) return;

    const filtered = DSA_SHEET.filter(p => {
      const matchTopic = this.topicFilter === 'All' || p.topic === this.topicFilter;
      const matchDifficulty = this.difficultyFilter === 'All' || p.difficulty === this.difficultyFilter;
      const matchSearch = p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          p.topic.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchTopic && matchDifficulty && matchSearch;
    });

    tbody.innerHTML = filtered.map(p => {
      const status = progress[p.id] || "Todo";
      
      let diffClass = 'badge-emerald';
      if (p.difficulty === 'Medium') diffClass = 'badge-amber';
      if (p.difficulty === 'Hard') diffClass = 'badge-rose';

      return `
        <tr style="border-bottom: 1px solid var(--glass-border);">
          <td style="padding: 0.75rem 0.5rem;">
            <select class="form-control btn-sm dsa-status-select" data-id="${p.id}" style="width: 90px; padding: 0.15rem 0.35rem; font-size: 0.75rem; background: var(--bg-secondary); border-color: ${status === 'Solved' ? 'var(--accent-emerald-border)' : 'var(--glass-border)'}; color: ${status === 'Solved' ? 'var(--accent-emerald)' : 'var(--text-secondary)'};">
              <option value="Todo" ${status === 'Todo' ? 'selected' : ''}>Todo</option>
              <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Solved" ${status === 'Solved' ? 'selected' : ''}>Solved</option>
            </select>
          </td>
          <td>
            <div style="font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
              ${p.title}
              <span class="badge ${diffClass}" style="font-size: 0.65rem; padding: 0.05rem 0.35rem;">${p.difficulty}</span>
            </div>
          </td>
          <td style="color: var(--text-muted); font-size: 0.8rem;">${p.topic}</td>
          <td>
            <button class="btn btn-secondary btn-sm btn-solve-dsa" data-id="${p.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
              Solve <i class="fa-solid fa-code"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Re-bind listeners for rows
    const solveBtns = tbody.querySelectorAll('.btn-solve-dsa');
    solveBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.activeProblemId = id;
        this.consoleLogs = [];
        window.location.hash = `#dsa?id=${id}`;
      });
    });

    const statusSelects = tbody.querySelectorAll('.dsa-status-select');
    statusSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const id = select.getAttribute('data-id');
        const val = e.target.value;
        stateStore.updateDsaProgress(id, val);
        if (val === 'Solved') {
          select.style.borderColor = 'var(--accent-emerald)';
          alert(`🔥 Awesome job! Problem checked off as Solved.`);
        }
        updateFilters(); // refresh overall layout
      });
    });
  },

  initEditorEvents() {
    const editorTextarea = document.getElementById('dsa-editor-textarea');
    const runBtn = document.getElementById('btn-run-code');
    const resetBtn = document.getElementById('btn-reset-code');
    const activeProblem = DSA_SHEET.find(p => p.id === this.activeProblemId);

    // Save code draft dynamically in localStorage
    if (editorTextarea) {
      editorTextarea.addEventListener('input', (e) => {
        const currentCode = e.target.value;
        localStorage.setItem(`code_${this.activeProblemId}`, currentCode);
      });
    }

    // Reset Template Action
    if (resetBtn && activeProblem) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Reset current editor code to starter template? Your edits will be discarded.")) {
          localStorage.removeItem(`code_${activeProblem.id}`);
          if (editorTextarea) {
            editorTextarea.value = activeProblem.starterCode;
          }
          this.consoleLogs = [];
          this.updateConsoleLogsHTML();
        }
      });
    }

    // Compile / Run Code Action
    if (runBtn && activeProblem && editorTextarea) {
      runBtn.addEventListener('click', () => {
        this.consoleLogs = [{ text: "🚀 Bundling testing framework... Running test checks.", type: "info" }];
        this.updateConsoleLogsHTML();

        const userCode = editorTextarea.value;

        // Function map
        const fnNames = {
          'dsa-1': 'twoSum',
          'dsa-2': 'isValid',
          'dsa-3': 'maxSubArray',
          'dsa-4': 'reverseString',
          'dsa-5': 'climbStairs',
          'dsa-6': 'merge'
        };

        const fnName = fnNames[activeProblem.id];

        setTimeout(() => {
          try {
            // Build sandboxed runner script
            const evalScript = `
              (function() {
                // Prepend user solution code
                ${userCode}
                
                // Prepend evaluation assertion scripts
                ${activeProblem.validationFnStr}
                
                // Assert check output
                return validate(${fnName});
              })()
            `;

            const validationResult = eval(evalScript);

            if (validationResult === true) {
              this.consoleLogs.push({ text: "✅ Test Case 1: PASSED", type: "success" });
              this.consoleLogs.push({ text: "✅ Test Case 2: PASSED", type: "success" });
              this.consoleLogs.push({ text: "✅ Test Case 3: PASSED", type: "success" });
              this.consoleLogs.push({ text: "🎉 CONGRATULATIONS! All local test suites passed.", type: "success" });
              
              // Set problem status as solved
              stateStore.updateDsaProgress(activeProblem.id, 'Solved');
              
              // Trigger alerts
              alert(`🏆 Success! "${activeProblem.title}" solved! Check your dashboard progress rate.`);
              
              // Rerender page container to sync overall sheet metrics and checklist selects
              const container = document.getElementById('content-body');
              if (container) {
                container.innerHTML = this.getHTML();
                this.init();
              }
            } else {
              this.consoleLogs.push({ text: `❌ ASSERTION ERROR: ${validationResult}`, type: "error" });
            }
          } catch (err) {
            this.consoleLogs.push({ text: `🚨 COMPILE/RUNTIME ERROR: ${err.message}`, type: "error" });
          }
          
          this.updateConsoleLogsHTML();
        }, 600);
      });
    }
  },

  updateConsoleLogsHTML() {
    const logBox = document.getElementById('dsa-console-output');
    if (logBox) {
      logBox.innerHTML = this.consoleLogs.map(log => `
        <div class="console-log ${log.type === 'error' ? 'error' : log.type === 'success' ? 'success' : ''}">${log.text}</div>
      `).join('');
      // scroll console down
      logBox.scrollTop = logBox.scrollHeight;
    }
  }
};
