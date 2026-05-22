import { PREP_RESOURCES } from '../data.js';
import { stateStore } from '../state.js';

export const PrepView = {
  title: "Placement Preparation Hub",
  activeTab: "aptitude", // default tab
  activeQuizTopicId: null,
  quizState: null, // { currentQuestionIndex, score, answers: [] }

  getHTML() {
    const tabsHTML = `
      <div class="tabs-header">
        <button class="tab-btn ${this.activeTab === 'aptitude' ? 'active' : ''}" data-tab="aptitude">
          <i class="fa-solid fa-calculator"></i> Aptitude
        </button>
        <button class="tab-btn ${this.activeTab === 'dsanotes' ? 'active' : ''}" data-tab="dsanotes">
          <i class="fa-solid fa-network-wired"></i> DSA Theory
        </button>
        <button class="tab-btn ${this.activeTab === 'technical' ? 'active' : ''}" data-tab="technical">
          <i class="fa-solid fa-server"></i> CS Core Fundamentals
        </button>
        <button class="tab-btn ${this.activeTab === 'hr' ? 'active' : ''}" data-tab="hr">
          <i class="fa-solid fa-comments"></i> HR Mock Prep
        </button>
      </div>
    `;

    let tabContentHTML = '';
    switch (this.activeTab) {
      case 'dsanotes':
        tabContentHTML = this.getDsaNotesHTML();
        break;
      case 'technical':
        tabContentHTML = this.getTechnicalHTML();
        break;
      case 'hr':
        tabContentHTML = this.getHrHTML();
        break;
      case 'aptitude':
      default:
        tabContentHTML = this.getAptitudeHTML();
        break;
    }

    return `
      <div style="animation: slideUp var(--transition-normal);">
        ${tabsHTML}
        <div id="prep-tab-content-container">
          ${tabContentHTML}
        </div>
      </div>
    `;
  },

  // 1. Aptitude Panel HTML
  getAptitudeHTML() {
    const data = PREP_RESOURCES.aptitude;
    const state = stateStore.getState();

    // If a quiz is active on this topic, render the quiz interface
    if (this.activeQuizTopicId) {
      return this.getQuizInterfaceHTML(data.topics.find(t => t.id === this.activeQuizTopicId));
    }

    // Render main topics list
    const topicsHTML = data.topics.map(topic => {
      const bestScore = state.quizScores[topic.id];
      const scoreText = bestScore 
        ? `<span class="badge badge-emerald" style="font-size: 0.85rem;"><i class="fa-solid fa-trophy"></i> Best Score: ${bestScore.score}/${bestScore.total}</span>`
        : `<span class="badge badge-rose" style="font-size: 0.85rem;">Not Taken</span>`;

      return `
        <div class="glass-panel" style="margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 700;">${topic.name}</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem;">Practice formulas and take a quick self-evaluation test.</p>
            </div>
            <div>
              ${scoreText}
              <button class="btn btn-primary btn-sm btn-start-quiz" data-id="${topic.id}" style="margin-left: 1rem;">
                <i class="fa-solid fa-circle-question"></i> Take Practice Test
              </button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            ${topic.formulas.map(f => `
              <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: var(--radius-md);">
                <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.25rem; color: var(--accent-cyan);"><i class="fa-solid fa-bolt"></i> ${f.name}</h4>
                <p style="font-size: 0.85rem; font-family: monospace; color: var(--text-primary); word-break: break-all;">${f.rule}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div>
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${data.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">${data.subtitle}</p>
        </div>
        ${topicsHTML}
      </div>
    `;
  },

  // Interactive Quiz Interface HTML
  getQuizInterfaceHTML(topic) {
    const quizIdx = this.quizState.currentQuestionIndex;
    const questions = topic.quizzes;
    const currentQ = questions[quizIdx];
    const totalQ = questions.length;

    // Has user submitted answer for this question?
    const hasSubmitted = this.quizState.answers[quizIdx] !== undefined;
    const selectedAns = this.quizState.answers[quizIdx];

    const progressPercent = Math.round(((quizIdx) / totalQ) * 100);

    return `
      <div class="glass-panel" style="max-width: 700px; margin: 0 auto; animation: slideUp var(--transition-fast);">
        <!-- Quiz Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.75rem;">
          <div>
            <span class="badge badge-cyan" style="margin-bottom: 0.25rem;">${topic.name} Test</span>
            <h3 style="font-size: 1.2rem; font-weight: 700;">Question ${quizIdx + 1} of ${totalQ}</h3>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-quit-quiz"><i class="fa-solid fa-right-from-bracket"></i> Exit Quiz</button>
        </div>

        <!-- Progress bar -->
        <div style="height: 4px; width: 100%; background: var(--bg-tertiary); border-radius: var(--radius-full); margin-bottom: 2rem; overflow: hidden;">
          <div style="height: 100%; width: ${progressPercent}%; background: var(--grad-cyan-indigo); transition: width 0.3s ease;"></div>
        </div>

        <!-- Question Body -->
        <div style="margin-bottom: 2rem;">
          <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem; line-height: 1.5;">${currentQ.question}</p>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${currentQ.options.map((opt, idx) => {
              let optStyle = 'background: rgba(255,255,255,0.02); border-color: var(--glass-border);';
              let iconHTML = '';
              
              if (hasSubmitted) {
                if (idx === currentQ.correctIndex) {
                  // highlight correct answer in emerald green
                  optStyle = 'background: rgba(16, 185, 129, 0.12); border-color: var(--accent-emerald-border); color: var(--accent-emerald); font-weight: 600;';
                  iconHTML = '<i class="fa-solid fa-circle-check" style="margin-left: auto;"></i>';
                } else if (idx === selectedAns) {
                  // highlight user incorrect answer in rose red
                  optStyle = 'background: rgba(244, 63, 94, 0.12); border-color: var(--accent-rose-border); color: var(--accent-rose); text-decoration: line-through;';
                  iconHTML = '<i class="fa-solid fa-circle-xmark" style="margin-left: auto;"></i>';
                } else {
                  optStyle = 'opacity: 0.5; border-color: var(--glass-border);';
                }
              } else if (selectedAns === idx) {
                optStyle = 'background: rgba(99, 102, 241, 0.12); border-color: var(--accent-indigo); box-shadow: var(--accent-indigo-glow);';
              }

              return `
                <button class="btn btn-secondary quiz-option-btn" 
                        data-index="${idx}" 
                        ${hasSubmitted ? 'disabled' : ''} 
                        style="text-align: left; justify-content: flex-start; padding: 1rem 1.25rem; font-weight: 400; width: 100%; ${optStyle}">
                  <span style="font-weight: 700; color: var(--text-muted); margin-right: 0.75rem;">${String.fromCharCode(65 + idx)}.</span>
                  <span>${opt}</span>
                  ${iconHTML}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Explanation card -->
        ${hasSubmitted ? `
          <div class="quiz-explanation-box" style="animation: fadeIn 0.4s ease;">
            <h4 style="font-weight: 700; margin-bottom: 0.5rem; color: var(--accent-cyan);"><i class="fa-regular fa-lightbulb"></i> Formula & Explanation</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${currentQ.explanation}</p>
          </div>
        ` : ''}

        <!-- Footer Navigation -->
        <div style="display: flex; justify-content: flex-end; margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
          ${!hasSubmitted 
            ? `<button class="btn btn-primary" id="btn-submit-answer" ${selectedAns === null ? 'disabled' : ''}><i class="fa-solid fa-check"></i> Submit Answer</button>`
            : (quizIdx + 1 < totalQ 
                ? `<button class="btn btn-primary" id="btn-next-question">Next Question &rarr;</button>`
                : `<button class="btn btn-success" id="btn-finish-quiz"><i class="fa-solid fa-flag-checkered"></i> View Results</button>`
              )
          }
        </div>
      </div>
    `;
  },

  // 2. DSA Notes Panel HTML
  getDsaNotesHTML() {
    const data = PREP_RESOURCES.dsaNotes;
    return `
      <div>
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${data.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">${data.subtitle}</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          ${data.topics.map(topic => `
            <div class="glass-panel">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--accent-indigo); display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-code-commit"></i> ${topic.title}
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                ${topic.notes}
              </p>
              
              <!-- Syntax highlighted monospaced box -->
              <div style="background: #05070a; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 1.25rem; position: relative;">
                <button class="btn btn-secondary btn-sm btn-copy-snippet" data-code="${encodeURIComponent(topic.codeSnippet)}" style="position: absolute; right: 1rem; top: 1rem; padding: 0.25rem 0.75rem; font-size: 0.75rem;">
                  <i class="fa-regular fa-copy"></i> Copy
                </button>
                <pre style="font-family: 'Fira Code', monospace; font-size: 0.85rem; color: #a7f3d0; margin: 0; overflow-x: auto; line-height: 1.5;">${topic.codeSnippet}</pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 3. CS Fundamentals Panel HTML
  getTechnicalHTML() {
    const data = PREP_RESOURCES.technical;
    return `
      <div>
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${data.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">${data.subtitle}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          ${data.subjects.map(sub => `
            <div class="glass-panel">
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem; color: var(--accent-cyan);">
                <i class="fa-regular fa-folder-open"></i> ${sub.name}
              </h3>
              <ul style="color: var(--text-secondary); padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.7; display: flex; flex-direction: column; gap: 0.85rem;">
                ${sub.points.map(pt => `<li>${pt.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 600;">$1</strong>')}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 4. HR Prep Panel HTML
  getHrHTML() {
    const data = PREP_RESOURCES.hr;
    return `
      <div>
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${data.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">${data.subtitle}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: flex-start;">
          
          <!-- Guide section -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${data.questions.map(q => `
              <div class="glass-panel" style="padding: 1.5rem;">
                <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--accent-amber);">${q.question}</h4>
                <span class="badge badge-indigo" style="font-size: 0.7rem; margin-bottom: 1rem;">Framework: ${q.framework}</span>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.5rem;">
                  <strong>Guidance:</strong> ${q.advice}
                </p>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
                  <strong>Ideal Keywords:</strong> ${q.idealKeywords.map(k => `<span style="color: var(--accent-cyan); font-family: monospace;">"${k}"</span>`).join(', ')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Interactive Mock Interview Simulator -->
          <div class="glass-panel" style="position: sticky; top: 90px;">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-microphone" style="color: var(--accent-rose);"></i> Mock Answer Evaluator
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1.5rem;">Type your answer below. The simulator evaluates response lengths and keyword indicators.</p>

            <div class="form-group">
              <label class="form-label">Select Interview Question</label>
              <select class="form-control" id="hr-sim-question">
                ${data.questions.map(q => `<option value="${q.id}">${q.question}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Type Your Response</label>
              <textarea class="form-control" id="hr-sim-response" rows="8" placeholder="Type your answer here (suggested range: 50 - 250 words)..."></textarea>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-align: right;" id="hr-word-counter">Words: 0</span>
            </div>

            <button class="btn btn-primary" id="btn-evaluate-hr" style="width: 100%;">
              <i class="fa-solid fa-magnifying-glass-chart"></i> Analyze Response
            </button>

            <!-- Scorer feedback card (Hidden by default) -->
            <div id="hr-score-result-card" style="display: none; margin-top: 1.5rem; padding: 1.25rem; border: 1px solid var(--accent-emerald-border); background: rgba(16, 185, 129, 0.05); border-radius: var(--radius-md); animation: fadeIn 0.4s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="font-weight: 700; color: var(--accent-emerald);"><i class="fa-solid fa-square-poll-vertical"></i> Analysis Results</h4>
                <span id="hr-score-percentage" style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald);">85/100</span>
              </div>
              <p id="hr-score-text-feedback" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;"></p>
              <div style="font-size: 0.8rem; color: var(--text-muted);">
                <strong>Found Keywords:</strong> <span id="hr-found-keywords" style="color: var(--accent-cyan);"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  // Event handlers
  init(params) {
    // 1. Tab switches
    const tabBtns = document.querySelectorAll('.tabs-header .tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab');
        this.activeQuizTopicId = null; // reset active quiz
        const container = document.getElementById('content-body');
        if (container) {
          container.innerHTML = this.getHTML();
          this.init(); // re-bind listeners
        }
      });
    });

    // 2. Tab-specific initializations
    if (this.activeTab === 'aptitude') {
      this.initAptitudeEvents();
    } else if (this.activeTab === 'dsanotes') {
      this.initDsaNotesEvents();
    } else if (this.activeTab === 'hr') {
      this.initHrEvents();
    }
  },

  // Aptitude Quiz Actions
  initAptitudeEvents() {
    const data = PREP_RESOURCES.aptitude;

    // Start Quiz
    const startQuizBtns = document.querySelectorAll('.btn-start-quiz');
    startQuizBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.activeQuizTopicId = id;
        this.quizState = {
          currentQuestionIndex: 0,
          score: 0,
          answers: [],
          selectedAnswerIndex: null
        };
        this.reloadActivePane();
      });
    });

    // Option Clicking
    const optButtons = document.querySelectorAll('.quiz-option-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.quizState.selectedAnswerIndex = idx;
        
        // Remove selection styles from other options
        optButtons.forEach(b => {
          b.style.borderColor = 'var(--glass-border)';
          b.style.background = 'rgba(255,255,255,0.02)';
          b.style.boxShadow = 'none';
        });

        // Add selection styles to clicked option
        btn.style.borderColor = 'var(--accent-indigo)';
        btn.style.background = 'rgba(99, 102, 241, 0.12)';
        btn.style.boxShadow = 'var(--accent-indigo-glow)';

        const submitBtn = document.getElementById('btn-submit-answer');
        if (submitBtn) submitBtn.disabled = false;
      });
    });

    // Submit Answer
    const submitBtn = document.getElementById('btn-submit-answer');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const topic = data.topics.find(t => t.id === this.activeQuizTopicId);
        const qIdx = this.quizState.currentQuestionIndex;
        const currentQ = topic.quizzes[qIdx];
        const selected = this.quizState.selectedAnswerIndex;
        
        // Save user answer
        this.quizState.answers[qIdx] = selected;

        // Verify correctness
        if (selected === currentQ.correctIndex) {
          this.quizState.score++;
        }

        this.quizState.selectedAnswerIndex = null;
        this.reloadActivePane();
      });
    }

    // Next Question
    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.quizState.currentQuestionIndex++;
        this.reloadActivePane();
      });
    }

    // Finish Quiz
    const finishBtn = document.getElementById('btn-finish-quiz');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        const topic = data.topics.find(t => t.id === this.activeQuizTopicId);
        
        // Save best score to stateStore
        stateStore.updateQuizScore(topic.id, this.quizState.score, topic.quizzes.length);

        alert(`📝 Quiz Completed! You scored ${this.quizState.score} out of ${topic.quizzes.length}.`);
        
        // Reset quiz and display topics
        this.activeQuizTopicId = null;
        this.quizState = null;
        this.reloadActivePane();
      });
    }

    // Quit Quiz
    const quitBtn = document.getElementById('btn-quit-quiz');
    if (quitBtn) {
      quitBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to exit the quiz? All progress for this attempt will be lost.")) {
          this.activeQuizTopicId = null;
          this.quizState = null;
          this.reloadActivePane();
        }
      });
    }
  },

  // DSA Notes Copy Clipboard Actions
  initDsaNotesEvents() {
    const copyBtns = document.querySelectorAll('.btn-copy-snippet');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.getAttribute('data-code'));
        navigator.clipboard.writeText(code).then(() => {
          btn.innerHTML = `<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i> Copied!`;
          setTimeout(() => {
            btn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
          }, 2000);
        }).catch(err => {
          console.error("Failed to copy code", err);
        });
      });
    });
  },

  // HR Simulator Mock Evaluator Actions
  initHrEvents() {
    const questionSelect = document.getElementById('hr-sim-question');
    const responseArea = document.getElementById('hr-sim-response');
    const wordCounter = document.getElementById('hr-word-counter');
    const evaluateBtn = document.getElementById('btn-evaluate-hr');
    const scoreCard = document.getElementById('hr-score-result-card');
    const scoreVal = document.getElementById('hr-score-percentage');
    const feedbackVal = document.getElementById('hr-score-text-feedback');
    const foundKeywordsVal = document.getElementById('hr-found-keywords');

    if (responseArea && wordCounter) {
      // Counter input words length
      responseArea.addEventListener('input', (e) => {
        const text = e.target.value.trim();
        const words = text === '' ? 0 : text.split(/\s+/).length;
        wordCounter.textContent = `Words: ${words}`;
      });
    }

    if (evaluateBtn && scoreCard) {
      evaluateBtn.addEventListener('click', () => {
        const text = responseArea.value.trim();
        const words = text === '' ? 0 : text.split(/\s+/).length;
        
        if (words < 15) {
          alert("Your answer is too short! Write at least 15 words to receive a detailed evaluation.");
          return;
        }

        const qId = questionSelect.value;
        const targetQ = PREP_RESOURCES.hr.questions.find(q => q.id === qId);

        // Evaluation Logic (Client-side keyword scan)
        let score = 55; // base score for writing something substantial
        let foundKeywords = [];
        let missingKeywords = [];

        for (const word of targetQ.idealKeywords) {
          const regex = new RegExp(`\\b${word}\\b`, 'gi');
          if (regex.test(text)) {
            score += 10;
            foundKeywords.push(word);
          } else {
            missingKeywords.push(word);
          }
        }

        // Adjust score based on length (sweet spot: 60-200 words)
        if (words >= 60 && words <= 220) {
          score += 15;
        } else if (words > 220) {
          score += 5; // too verbose
        } else {
          score += 5; // short
        }

        // Cap at 100
        score = Math.min(score, 100);

        // Generate custom feedback text
        let feedback = '';
        if (score >= 85) {
          feedback = "Excellent response structure! You hit almost all essential keywords, and your response length provides the necessary detail for HR interviews. Nice work!";
        } else if (score >= 70) {
          feedback = `Good job. Your response is solid but could be improved. Try formatting your answer using the ${targetQ.framework} model more explicitly and include missing keywords like: ${missingKeywords.map(k => `"${k}"`).join(', ')}.`;
        } else {
          feedback = `Your answer is structured, but misses key interview triggers. Incorporate structural elements using the ${targetQ.framework} method and explicitly weave in details about your achievements or metrics.`;
        }

        // Update elements and show card
        scoreVal.textContent = `${score}/100`;
        feedbackVal.textContent = feedback;
        foundKeywordsVal.textContent = foundKeywords.length > 0 
          ? foundKeywords.map(k => `"${k}"`).join(', ') 
          : "None (include keywords for scoring boosts!)";
        
        scoreCard.style.display = 'block';

        // Scroll evaluation card into view
        scoreCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  },

  reloadActivePane() {
    const tabContainer = document.getElementById('prep-tab-content-container');
    if (tabContainer) {
      let content = '';
      switch (this.activeTab) {
        case 'dsanotes':
          content = this.getDsaNotesHTML();
          break;
        case 'technical':
          content = this.getTechnicalHTML();
          break;
        case 'hr':
          content = this.getHrHTML();
          break;
        case 'aptitude':
        default:
          content = this.getAptitudeHTML();
          break;
      }
      tabContainer.innerHTML = content;
      this.init(); // re-bind listeners
    }
  }
};
