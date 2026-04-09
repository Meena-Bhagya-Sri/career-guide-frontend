const careerData = [
  {
    id: "data-scientist",
    careerName: "Data Scientist",
    description: "Analyze data, build models, and extract insights",
    stages: [
      {
        stage_number: 1,
        stage_title: "Python & Math",
        description: "Foundational programming and mathematics",
        skills: [
          { name: "Python", roadmap: ["Python", "Data-Analyst", "Machine-Learning"] },
          { name: "Statistics", roadmap: ["Data-Analyst", "BI-Analyst"] },
          { name: "Mathematics Foundations", roadmap: ["Machine-Learning", "AI-Engineer"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Data Analysis",
        description: "Data cleaning and visualization",
        skills: [
          { name: "Pandas", roadmap: ["Python", "Data-Analyst"] },
          { name: "NumPy", roadmap: ["Python", "Machine-Learning"] },
          { name: "EDA", roadmap: ["Data-Analyst"] },
          { name: "Data Visualization", roadmap: ["BI-Analyst", "UX-Design"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Machine Learning",
        description: "Build predictive models",
        skills: [
          { name: "Regression", roadmap: ["Machine-Learning"] },
          { name: "Classification", roadmap: ["Machine-Learning"] },
          { name: "Model Evaluation", roadmap: ["Machine-Learning", "Mlops"] },
          { name: "Scikit-learn", roadmap: ["Machine-Learning", "AI-Engineer"] },
        ],
      },
    ],
  },

  {
    id: "ml-engineer",
    careerName: "Machine Learning Engineer",
    description: "Design and deploy machine learning systems",
    stages: [
      {
        stage_number: 1,
        stage_title: "Foundations",
        description: "Core mathematical and programming basics",
        skills: [
          { name: "Python", roadmap: ["Python", "Machine-Learning"] },
          { name: "Mathematics", roadmap: ["AI-Engineer"] },
          { name: "Statistics", roadmap: ["Machine-Learning"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Core Machine Learning",
        description: "Learning algorithms and model building",
        skills: [
          { name: "Supervised Learning", roadmap: ["Machine-Learning"] },
          { name: "Unsupervised Learning", roadmap: ["Machine-Learning"] },
          { name: "Scikit-learn", roadmap: ["Machine-Learning"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Advanced ML",
        description: "Deep learning and deployment",
        skills: [
          { name: "Deep Learning", roadmap: ["AI-Engineer"] },
          { name: "NLP", roadmap: ["AI-Agents"] },
          { name: "Model Deployment", roadmap: ["Mlops", "DevOps"] },
        ],
      },
    ],
  },

  {
    id: "software-engineer",
    careerName: "Software Engineer",
    description: "Build scalable and reliable software systems",
    stages: [
      {
        stage_number: 1,
        stage_title: "Programming Fundamentals",
        description: "Learn core programming concepts",
        skills: [
          { name: "C / C++ / Java / Python", roadmap: ["CPP", "Java", "Python"] },
          { name: "OOP Concepts", roadmap: ["Software-Design-Architecture"] },
          { name: "Problem Solving", roadmap: ["DataStructures-And-Algorithms"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Data Structures & Algorithms",
        description: "Master problem solving techniques",
        skills: [
          { name: "Arrays & Strings", roadmap: ["DataStructures-And-Algorithms"] },
          { name: "Linked Lists", roadmap: ["DataStructures-And-Algorithms"] },
          { name: "Trees & Graphs", roadmap: ["DataStructures-And-Algorithms"] },
          { name: "Algorithms", roadmap: ["System-Design"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Backend Development",
        description: "Build scalable backend systems",
        skills: [
          { name: "REST APIs", roadmap: ["Backend", "API-Design"] },
          { name: "Databases", roadmap: ["SQL", "MongoDB"] },
          { name: "Authentication", roadmap: ["Backend", "Cyber-Security"] },
        ],
      },
    ],
  },

  {
    id: "cloud-engineer",
    careerName: "Cloud Engineer",
    description: "Design, deploy and manage cloud infrastructure",
    stages: [
      {
        stage_number: 1,
        stage_title: "Cloud Fundamentals",
        description: "Core infrastructure knowledge",
        skills: [
          { name: "Networking", roadmap: ["Computer-Science"] },
          { name: "Linux", roadmap: ["Linux"] },
          { name: "Cloud Basics", roadmap: ["AWS"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "AWS Core Services",
        description: "Essential AWS services",
        skills: [
          { name: "EC2", roadmap: ["AWS"] },
          { name: "S3", roadmap: ["AWS"] },
          { name: "IAM", roadmap: ["AWS"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Cloud Automation",
        description: "Automation and DevOps tools",
        skills: [
          { name: "Docker", roadmap: ["Docker"] },
          { name: "CI/CD", roadmap: ["DevOps"] },
          { name: "Infrastructure as Code", roadmap: ["DevOps"] },
        ],
      },
    ],
  },

 {
    id: "cyber-security",
    careerName: "Cyber Security Engineer",
    description: "Protect systems and networks from cyber threats",
    stages: [
      {
        stage_number: 1,
        stage_title: "Security Basics",
        description: "Core system and network security",
        skills: [
          { name: "Networking", roadmap: ["Computer-Science", "Cyber-Security"] },
          { name: "Linux", roadmap: ["Linux", "Cyber-Security"] },
          { name: "Security Fundamentals", roadmap: ["Cyber-Security"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Ethical Hacking",
        description: "Offensive security techniques",
        skills: [
          { name: "Penetration Testing", roadmap: ["Cyber-Security"] },
          { name: "Metasploit", roadmap: ["Cyber-Security"] },
          { name: "Burp Suite", roadmap: ["Cyber-Security"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Advanced Security",
        description: "Enterprise security operations",
        skills: [
          { name: "SIEM", roadmap: ["Cyber-Security"] },
          { name: "SOC", roadmap: ["Cyber-Security"] },
          { name: "Incident Response", roadmap: ["Cyber-Security"] },
        ],
      },
    ],
  },

  {
    id: "devops-engineer",
    careerName: "DevOps Engineer",
    description: "Automate deployment and infrastructure operations",
    stages: [
      {
        stage_number: 1,
        stage_title: "Linux & Networking",
        description: "System fundamentals",
        skills: [
          { name: "Linux", roadmap: ["Linux", "DevOps"] },
          { name: "TCP/IP", roadmap: ["Computer-Science", "DevOps"] },
          { name: "Shell Scripting", roadmap: ["Linux", "DevOps"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "CI/CD & Containers",
        description: "Build and deploy pipelines",
        skills: [
          { name: "Docker", roadmap: ["Docker", "DevOps"] },
          { name: "Jenkins", roadmap: ["DevOps"] },
          { name: "GitHub Actions", roadmap: ["DevOps"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Orchestration",
        description: "Scalable deployment systems",
        skills: [
          { name: "Kubernetes", roadmap: ["DevOps"] },
          { name: "Monitoring", roadmap: ["DevOps"] },
          { name: "Logging", roadmap: ["DevOps"] },
        ],
      },
    ],
  },

  {
    id: "ai-research",
    careerName: "AI Research Engineer",
    description: "Research and build advanced AI models",
    stages: [
      {
        stage_number: 1,
        stage_title: "Math Foundations",
        description: "Mathematical foundations of AI",
        skills: [
          { name: "Linear Algebra", roadmap: ["AI-Engineer"] },
          { name: "Probability", roadmap: ["AI-Engineer"] },
          { name: "Calculus", roadmap: ["AI-Engineer"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Deep Learning",
        description: "Advanced neural networks",
        skills: [
          { name: "CNN", roadmap: ["AI-Engineer"] },
          { name: "RNN", roadmap: ["AI-Engineer"] },
          { name: "Transformers", roadmap: ["AI-Engineer"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Research & Papers",
        description: "Academic and experimental research",
        skills: [
          { name: "ArXiv Reading", roadmap: ["AI-Research"] },
          { name: "Experiments", roadmap: ["AI-Research"] },
          { name: "Model Optimization", roadmap: ["AI-Engineer"] },
        ],
      },
    ],
  },

  {
    id: "data-analyst",
    careerName: "Data Analyst",
    description: "Analyze data and create actionable reports",
    stages: [
      {
        stage_number: 1,
        stage_title: "Data Basics",
        description: "Data fundamentals",
        skills: [
          { name: "Excel", roadmap: ["Data-Analyst"] },
          { name: "SQL", roadmap: ["SQL", "Data-Analyst"] },
          { name: "Statistics", roadmap: ["Data-Analyst"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Data Analysis",
        description: "Hands-on data analysis",
        skills: [
          { name: "Python", roadmap: ["Python", "Data-Analyst"] },
          { name: "Pandas", roadmap: ["Python", "Data-Analyst"] },
          { name: "Visualization", roadmap: ["BI-Analyst"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Advanced Analytics",
        description: "Business intelligence",
        skills: [
          { name: "Power BI", roadmap: ["BI-Analyst"] },
          { name: "Tableau", roadmap: ["BI-Analyst"] },
          { name: "Storytelling", roadmap: ["BI-Analyst"] },
        ],
      },
    ],
  },

  {
    id: "backend-developer",
    careerName: "Backend Developer",
    description: "Build APIs, databases, and backend services",
    stages: [
      {
        stage_number: 1,
        stage_title: "Programming Basics",
        description: "Core backend programming",
        skills: [
          { name: "Java", roadmap: ["Java", "Backend"] },
          { name: "Python", roadmap: ["Python", "Backend"] },
          { name: "OOP", roadmap: ["Software-Design-Architecture"] },
        ],
      },
      {
        stage_number: 2,
        stage_title: "Backend Frameworks",
        description: "Framework-based development",
        skills: [
          { name: "Spring Boot", roadmap: ["Spring-Boot"] },
          { name: "Flask", roadmap: ["Python", "Backend"] },
        ],
      },
      {
        stage_number: 3,
        stage_title: "Databases & APIs",
        description: "Data and security",
        skills: [
          { name: "REST APIs", roadmap: ["API-Design", "Backend"] },
          { name: "SQL", roadmap: ["SQL"] },
          { name: "Security", roadmap: ["Cyber-Security"] },
        ],
      },
    ],
  },
];

export default careerData;




