const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const jobs = [
    {
      title: "Associate Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full-Time",
      experience: "0-2 Years",
      salary: "₹18,00,000 - ₹24,00,000 / year",
      tags: ["React", "Python", "Algorithms", "C++", "Remote-Friendly"],
      description: "Join the Google Core Services team as an Associate Software Engineer.",
      requirements: ["CS degree", "Proficiency in JS/Python", "Algorithms"]
    },
    {
      title: "Frontend Developer (Vite/React)",
      company: "Meta",
      location: "Hyderabad, India",
      type: "Full-Time",
      experience: "1-3 Years",
      salary: "₹22,00,000 - ₹30,00,000 / year",
      tags: ["React", "JavaScript", "CSS3", "Vite"],
      description: "We are looking for a passionate Frontend Developer.",
      requirements: ["ES6+", "CSS layouts", "Performance"]
    }
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log('Database seeded with initial jobs!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
