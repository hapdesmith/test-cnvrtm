export interface RegisterFormData {
  userId: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  userId: string;
  password: string;
}

export type SalutationType = 'mr' | 'mrs' | 'ms';
export type GenderType = 'male' | 'female';
export type MartialStatusType = 'single' | 'married';

export interface ProfileData {
  imageUrl?: string;
  salutation: SalutationType;
  firstName: string;
  lastName: string;
  email: string;
};

export interface AdditionalData {
  homeAddress: string;
  country: string;
  dateOfBirth: string;
  gender: GenderType;
  martialStatus: MartialStatusType;
};

export interface SpouseData {
  salutation: SalutationType;
  firstName: string;
  lastName: string;
};

export interface PersonalPreference {
  hobbies: string[];
  sports: string[];
  music: string[];
  movies: string[];
};

export interface PersonalPreferenceInput {
  hobbies: string;
  sports: string;
  music: string;
  movies: string;
};
export interface LocalStorageProfile {
  profileData: ProfileData;
  additionalData: AdditionalData;
  spouseData: SpouseData;
  personalPreference: PersonalPreference;
}