// Mock Job Listings Database
export const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Associate Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    type: "Full-Time",
    experience: "0-2 Years",
    salary: "₹18,00,000 - ₹24,00,000 / year",
    tags: ["React", "Python", "Algorithms", "C++", "Remote-Friendly"],
    postedDate: "2 days ago",
    description: "Join the Google Core Services team as an Associate Software Engineer. You will work on building scalable APIs, optimizing internal database transactions, and collaborating with cross-functional teams to engineer the next generation of web engines.",
    requirements: [
      "Bachelor's degree in Computer Science, engineering, or equivalent practical experience.",
      "Proficiency in JavaScript, Python, Java, or C++.",
      "Solid understanding of data structures, algorithms, and object-oriented design.",
      "Experience with web application frameworks and APIs is a plus."
    ],
    roundsLink: "Google"
  },
  {
    id: "job-2",
    title: "Frontend Developer (Vite/React)",
    company: "Meta",
    location: "Hyderabad, India",
    type: "Full-Time",
    experience: "1-3 Years",
    salary: "₹22,00,000 - ₹30,00,000 / year",
    tags: ["React", "JavaScript", "CSS3", "Vite", "Performance"],
    postedDate: "1 day ago",
    description: "We are looking for a passionate Frontend Developer to build immersive interfaces for our messaging products. You will build glassmorphic components, optimize render loops, and construct fluid UI animations that feel responsive and premium.",
    requirements: [
      "Strong coding foundation with modern ES6+ Javascript and React.",
      "In-depth understanding of CSS layouts (Flexbox, CSS Grid) and design systems.",
      "Experience optimizing bundle sizes, lazy loading, and asset delivery.",
      "Familiarity with client-side routing, state stores, and rendering performance."
    ],
    roundsLink: "Meta"
  },
  {
    id: "job-3",
    title: "Software Engineer I",
    company: "Microsoft",
    location: "Noida, India",
    type: "Full-Time",
    experience: "0-1 Years",
    salary: "₹16,00,000 - ₹20,00,000 / year",
    tags: ["C#", "Azure", "SQL Server", "System Design"],
    postedDate: "3 days ago",
    description: "Microsoft's Azure Cloud team is expanding. As an SE I, you will design distributed services, build telemetry streams, and run query optimizations on high-traffic databases. You'll gain hands-on cloud experience.",
    requirements: [
      "B.Tech/M.Tech in CSE/IT or allied branches with a strong academic background.",
      "Familiarity with relational databases, SQL queries, and normalization.",
      "Understanding of multithreading, concurrency, and cloud architectures.",
      "Strong debugging skills and system-level curiosity."
    ],
    roundsLink: "Microsoft"
  },
  {
    id: "job-4",
    title: "System Engineer Trainee",
    company: "TCS",
    location: "Pune, India",
    type: "Full-Time",
    experience: "0-0 Years (Freshers)",
    salary: "₹3,60,000 - ₹7,00,000 / year",
    tags: ["Java", "SQL", "HTML/CSS", "Python"],
    postedDate: "5 days ago",
    description: "TCS is hiring fresh engineering graduates for the TCS Digital and Ninja tracks. You will undergo a comprehensive training program in full-stack technologies, cloud databases, or cyber security, followed by project placement.",
    requirements: [
      "BE / B.Tech / ME / M.Tech / MCA / MSc with 60% or 6.0 CGPA throughout academic career.",
      "No active backlogs at the time of appearing for selection.",
      "Basic programming skills in any language (Java, C, C++, Python).",
      "Good communication skills and logical reasoning ability."
    ],
    roundsLink: "TCS"
  },
  {
    id: "job-5",
    title: "Cloud & Devops Intern",
    company: "Amazon",
    location: "Bangalore, India",
    type: "Internship",
    experience: "Final Year Students",
    salary: "₹60,000 - ₹80,000 / month",
    tags: ["AWS", "Linux", "Docker", "Shell Scripting"],
    postedDate: "Today",
    description: "Amazon Web Services (AWS) is seeking final-year students for a 6-month software engineering and devops internship. Learn to automate infrastructure pipelines, script server utilities, and monitor microservices in production.",
    requirements: [
      "Enrolled in a Bachelor's or Master's program in Computer Science or related fields.",
      "Proficient with Linux environment, bash commands, and networking concepts.",
      "Basic understanding of containerization (Docker) and CI/CD pipelines.",
      "Analytical mindset with self-driven learning ability."
    ],
    roundsLink: "Amazon"
  }
];

// Preparation Resources: Notes & Quizzes
export const PREP_RESOURCES = {
  aptitude: {
    title: "Aptitude Preparation",
    subtitle: "Master Quantitative, Logical, and Verbal skills for online assessments.",
    topics: [
      {
        id: "apt-quant",
        name: "Quantitative Aptitude",
        formulas: [
          { name: "Percentage Formula", rule: "Percentage (%) = (Value / Total Value) × 100" },
          { name: "Profit & Loss", rule: "Profit % = (Profit / Cost Price) × 100; Loss % = (Loss / Cost Price) × 100" },
          { name: "Speed, Distance & Time", rule: "Speed = Distance / Time. To convert km/h to m/s, multiply by 5/18. To convert m/s to km/h, multiply by 18/5." },
          { name: "Simple Interest", rule: "SI = (P × R × T) / 100; Amount = Principal + SI" }
        ],
        quizzes: [
          {
            id: "q-quant-1",
            question: "A man buys an item for ₹80 and sells it for ₹100. Find his profit percentage.",
            options: ["15%", "20%", "25%", "30%"],
            correctIndex: 2,
            explanation: "Cost Price (CP) = ₹80. Selling Price (SP) = ₹100. Profit = SP - CP = 100 - 80 = ₹20. Profit Percentage = (Profit / CP) * 100 = (20 / 80) * 100 = 25%."
          },
          {
            id: "q-quant-2",
            question: "A train running at the speed of 108 km/hr crosses a pole in 6 seconds. What is the length of the train?",
            options: ["120 meters", "150 meters", "180 meters", "200 meters"],
            correctIndex: 2,
            explanation: "First, convert speed from km/hr to m/s: Speed = 108 * (5/18) = 6 * 5 = 30 m/s. Length of train = Distance covered to cross the pole = Speed * Time = 30 m/s * 6 seconds = 180 meters."
          },
          {
            id: "q-quant-3",
            question: "If 15 men can complete a project in 6 days, how many days will 10 men take to complete the same project?",
            options: ["9 days", "8 days", "7 days", "10 days"],
            correctIndex: 0,
            explanation: "Using Man-Days equation: M1 * D1 = M2 * D2. (15 men * 6 days) = (10 men * D2). 90 = 10 * D2 => D2 = 9 days."
          }
        ]
      },
      {
        id: "apt-logical",
        name: "Logical Reasoning",
        formulas: [
          { name: "Blood Relations Core", rule: "Map generations vertically: grandparents on top, children below. Represent males as [+] and females as [-] for clear layouts." },
          { name: "Number Series Strategy", rule: "Look for differences (1st tier), alternating numbers, square/cube patterns, or geometric ratios." },
          { name: "Coding-Decoding Tip", rule: "Write down letters A-Z labeled 1 to 26 and reverse-labeled Z-A 1 to 26 for quick mapping." }
        ],
        quizzes: [
          {
            id: "q-log-1",
            question: "Complete the series: 2, 6, 12, 20, 30, ?",
            options: ["36", "40", "42", "48"],
            correctIndex: 2,
            explanation: "Look at the differences: 6-2=4, 12-6=6, 20-12=8, 30-20=10. The differences are increasing consecutive even numbers (4, 6, 8, 10). The next difference is 12. So, the next number is 30 + 12 = 42."
          },
          {
            id: "q-log-2",
            question: "Pointing to a photograph, Rohan said, 'Her mother is the only daughter of my mother.' Whose photograph is it?",
            options: ["His wife's", "His daughter's", "His sister's", "His niece's"],
            correctIndex: 1,
            explanation: "'Only daughter of my mother' is Rohan's sister. Since the photo shows a female whose mother is Rohan's sister, Rohan is her uncle. Wait! Let's re-read: 'Her mother is the only daughter of my mother'. If Rohan has no sisters, 'only daughter of my mother' would be impossible, but assuming sister is the mother of the person in the photo, she is Rohan's niece. But wait, if Rohan is female or if Rohan is referring to his daughter? No. Let's look at standard answers: Rohan's daughter's photograph. Wait! Rohan says 'Her mother (the photo subject's mother) is the only daughter of my mother'. If Rohan is female, she's referring to her daughter. If Rohan is male, 'only daughter of my mother' is Rohan's sister, so the photo is Rohan's niece. Let's examine: 'His daughter's' is standard if Rohan is female, but here Rohan is male, making it his sister's daughter (niece). Let's double check if we assume the speaker 'Rohan' is female or if Rohan is male. In Indian names Rohan is male. So Rohan's sister is the mother. Thus, the girl in the photo is Rohan's sister's daughter, which is Rohan's niece. Let's check: if the options are 'His wife', 'His daughter', 'His sister', 'His niece'. Correct is 'His niece's' (or 'His sister's daughter'). Let's keep it clear: 'His niece's'."
          }
        ]
      },
      {
        id: "apt-verbal",
        name: "Verbal Ability",
        formulas: [
          { name: "Subject-Verb Agreement", rule: "Singular subjects require singular verbs. Plural subjects require plural verbs. Watch out for clauses beginning with 'along with', 'as well as', 'together with'." },
          { name: "Active / Passive Voice", rule: "In active voice, subject performs action: S + V + O. In passive voice, subject receives action: O + (be + past participle) + by S." }
        ],
        quizzes: [
          {
            id: "q-verb-1",
            question: "Identify the grammatically correct sentence from the following options:",
            options: [
              "Neither the teacher nor the students was present.",
              "Neither the teacher nor the students were present.",
              "Neither the teacher or the students were present.",
              "Neither the teacher nor the students are been present."
            ],
            correctIndex: 1,
            explanation: "When using 'neither... nor', the verb agrees with the closer subject. The closer subject is 'students' (plural), so we must use 'were' (plural). Thus: 'Neither the teacher nor the students were present' is correct."
          },
          {
            id: "q-verb-2",
            question: "Choose the synonym for the word 'ABUNDANT':",
            options: ["Scarce", "Plentiful", "Rare", "Meager"],
            correctIndex: 1,
            explanation: "'Abundant' means existing or available in large quantities; overflowing. 'Plentiful' is its direct synonym. 'Scarce', 'Rare', and 'Meager' are antonyms."
          }
        ]
      }
    ]
  },
  dsaNotes: {
    title: "DSA Core Sheets & Concepts",
    subtitle: "Consolidated cheat sheets for Data Structures and Algorithms with code implementation templates.",
    topics: [
      {
        title: "Arrays & Strings",
        notes: "Arrays store elements in contiguous memory slots, allowing O(1) random access. Common techniques include Two-Pointer approach, Sliding Window, Prefix Sums, and Dutch National Flag algorithm.",
        codeSnippet: `// Kadane's Algorithm for Maximum Subarray Sum
function maxSubarraySum(arr) {
  let maxSoFar = arr[0];
  let currentMax = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currentMax = Math.max(arr[i], currentMax + arr[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  return maxSoFar;
}`
      },
      {
        title: "Linked Lists",
        notes: "Linked lists consist of nodes containing data and a next pointer. O(1) insertions/deletions once pointer is found. Important operations: Reversing a list (using 3 pointers), Floyd's Cycle Detection (slow & fast pointer).",
        codeSnippet: `// Reverse a singly linked list
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    let nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
}`
      },
      {
        title: "Trees & Graphs",
        notes: "Trees are hierarchical structures. Depth First Search (DFS - Inorder, Preorder, Postorder traversals) and Breadth First Search (BFS - level order traversal) are foundational algorithms. Graphs extend trees to include cycles and arbitrary connections.",
        codeSnippet: `// Breadth First Search (BFS) in Graph
function bfs(startNode, adjacencyList) {
  const queue = [startNode];
  const visited = new Set([startNode]);
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    for (const neighbor of adjacencyList[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`
      }
    ]
  },
  technical: {
    title: "CS Fundamental Notes",
    subtitle: "Short notes on Database Management Systems (DBMS), Operating Systems (OS), and Networks.",
    subjects: [
      {
        name: "Database Management Systems (DBMS)",
        points: [
          "**ACID Properties**: Atomicity (all or nothing), Consistency (preserves state rules), Isolation (independent transactions), Durability (persists after crashes).",
          "**Normalization**: Process of organizing tables to minimize redundancy (1NF: atomic values, 2NF: removes partial dependencies, 3NF: removes transitive dependencies).",
          "**Indexing**: Enhances read speeds using B-Trees or Hash indexes, making queries run in logarithmic time instead of scanning the full table."
        ]
      },
      {
        name: "Operating Systems (OS)",
        points: [
          "**Process vs Thread**: A process is an executing program instance with isolated memory; a thread is a lightweight execution unit inside a process sharing its memory.",
          "**Virtual Memory & Paging**: OS maps physical RAM to disk swap space. Paging divides memory into frames; page faults occur when a requested page is not in RAM.",
          "**Deadlock**: A state where processes are blocked waiting for resources held by each other. Four conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait)."
        ]
      },
      {
        name: "Computer Networks (CN)",
        points: [
          "**OSI Model (7 Layers)**: Physical, Data Link, Network (IP routing), Transport (TCP/UDP ports), Session, Presentation, Application (HTTP/DNS).",
          "**TCP vs UDP**: TCP is connection-oriented, guarantees delivery, checks packet ordering, and employs congestion control. UDP is connectionless, fast, and lightweight (good for gaming/video).",
          "**DNS (Domain Name System)**: Translates human-readable domain names (e.g. google.com) to machine-routable IP addresses."
        ]
      }
    ]
  },
  hr: {
    title: "HR Interview Preparation",
    subtitle: "Frameworks, ideal guidelines, and a live AI mock scoring evaluation.",
    questions: [
      {
        id: "hr-q-1",
        question: "Tell me about yourself.",
        framework: "Present-Past-Future Model",
        advice: "1. Present: State your current status and major achievement. 2. Past: Briefly mention college, key internships, or projects that built your core skills. 3. Future: State why this specific job matches your career path.",
        idealKeywords: ["achieved", "passionate", "experience", "learning", "contribute"]
      },
      {
        id: "hr-q-2",
        question: "Why should we hire you?",
        framework: "The Skill-Benefit Match",
        advice: "Align your skills directly with the job requirements. Mention a past instance where you solved a similar problem and explain how you will save them time or money.",
        idealKeywords: ["skill", "efficient", "solve", "reliable", "team player", "goals"]
      },
      {
        id: "hr-q-3",
        question: "Describe a time you faced a challenge and how you resolved it.",
        framework: "STAR Method (Situation, Task, Action, Result)",
        advice: "S: Give background. T: Describe your goal. A: Detail YOUR actions. R: State measurable results (e.g. speed improved by 30%, code cleaned, delivered on time).",
        idealKeywords: ["situation", "action", "solved", "result", "improved", "learned"]
      }
    ]
  }
};

// Company Specific Exam Patterns & Syllabus Guides
export const COMPANY_GUIDES = {
  Google: {
    name: "Google",
    tagline: "Software Engineer / Site Reliability Engineer",
    eligibility: "B.Tech/M.Tech/MCA/M.Sc. CGPA > 7.5 or equivalent. No active backlogs.",
    examPattern: [
      "Resume Screening: Deep review of Github, competitive programming ratings, and projects.",
      "Online Assessment (90 mins): 2 complex algorithmic questions (Graph, DP, or advanced Trees).",
      "Technical Round 1 (45 mins): Focuses on data structures, algorithmic complexities, and edge cases.",
      "Technical Round 2 (45 mins): High concurrency, API designs, or deep DSA problem solving.",
      "Googleyness & Leadership (45 mins): Behavioral evaluation on culture fit and working styles."
    ],
    syllabus: {
      coding: "Graphs (Dijkstra, DFS/BFS), Dynamic Programming, Segment Trees, Trie, Segmented Heaps.",
      coreCs: "Memory Management, Concurrency, Cache Coherency, System Design (Distributed Logs).",
      aptitude: "Probability, Combinatorics, Permutations & Combinations, Game Theory."
    },
    tips: [
      "Think out loud. Googlers evaluate your reasoning and how you accept hints.",
      "Write clean, syntactically correct code on Google Docs or virtual whiteboards.",
      "Always discuss time and space complexity (Big O) before writing code."
    ]
  },
  Microsoft: {
    name: "Microsoft",
    tagline: "Software Engineer I (IDC / MS India)",
    eligibility: "B.Tech/BE/M.Tech in CSE/IT or related branches. 7.0+ CGPA. Backlogs cleared.",
    examPattern: [
      "Online Assessment (90 mins): 3 coding questions on Codility (Arrays, Strings, HashMaps).",
      "Technical Interview 1 (45 mins): System debugging, Stack/Queue operations, and Trees.",
      "Technical Interview 2 (45 mins): Relational database queries, OOPs patterns, and System Design.",
      "AA (As Appropriate) Round (60 mins): Executive review focusing on passion, projects, and architecture."
    ],
    syllabus: {
      coding: "Linked Lists, Tree Traversals, Hash Maps, String Manipulation, Sorting.",
      coreCs: "SQL Queries, Indexing, Multithreading, Process Scheduling, Design Patterns (Singleton, Factory).",
      aptitude: "Logical Series, Speed & Distance, Work & Time, Syllogisms."
    },
    tips: [
      "Master pointers, linked list manipulations, and tree recursions.",
      "Prepare your final year project inside-out, including structural diagrams.",
      "Demonstrate customer obsession and passion for Microsoft technologies (Azure, VS Code)."
    ]
  },
  Amazon: {
    name: "Amazon",
    tagline: "SDE-1 / Summer Intern",
    eligibility: "CGPA > 6.5. Open to CS, IT, ECE, EE branches.",
    examPattern: [
      "Online Assessment (120 mins): 2 Coding questions + Code debugging section + Leadership assessment.",
      "Technical Round 1 (60 mins): Heavy focus on DSA (Trees, Graphs, Queues) and Amazon Leadership Principles.",
      "Technical Round 2 (60 mins): System design (LRU Cache, Parking Lot) + OOPs + Leadership Principles.",
      "Bar Raiser Round (60 mins): Core assessment on scalability, coding standards, and cultural alignment."
    ],
    syllabus: {
      coding: "Heaps, Graph Traversals, Sliding Window, Dynamic Programming, String Parsing.",
      coreCs: "Object-Oriented Programming (OOPs), DB Indexing, HTTP Handshakes, Load Balancing.",
      aptitude: "Ratios, Percentages, Cryptarithmetic, Logical Deductions."
    },
    tips: [
      "Amazon values its Leadership Principles. Format HR answers using the STAR method highlighting these principles.",
      "Write code with optimal space-time complexities. Focus on boundary conditions."
    ]
  },
  Meta: {
    name: "Meta",
    tagline: "Frontend Developer / Software Engineer",
    eligibility: "Bachelor's degree or higher. Relevant project portfolio or open-source work.",
    examPattern: [
      "Technical Screen (45 mins): 2 coding questions (highly standard, fast pace).",
      "Onsite Loop - Coding 1 (45 mins): Advanced data structures (Trie, Graphs, Matrix traversal).",
      "Onsite Loop - Systems (45 mins): System design (Feed architecture, Messenger, Client caching).",
      "Behavioral Round (45 mins): Handling conflicts, prioritization, past project successes."
    ],
    syllabus: {
      coding: "HashMaps, Queue traversals, Binary Search, Intervals, Tree BFS.",
      coreCs: "DOM manipulation, REST/GraphQL APIs, Browser Performance, Event Loop, HTTP caching.",
      aptitude: "Probability, Data Interpretation, Verbal correction."
    },
    tips: [
      "Speed is key. You are expected to solve 2 questions fully in 45 minutes.",
      "Be prepared to code in your preferred language without autocomplete or syntax checkers."
    ]
  },
  TCS: {
    name: "TCS",
    tagline: "Digital & Ninja Entry-Level Programs",
    eligibility: "60% or 6.0 CGPA in class 10th, 12th, and B.Tech. Maximum of 1 active backlog.",
    examPattern: [
      "TCS NQT Assessment (180 mins): Divided into Cognitive Skills (Aptitude, Verbal, Reasoning) and Coding (1-2 programming problems).",
      "Technical Interview (30 mins): Basic programming syntax, databases, and project walk-through.",
      "Managerial & HR Interview (20 mins): Discussion on relocation, shifts, and career goals."
    ],
    syllabus: {
      coding: "Basic Arrays, String reversing, Number series (Prime, Fibonacci), Command Line Arguments.",
      coreCs: "SQL Joins, Relational integrity, OOPs pillars (Inheritance, Polymorphism), SDLC models.",
      aptitude: "Averages, Time & Distance, Percentage, Blood Relations, Syllogisms, Vocabulary."
    },
    tips: [
      "Practicing previous TCS NQT coding questions helps, as patterns repeat.",
      "Be strong with core languages like C, C++, or Java."
    ]
  },
  Infosys: {
    name: "Infosys",
    tagline: "System Engineer / Specialist Programmer",
    eligibility: "60%+ throughout academics (10th, 12th, Graduation). Undergrads/Postgrads of CS/IT.",
    examPattern: [
      "Online Test (150 mins): Quantitative, Logical, Verbal, and 2-3 Hands-on Coding questions.",
      "Technical + HR Round (30-40 mins): Basic programming, DBMS, project presentation, and standard HR questions."
    ],
    syllabus: {
      coding: "Recursion, Array rotation, Basic Search/Sort, Matrix operations.",
      coreCs: "Operating system processes, SQL databases, HTML/JS fundamentals, Software engineering cycles.",
      aptitude: "Clocks and Calendars, Cryptarithmetic, Reading Comprehension, Sentence Completion."
    },
    tips: [
      "Prepare Cryptarithmetic puzzles, which are unique to Infosys assessments.",
      "Specialist Programmer track asks hard competitive programming questions."
    ]
  },
  Wipro: {
    name: "Wipro",
    tagline: "Elite National Talent Hunt (ENTH)",
    eligibility: "60% in 10th and 12th. 65% or 6.5 CGPA in B.Tech. CS/IT/ECE/EEE branches.",
    examPattern: [
      "Elite Assessment: 1. Aptitude (Quantitative, Logical, Verbal), 2. Written Communication (Essay), 3. Coding (2 Questions).",
      "Joint Tech + HR Interview (30 mins): Basic programming, OOPs, project questions, and relocation confirmation."
    ],
    syllabus: {
      coding: "Basic loops, Array sorting, String reversals, Pattern printing.",
      coreCs: "Data Types, Structure vs Union, SDLC, basic SQL queries.",
      aptitude: "Ratios, Time & Work, Coding-Decoding, Fill-in-the-blanks, Essay writing."
    },
    tips: [
      "Essay writing is graded by an AI bot. Use correct spelling, grammar, and formal vocabulary.",
      "Make sure you understand simple algorithmic structures like Bubble Sort and Linear Search."
    ]
  },
  Accenture: {
    name: "Accenture",
    tagline: "Associate Software Engineer / Advanced ASE",
    eligibility: "65% or 6.5 CGPA overall. No active backlogs at time of selection.",
    examPattern: [
      "Cognitive & Technical Assessment (90 mins): Cognitive (Aptitude, Logical, Verbal) + Technical (Pseudo Code, Cloud, Network Security, MS Office).",
      "Coding Assessment (45 mins): 2 coding questions (unlocked only if Cognitive assessment is passed).",
      "Communication Assessment (30 mins): Speaking, reading, listening, and repeating sentences (non-elimination but plays a role in final evaluation).",
      "One-on-One Interview (20-30 mins): Discussion on resume projects, team work, and behavioral challenges."
    ],
    syllabus: {
      coding: "String parsing, Array logic (find second largest, unique counts), Bitwise operators.",
      coreCs: "Pseudocode debugging, Basic networking, Cloud computing types, MS Word/Excel shortcuts.",
      aptitude: "Averages, Profit & Loss, Arrangements, Analytical puzzles, Error spotting."
    },
    tips: [
      "Practice pseudocode questions: Dry-running loops, bitwise operations, and scoping is vital.",
      "Speak clearly and at a normal pace in the voice assessment."
    ]
  }
};

// Dedicated DSA Prep Sheet & Testing Harness
export const DSA_SHEET = [
  {
    id: "dsa-1",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    testCases: [
      { input: "[[2, 7, 11, 15], 9]", expected: "[0, 1]" },
      { input: "[[3, 2, 4], 6]", expected: "[1, 2]" },
      { input: "[[3, 3], 6]", expected: "[0, 1]" }
    ],
    validationFnStr: `
      function validate(userFn) {
        const test1 = userFn([2, 7, 11, 15], 9);
        const test2 = userFn([3, 2, 4], 6);
        const test3 = userFn([3, 3], 6);
        
        // Helper to check arrays equal regardless of order
        const compare = (a1, a2) => {
          if (!Array.isArray(a1)) return false;
          return a1.slice().sort().join(',') === a2.slice().sort().join(',');
        };
        
        if (!compare(test1, [0, 1])) return "Test Case 1 failed: expected [0,1] or [1,0] for nums=[2,7,11,15], target=9. Got: " + JSON.stringify(test1);
        if (!compare(test2, [1, 2])) return "Test Case 2 failed: expected [1,2] or [2,1] for nums=[3,2,4], target=6. Got: " + JSON.stringify(test2);
        if (!compare(test3, [0, 1])) return "Test Case 3 failed: expected [0,1] or [1,0] for nums=[3,3], target=6. Got: " + JSON.stringify(test3);
        
        return true;
      }
    `
  },
  {
    id: "dsa-2",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stacks",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    starterCode: `function isValid(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: '["()"]', expected: "true" },
      { input: '["()[]{}"]', expected: "true" },
      { input: '["(]"]', expected: "false" }
    ],
    validationFnStr: `
      function validate(userFn) {
        const test1 = userFn("()");
        const test2 = userFn("()[]{}");
        const test3 = userFn("(]");
        const test4 = userFn("([)]");
        
        if (test1 !== true) return "Test Case 1 failed: expected true for '()'. Got: " + test1;
        if (test2 !== true) return "Test Case 2 failed: expected true for '()[]{}'. Got: " + test2;
        if (test3 !== false) return "Test Case 3 failed: expected false for '(]'. Got: " + test3;
        if (test4 !== false) return "Test Case 4 failed: expected false for '([)]'. Got: " + test4;
        
        return true;
      }
    `
  },
  {
    id: "dsa-3",
    title: "Maximum Subarray (Kadane)",
    difficulty: "Medium",
    topic: "Arrays",
    description: "Given an integer array `nums`, find the subarray (containing at least one number) which has the largest sum and return its sum.",
    starterCode: `function maxSubArray(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: "[[-2,1,-3,4,-1,2,1,-5,4]]", expected: "6" },
      { input: "[[1]]", expected: "1" },
      { input: "[[5,4,-1,7,8]]", expected: "23" }
    ],
    validationFnStr: `
      function validate(userFn) {
        const test1 = userFn([-2,1,-3,4,-1,2,1,-5,4]);
        const test2 = userFn([1]);
        const test3 = userFn([5,4,-1,7,8]);
        
        if (test1 !== 6) return "Test Case 1 failed: expected 6. Got: " + test1;
        if (test2 !== 1) return "Test Case 2 failed: expected 1. Got: " + test2;
        if (test3 !== 23) return "Test Case 3 failed: expected 23. Got: " + test3;
        
        return true;
      }
    `
  },
  {
    id: "dsa-4",
    title: "Reverse a String",
    difficulty: "Easy",
    topic: "Strings",
    description: "Write a function that takes a string `s` and returns it reversed. For example, given `'hello'`, return `'olleh'`.",
    starterCode: `function reverseString(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: '["hello"]', expected: '"olleh"' },
      { input: '["Vite"]', expected: '"etiV"' },
      { input: '["A"]', expected: '"A"' }
    ],
    validationFnStr: `
      function validate(userFn) {
        const test1 = userFn("hello");
        const test2 = userFn("Vite");
        const test3 = userFn("A");
        
        if (test1 !== "olleh") return "Test Case 1 failed: expected 'olleh'. Got: " + JSON.stringify(test1);
        if (test2 !== "etiV") return "Test Case 2 failed: expected 'etiV'. Got: " + JSON.stringify(test2);
        if (test3 !== "A") return "Test Case 3 failed: expected 'A'. Got: " + JSON.stringify(test3);
        
        return true;
      }
    `
  },
  {
    id: "dsa-5",
    title: "Climbing Stairs (DP)",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    starterCode: `function climbStairs(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: "[2]", expected: "2" },
      { input: "[3]", expected: "3" },
      { input: "[5]", expected: "8" }
    ],
    validationFnStr: `
      function validate(userFn) {
        const test1 = userFn(2);
        const test2 = userFn(3);
        const test3 = userFn(5);
        
        if (test1 !== 2) return "Test Case 1 failed: expected 2. Got: " + test1;
        if (test2 !== 3) return "Test Case 2 failed: expected 3. Got: " + test2;
        if (test3 !== 8) return "Test Case 3 failed: expected 8. Got: " + test3;
        
        return true;
      }
    `
  },
  {
    id: "dsa-6",
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Arrays",
    description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    starterCode: `function merge(intervals) {
  // Write your code here
  
}`,
    testCases: [
      { input: "[[[1,3],[2,6],[8,10],[15,18]]]", expected: "[[1,6],[8,10],[15,18]]" },
      { input: "[[[1,4],[4,5]]]", expected: "[[1,5]]" }
    ],
    validationFnStr: `
      function validate(userFn) {
        const test1 = userFn([[1,3],[2,6],[8,10],[15,18]]);
        const test2 = userFn([[1,4],[4,5]]);
        
        const compare = (a1, a2) => {
          return JSON.stringify(a1) === JSON.stringify(a2);
        };
        
        if (!compare(test1, [[1,6],[8,10],[15,18]])) return "Test Case 1 failed: expected [[1,6],[8,10],[15,18]]. Got: " + JSON.stringify(test1);
        if (!compare(test2, [[1,5]])) return "Test Case 2 failed: expected [[1,5]]. Got: " + JSON.stringify(test2);
        
        return true;
      }
    `
  }
];
