// types/portfolio.ts

// Project/Work type definition
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'fullstack' | 'frontend' | 'backend' | 'devops';
}

// Experience timeline item
export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  type: 'work' | 'project' | 'education';
}

// Technology stack item
export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'tools';
  icon?: string;
}


