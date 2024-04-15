export interface JobApplicationRequest {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal?: string;
  references?: string;
  languages?: string;
  race?: string;
  gender?: string;
  disability_status?: string;
  cover_letter?: string;
  salary?: string;
  relocate?: number;
  overtime?: number;
  felony?: number;
  notes?: string;
  user_id: number;
  job_post_id: number;
}
  
export interface JobApplicationSearchParams {
  page?: number;
  limit?: number;
  name?: string;
  job_post_id?: number;
}