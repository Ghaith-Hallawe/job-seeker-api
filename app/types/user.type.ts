export interface User {
  id?: number;
  name: string;
  email: string;
  user_type: string;
  is_email_verified?: boolean;
  user_image?: string;
  mobile_number?: string;
  gender?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  last_login_date?: Date;
}