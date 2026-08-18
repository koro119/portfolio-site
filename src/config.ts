// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Zylen Saldahna | AI Engineer & CS Student",
  description: "Computer Science student at University of Greenwich specializing in AI, Machine Learning, and intelligent systems.",
  language: "en",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "",
  items: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Journey", href: "#journey" },
    { label: "Terminal", href: "#terminal" },
    { label: "Contact", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  profileImage: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  title: "Zylen Saldahna",
  subtitle: "Computer Science Student | Future AI Engineer",
  tagline: "Building Intelligent Systems & Real-World AI Solutions",
  ctaText: "Explore My Work",
  profileImage: "/profile.jpg",
  backgroundImage: "/hero-bg.jpg",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  title: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

export const aboutConfig: AboutConfig = {
  title: "About Me",
  description: "I am a Computer Science student at the University of Greenwich with a strong interest in Artificial Intelligence and Machine Learning. I enjoy building systems that combine software and hardware — from smart vision-based prototypes to data-driven applications. My long-term goal is to work in the AI and Machine Learning sector, building intelligent systems that solve real-world problems.",
  image: "/profile.jpg",
  stats: [
    { label: "Projects", value: "6+" },
    { label: "Technologies", value: "15+" },
    { label: "Years Coding", value: "3+" },
  ],
};

// ============================================================================
// Projects Section Configuration
// ============================================================================

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
}

export interface ProjectsConfig {
  title: string;
  subtitle: string;
  projects: ProjectItem[];
}

export const projectsConfig: ProjectsConfig = {
  title: "Projects",
  subtitle: "A collection of my work in AI, computer vision, and software development.",
  projects: [
    {
      id: 1,
      title: "Space Debris Monitoring & Collision Prediction",
      category: "AI / Space Tech",
      description: "System design for monitoring orbital debris and predicting satellite collision risks using predictive algorithms.",
      image: "/project-space-debris.jpg",
      technologies: ["Python", "Data Analysis", "Predictive Modeling"],
    },
    {
      id: 2,
      title: "Smart Reading Glasses Prototype",
      category: "Hardware / AI",
      description: "Raspberry Pi Zero 2 W + camera integration with live video capture and Python-based AI assistant processing.",
      image: "/project-smart-glasses.jpg",
      technologies: ["Raspberry Pi", "Python", "Computer Vision", "Embedded Systems"],
    },
    {
      id: 3,
      title: "Hand Sign Recognition System",
      category: "Computer Vision / ML",
      description: "ASL recognition using pre-trained CNN models with Kaggle dataset integration and real-time video inference.",
      image: "/project-asl.jpg",
      technologies: ["CNN", "TensorFlow", "OpenCV", "Python"],
    },
    {
      id: 4,
      title: "Python Blackjack Game",
      category: "Game Development",
      description: "Object-oriented programming implementation with complete game logic and player management.",
      image: "/project-blackjack.jpg",
      technologies: ["Python", "OOP", "Game Logic"],
    },
    {
      id: 5,
      title: "Family Tree System",
      category: "Data Structures",
      description: "OOP Python project featuring custom Person class, object relationships, and dictionary-based data structure.",
      image: "/project-family-tree.jpg",
      technologies: ["Python", "OOP", "Data Structures"],
    },
    {
      id: 6,
      title: "Boolean Postfix Calculator",
      category: "Algorithms",
      description: "Stack-based expression evaluation with parsing logic for boolean operations.",
      image: "/project-calculator.jpg",
      technologies: ["Python", "Stacks", "Parsing", "Algorithms"],
    },
  ],
};

// ============================================================================
// Skills Section Configuration
// ============================================================================

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export interface SkillsConfig {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export const skillsConfig: SkillsConfig = {
  title: "Skills",
  subtitle: "Technologies and tools I work with to build intelligent systems.",
  categories: [
    {
      name: "Programming",
      skills: [
        { name: "Python", level: 90 },
        { name: "Shell Scripting", level: 75 },
        { name: "Object-Oriented Programming", level: 85 },
      ],
    },
    {
      name: "AI & Data",
      skills: [
        { name: "CNN Models", level: 80 },
        { name: "Computer Vision", level: 85 },
        { name: "Dataset Integration", level: 75 },
        { name: "Model Inference", level: 80 },
      ],
    },
    {
      name: "Systems & Hardware",
      skills: [
        { name: "Raspberry Pi", level: 85 },
        { name: "Camera Modules", level: 80 },
        { name: "Embedded Prototyping", level: 75 },
      ],
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", level: 85 },
        { name: "Linux", level: 80 },
        { name: "VS Code", level: 90 },
      ],
    },
  ],
};

// ============================================================================
// Journey Section Configuration
// ============================================================================

export interface JourneyConfig {
  title: string;
  subtitle: string;
  steps: { text: string; highlight: string }[];
  profileImage: string;
}

export const journeyConfig: JourneyConfig = {
  title: "My Journey",
  subtitle: "From simple scripts to intelligent systems",
  steps: [
    { text: "I started with simple Python scripts...", highlight: "Python" },
    { text: "Then I built intelligent systems...", highlight: "Intelligent Systems" },
    { text: "Now I'm building AI-powered solutions.", highlight: "AI Solutions" },
  ],
  profileImage: "/profile.jpg",
};

// ============================================================================
// Terminal Section Configuration
// ============================================================================

export interface TerminalConfig {
  title: string;
  subtitle: string;
  commands: Record<string, string[]>;
}

export const terminalConfig: TerminalConfig = {
  title: "Interactive Terminal",
  subtitle: "Type commands to learn more about me",
  commands: {
    help: [
      "Available commands:",
      "  about     - Learn about Zylen",
      "  projects  - View project highlights",
      "  skills    - See technical skills",
      "  contact   - Get contact information",
      "  clear     - Clear terminal",
    ],
    about: [
      "Zylen Saldahna",
      "================",
      "Computer Science Student at University of Greenwich",
      "",
      "Passionate about AI and Machine Learning",
      "Building systems that combine software and hardware",
      "Goal: Work in AI/ML sector solving real-world problems",
    ],
    projects: [
      "Featured Projects:",
      "==================",
      "1. Space Debris Monitoring & Collision Prediction",
      "2. Smart Reading Glasses Prototype (Raspberry Pi)",
      "3. Hand Sign Recognition System (ASL)",
      "4. Python Blackjack Game",
      "5. Family Tree System",
      "6. Boolean Postfix Calculator",
    ],
    skills: [
      "Technical Skills:",
      "=================",
      "Languages: Python, Shell Scripting",
      "AI/ML: CNN, Computer Vision, Model Inference",
      "Hardware: Raspberry Pi, Camera Modules",
      "Tools: Git, Linux, VS Code",
    ],
    contact: [
      "Contact Information:",
      "====================",
      "Email: zylen.saldahna@example.com",
      "LinkedIn: linkedin.com/in/zylensaldahna",
      "GitHub: github.com/zylensaldahna",
    ],
  },
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactConfig {
  title: string;
  subtitle: string;
  email: string;
  linkedin: string;
  github: string;
  ctaText: string;
}

export const contactConfig: ContactConfig = {
  title: "Let's Connect",
  subtitle: "Interested in collaborating or have a question? Reach out!",
  email: "zylen.saldahna@example.com",
  linkedin: "linkedin.com/in/zylensaldahna",
  github: "github.com/zylensaldahna",
  ctaText: "Get In Touch",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterConfig {
  marqueeText: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "Building the Future with AI",
  copyright: "© 2024 Zylen Saldahna. All rights reserved.",
  tagline: "Computer Science Student | AI Enthusiast",
};

// ============================================================================
// Legacy Configs (for template compatibility)
// ============================================================================

export const heroConfigLegacy = {
  title: "",
  subtitle: "",
  backgroundImage: "",
  servicesLabel: "",
  copyright: "",
};

export const aboutConfigLegacy = {
  titleLine1: "",
  titleLine2: "",
  description: "",
  image1: "",
  image1Alt: "",
  image2: "",
  image2Alt: "",
  authorImage: "",
  authorName: "",
  authorBio: "",
};

export const worksConfig = {
  title: "",
  subtitle: "",
  projects: [],
};

export const servicesConfig = {
  title: "",
  subtitle: "",
  services: [],
};

export const testimonialsConfig = {
  title: "",
  testimonials: [],
};

export const pricingConfig = {
  title: "",
  subtitle: "",
  ctaButtonText: "",
  plans: [],
};

export const faqConfig = {
  title: "",
  faqs: [],
};

export const blogConfig = {
  title: "",
  subtitle: "",
  allPostsLabel: "",
  readMoreLabel: "",
  readTimePrefix: "",
  posts: [],
};

export const contactConfigLegacy = {
  title: "",
  subtitle: "",
  nameLabel: "",
  emailLabel: "",
  projectTypeLabel: "",
  projectTypePlaceholder: "",
  projectTypeOptions: [],
  messageLabel: "",
  submitButtonText: "",
  image: "",
};

export const footerConfigLegacy = {
  marqueeText: "",
  marqueeHighlightChars: [],
  navLinks1: [],
  navLinks2: [],
  ctaText: "",
  ctaHref: "",
  copyright: "",
  tagline: "",
};
