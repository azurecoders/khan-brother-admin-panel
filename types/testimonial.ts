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
}

export const initialTestimonialFormData: TestimonialFormData = {
  name: "",
  designation: "",
  message: "",
};
