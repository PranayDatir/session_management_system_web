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
            { path: 'dashboard', pathMatch: 'full', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
            { path: 'batches', pathMatch: 'full', loadComponent: () => import('./pages/batches/batches').then(m => m.Batches) },
            { path: 'candidate', pathMatch: 'full', loadComponent: () => import('./pages/candidate/candidate').then(m => m.Candidate) },
            { path: 'batchEnrollments', pathMatch: 'full', loadComponent: () => import('./pages/batch-enrollments/batch-enrollments').then(m => m.BatchEnrollments) },
            {
                path: 'batchSessions',loadComponent: () => import('./pages/sessions/sessions').then(m => m.Sessions), children: [
                    { path: '', redirectTo: 'batchList', pathMatch: 'full' },
                    { path: 'batchList',  pathMatch: 'full', loadComponent: () => import('./pages/batchlist/batchlist').then(m => m.Batchlist) },
                    { path: 'recording/:batchId', pathMatch: 'full', loadComponent: () => import('./pages/recordings/recordings').then(m => m.Recordings) },
                ]
            },
            { path: 'batchSessions/:batchId', pathMatch: 'full', loadComponent: () => import('./pages/sessions/sessions').then(m => m.Sessions) },

        ],
        canActivate: [authGuard]
    }
];
