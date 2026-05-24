export interface Profile {
  lastName: string;
  phoneNumber: string;
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  uid: string;
  providerData: unknown[];
}
