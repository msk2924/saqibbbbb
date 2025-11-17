
export interface Faculty {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  office_hours: string;
  bio: string;
  research_areas: string[];
  publications: { title: string; year: number; link: string; }[];
  photo: string;
  social: {
    linkedin?: string;
    orcid?: string;
    google_scholar?: string;
  };
}

export interface Course {
  id: string;
  title: string;
  code: string;
  department: string;
  description: string;
  credits: number;
  prerequisites: string[];
  instructorIds: string[];
}

export interface News {
  id: string;
  title: string;
  date: string; // ISO 8601 format
  summary: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO 8601 format
  location: string;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headId: string;
}
