// Mock Database
let jobs = [
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
    description: "Join the Google Core Services team as an Associate Software Engineer.",
    requirements: ["CS degree", "Proficiency in JS/Python", "Algorithms"],
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
    tags: ["React", "JavaScript", "CSS3", "Vite"],
    postedDate: "1 day ago",
    description: "We are looking for a passionate Frontend Developer.",
    requirements: ["ES6+", "CSS layouts", "Performance"],
    roundsLink: "Meta"
  }
];

let applications = [
  {
    id: "app-default",
    jobId: "job-1",
    jobTitle: "Associate Software Engineer",
    company: "Google",
    candidateName: "Kartikey",
    resumeName: "Kartikey_Resume_SDE.pdf",
    status: "Under Review",
    appliedDate: "3 days ago"
  }
];

let users = [];

module.exports = {
  jobs,
  applications,
  users
};
