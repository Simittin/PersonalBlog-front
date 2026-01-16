import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminBlogComponent } from './blog/admin-blog/admin-blog.component';
import { AdminProjectsComponent } from './projects/admin-projects/admin-projects.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'blog', component: AdminBlogComponent },
            { path: 'blog/new', loadComponent: () => import('./blog/blog-form/blog-form.component').then(m => m.BlogFormComponent) },
            { path: 'blog/edit/:id', loadComponent: () => import('./blog/blog-form/blog-form.component').then(m => m.BlogFormComponent) },
            { path: 'projects', component: AdminProjectsComponent },
            { path: 'projects/new', loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent) },
            { path: 'projects/edit/:id', loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent) }
        ]
    }
];
