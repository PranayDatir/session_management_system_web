import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Batches } from './pages/batches/batches';
import { Candidate } from './pages/candidate/candidate';
import { authGuard } from './core/guards/auth-guard';
import { BatchEnrollments } from './pages/batch-enrollments/batch-enrollments';
import { Sessions } from './pages/sessions/sessions';
import { Batchlist } from './pages/batchlist/batchlist';
import { Recordings } from './pages/recordings/recordings';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, title: 'Login' },
    {
        path: 'layout',
        component: Layout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard',component:Dashboard ,pathMatch: 'full'},
            { path: 'batches', component: Batches, pathMatch: 'full' },
            { path: 'candidate', component: Candidate, pathMatch: 'full' },
            { path: 'batchEnrollments', component: BatchEnrollments, pathMatch: 'full'},
            {
                path: 'batchSessions', component: Sessions, children: [
                    {path: '', redirectTo: 'batchList', pathMatch:'full'},
                    { path: 'batchList', component: Batchlist, pathMatch: 'full' },
                    { path: 'recording/:batchId', component: Recordings, pathMatch: 'full' },
                ]
            },
            { path: 'batchSessions/:batchId', component: Sessions, pathMatch: 'full' },

        ],
        canActivate: [authGuard]
    }
];
