export interface IApiResponse<T> {
    result: boolean;
    message: string;
    data?: T;
}

export interface IUserDashboard {
  enrolledBatches: number;
  activeBatches: number;
  totalAvailableSessions: number;
  activeEnrollments: number;
}
export interface IAdminDashboard {
  totalBatches: number;
  activeBatches: number;
  totalCandidates: number;
  totalEnrollments: number;
  totalSessions: number;
}

export interface IBatchCandidateStats {
  batchId: number;
  batchName: string;
  totalCandidates: number;
  isActive: boolean;
  isPublic: boolean;
}



export interface IAuthApiResponse<T> {
    result: boolean;
    message: string;
    data?: T;
    token: string;
}
