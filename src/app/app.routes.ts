import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { App } from './app';
import { Home } from './pages/home/home';

export const routes: Routes = [
   

    {
    path: '',
    component:Home,
    pathMatch: 'full'
        
    },

    {
        path: 'register',
        component:Register,
        pathMatch: 'full'  
    },
    
    
];
