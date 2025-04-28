export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  testimonial: string;
  votes: number;
  createdAt: Date;
  approved: boolean;
} 