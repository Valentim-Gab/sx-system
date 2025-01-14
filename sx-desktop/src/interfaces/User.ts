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

interface RulesPassword {
  minLength: boolean;
  maxLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}