export class ApiRoutes {
    static readonly BATCH_USER_LOGIN = 'BatchUser/login';
    static readonly BATCHES = 'Batches';
    static readonly CANDIDATES = 'Candidates';
    static readonly BATCH_ENROLLMENTS = 'BatchEnrollments';
    static readonly ALL_ENROLLMENTS = 'BatchEnrollments/GetAllEnrollment';
    static readonly GET_ENROLLMENT_BY_ID = 'BatchEnrollments/getEnrollentById';
    static readonly GET_ENROLLMENT_BY_CANDIDATE_ID = 'BatchEnrollments/by-candidate/';
    static readonly GET_SESSION_BY_ID = 'BatchSessions';
    static readonly GET_ALL_SESSIONS_RECORDINGS = 'BatchSessions/GetAllSessionsRecordings';
    static readonly GET_ALL_SESSIONS_RECORDINGS_BY_BATCH = 'BatchSessions/by-batch';
    static readonly BATCHSESSIONS = 'BatchSessions';
    static readonly CANDIDATE_DASHBOARD = 'BatchDashboard/candidate/';
    static readonly ADMIN_DASHBOARD = 'BatchDashboard/GetAdminDashboard';
    static readonly ALL_BATCH_CANDIDATE_STATS = 'BatchDashboard/batch-candidates';
}