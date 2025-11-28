export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  message: string;
}

export interface TestimonialFormData {
  name: string;
  designation: string;
  message: string;
  rating: number;
  approved: boolean;
}

export const initialTestimonialFormData: TestimonialFormData = {
  name: "",
  designation: "",
  message: "",
  rating: 5,
  approved: true,
};

// Local state for rating and approval (stored in localStorage)
export interface TestimonialLocalData {
  [id: string]: {
    rating: number;
    approved: boolean;
  };
}
