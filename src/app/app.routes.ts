import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { App } from './app';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ForgetPassword } from './pages/forgotPassword/forget-password/forget-password';

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
    {
        path: 'login',
        component:Login,
        pathMatch: 'full'
    },
    {
        path: 'forgot-password',
        component:ForgetPassword,
        pathMatch: 'full'
    }
    
];
