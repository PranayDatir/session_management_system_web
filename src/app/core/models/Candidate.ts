export interface IUser extends Document {
  _id: string | undefined;
  fullName: string;
  email: string;
  mobileNumber?: string;
  password?: string;
  role?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}