import { IBatch } from "./Batch";
import { IUser } from "./Candidate";

export interface IBatchEnrollment{
  _id: string | undefined;
  batchId: IBatch;
  candidateId: IUser;
  enrollmentDate: string;
  isActive: boolean;
}
// export interface IBatchEnrollmentResponse {
//   _id: string;
//   enrollmentDate: Date | string;
//   isActive: boolean;
//   fullName: string;
//   mobileNumber: string;
//   batchName: string;
//   batchId: string;
// }