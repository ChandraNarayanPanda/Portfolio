export const introText =
  "Hey, I'm **Chandra.** A final-year B.Tech CSE student at Gandhi Engineering College, Bhubaneswar. I enjoy building responsive web apps with **React,** **JavaScript,** **Tailwind CSS** and **Framer Motion,** and back-end APIs with **Flask** and **FastAPI.** I also work with machine learning in Python. I'm looking for an entry-level **Web Developer** role where I can learn from a team and build real features.";

export const skillRows = [
  ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Framer Motion", "Recharts"],
  ["Python", "SQL", "Node.js", "Express.js", "Flask", "FastAPI", "REST APIs"],
  ["MySQL", "MongoDB", "Scikit-learn", "Pandas", "NumPy", "Git", "GitHub", "Vercel"],
];

export const services = [
  { title: "Frontend Development", stack: "React, Tailwind CSS, Framer Motion" },
  { title: "Responsive Web Design", stack: "HTML, CSS, mobile-first layouts" },
  { title: "Backend & APIs", stack: "Flask, FastAPI, Node.js, Express" },
  { title: "Databases", stack: "MySQL, MongoDB, SQL" },
  { title: "AI & Machine Learning", stack: "Scikit-learn, Pandas, NumPy" },
  { title: "Git & Deployment", stack: "Git, GitHub, Vercel" },
];


export const githubProfile = "https://github.com/ChandraNarayanPanda";

export const projects = [
  {
    title: "Student Wellness Score",
    accent: "ai",
    description:
      "A full-stack web app that predicts a student's wellness score (0-10) from 12 inputs such as sleep, screen time and stress. A FastAPI REST API with Pydantic validation serves a trained scikit-learn model to a responsive JavaScript frontend.",
    tech: ["Python", "FastAPI", "JavaScript", "Scikit-learn", "Vercel"],
    image: "/images/wellness.webp",
    alt: "Illustrated preview of the Student Wellness Score AI dashboard",
    github: "https://github.com/ChandraNarayanPanda/student-wellness-score-ai",
    live: "https://student-wellness-score-ai.vercel.app",
  },
  {
    title: "Quill",
    accent: "writing studio",
    description:
      "An AI writing studio that rewrites pasted text in six modes (polish, expand, condense, formalize, casualize and vivify) using the Claude API, with streaming output and one-click copy.",
    tech: ["React", "Vite", "Claude API", "Vercel"],
    image: null,
    alt: "",
    github: "https://github.com/ChandraNarayanPanda/quill-ai-writing-tool",
    live: "https://quill-ai-writing-tool.vercel.app",
  },
  {
    title: "SkillSync",
    accent: "ai",
    description:
      "A responsive career dashboard with job application tracking, interview preparation and interactive career analytics. It has reusable React components, filtering, form validation, LocalStorage persistence and a job-description matching view that shows matching skills, skill gaps and learning recommendations from a demo-analysis workflow.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "Framer Motion", "Recharts"],
    image: "/images/skillsync.webp",
    alt: "Illustrated preview of the SkillSync AI career dashboard",
    github: "",
    live: "",
  },
  {
    title: "Breast Cancer Prediction",
    accent: "system",
    description:
      "A Flask web app with an HTML/CSS interface that collects 30 input features and shows the prediction. The classifier was trained on the Wisconsin Diagnostic dataset (569 samples) and reached 96% accuracy and 95% recall. Built during my CTTC training in June 2025. For learning only, not medical advice.",
    tech: ["Python", "Flask", "HTML", "CSS", "Scikit-learn"],
    image: "/images/breast-cancer.webp",
    alt: "Illustrated preview of the Breast Cancer Prediction web app",
    github: "",
    live: "",
  },
];