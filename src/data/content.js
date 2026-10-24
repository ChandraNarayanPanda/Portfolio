export const introText =
  "Hey, I'm **Chandra.** A final-year B.Tech CSE student at Gandhi Engineering College, Bhubaneswar, and an **Aspiring Web Developer** and **AI/ML Enthusiast.** I build responsive web apps with **React,** **JavaScript,** **Tailwind CSS** and **Framer Motion,** and back-end APIs with **Flask** and **FastAPI.** I also build machine learning models in Python with **Scikit-learn,** **Pandas** and **NumPy.** I'm looking for an entry-level **Web Developer** or **AI/ML** role where I can learn from a team and build real features.";
  
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
    category: "ai",
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
    title: "Breast Cancer Prediction",
    category: "ai",
    accent: "system",
    description:
      "A Flask web app with an HTML/CSS interface that collects 30 input features and shows the prediction. The classifier was trained on the Wisconsin Diagnostic dataset (569 samples) and reached 96% accuracy and 95% recall. For learning only, not medical advice.",
    tech: ["Python", "Flask", "HTML", "CSS", "Scikit-learn"],
    image: "/images/breast-cancer.webp",
    alt: "Illustrated preview of the Breast Cancer Prediction web app",
    github: "https://github.com/ChandraNarayanPanda/breast-cancer-classifier",
    live: "https://breast-cancer-classifier-theta.vercel.app/",
  },
];

export const contact = {
  email: "chandranarayanpanda2005@gmail.com",
  github: "https://github.com/ChandraNarayanPanda",
  linkedin: "https://www.linkedin.com/in/chandranarayanpanda/",
  location: "Bhubaneswar, Odisha, India",
};

export const certificates = [
  {
    short: "Data Science Professional",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle University",
    tag: "AI / ML",
    date: "Oct 24, 2025",
    valid: "Valid until Oct 24, 2027",
    id: "102315778OCI25DSOCP",
    verify: "",
    skills: [],
    image: "/certs/oracle-data-science.webp",
    featured: true,
  },


    {
    short: "AI & Machine Learning",
    title: "Artificial Intelligence and Machine Learning course, CTTC Bhubaneswar",
    issuer: "CTTC Bhubaneswar",
    tag: "AI / ML",
    date: "Jun 13, 2026",
    valid: "",
    id: "",
    verify: "",
    skills: ["Python", "Machine Learning", "Computer Vision", "Deep Learning (Keras)"],
    image: "/certs/cttc-ai-ml-certificate.webp",
  },


  {
    short: "AI Foundations Associate",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    tag: "AI / ML",
    date: "Aug 17, 2025",
    valid: "Valid until Aug 17, 2027",
    id: "102315778OCI25AICFA",
    verify: "",
    skills: [],
    image: "/certs/oracle-ai-foundations.webp",
  },
  {
    short: "Generative AI Essentials",
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft and LinkedIn Learning",
    tag: "AI",
    date: "May 9, 2026",
    valid: "",
    id: "",
    verify: "",
    skills: ["Microsoft Copilot", "Generative AI", "Responsible AI"],
    image: "/certs/microsoft-genai.webp",
  },
  {
    short: "Introduction to Data Science",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    tag: "Data",
    date: "Jun 16, 2025",
    valid: "",
    id: "",
    verify: "",
    skills: [],
    image: "/certs/cisco-data-science.webp",
  },
  {
    short: "Web Development Fundamentals",
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    tag: "Web",
    date: "Jul 15, 2025",
    valid: "",
    id: "",
    verify: "https://www.credly.com/badges/7f2f574b-03bc-4c6e-a0a6-2aae12723690",
    skills: [],
    image: "/certs/ibm-web-fundamentals.webp",
  },
  {
    short: "Beginner's Guide to Web Development",
    title: "Click, Code, Create: Beginner's Guide to Web Development 2025-26",
    issuer: "IBM SkillsBuild",
    tag: "Web",
    date: "Jul 26, 2025",
    valid: "",
    id: "PLAN-5E565B600BE3",
    verify: "",
    skills: [],
    image: "/certs/ibm-click-code-create.webp",
  },
];

export const experience = [
  {
    type: "Industrial training / Internship",
    role: "AI & Machine Learning Training",
    org: "Central Tool Room & Training Centre (CTTC), Bhubaneswar",
    platform: "Govt. of India society, Ministry of MSME",
    period: "May - Jun 2026",
    points: [
      "Completed a one-month AI and Machine Learning course (15 May to 13 June 2026) for my industrial training and internship requirements.",
      "Covered Python, supervised and unsupervised learning, natural language processing, computer vision and deep learning with Keras.",
      "Developed a face detection system and an emotion detection system.",
    ],
    skills: ["Python", "Machine Learning", "Computer Vision", "Deep Learning (Keras)"],
    docs: [
      {
        label: "Course certificate",
        image: "/certs/cttc-ai-ml-certificate.webp",
        title: "CTTC Bhubaneswar: Artificial Intelligence and Machine Learning course certificate",
      },
      {
        label: "Training letter",
        image: "/certs/cttc-training-letter.webp",
        title: "CTTC Bhubaneswar: industrial training letter, 13 June 2026",
      },
    ],
  },
  {
    type: "Project-based learning program",
    role: "Front-End Web Development Program",
    org: "CSRBOX Foundation",
    platform: "with IBM SkillsBuild",
    period: "Jul - Aug 2025",
    points: [
      "Completed the IBM SkillsBuild project-based learning program Click, Code, Create: Beginner's Guide to Front End Web Development, run by CSRBOX.",
    ],
    skills: ["Front-end web development"],
    docs: [
      {
        label: "Certificate",
        image: "/certs/csrbox-ibm-pbl.webp",
        title: "CSRBOX and IBM SkillsBuild: Project Based Learning Program certificate",
      },
    ],
  },
  {
    type: "Virtual job simulation",
    role: "Data Analytics Job Simulation",
    org: "Deloitte",
    platform: "via Forage",
    period: "June 2025",
    points: ["Completed practical tasks in data analysis and forensic technology."],
    skills: ["Data analysis", "Forensic technology"],
    docs: [
      {
        label: "Certificate",
        image: "/certs/deloitte-data-analytics.webp",
        title: "Deloitte Data Analytics Job Simulation (Forage)",
      },
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

