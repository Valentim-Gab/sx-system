interface User {
  id?: number;
  name: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  dateBirth?: Date | string;
  profileImage?: string;
  role?: Array<'admin' | 'user'>;
  verifiedEmail?: boolean;
}
