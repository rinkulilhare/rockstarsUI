import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { App } from './app';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ForgetPassword } from './pages/forgotPassword/forget-password/forget-password';
import { Otp } from './pages/otp/otp';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { PlayerDashboard } from './pages/player/player-dashboard/player-dashboard';
import { FranchiseDashboard } from './pages/franchise/franchise-dashboard/franchise-dashboard';
import { CanActivate } from '@angular/router';
import { adminGuard } from './guard/admin-guard';
import { playerGuard } from './guard/player-guard';
import { roleGuard } from './guard/role-guard';
import { Profile } from './pages/profile/profile/profile';
import {PlayerProfile} from './pages/player/player-profile/player-profile';
import { FranchiseProfile } from './pages/franchise/franchise-profile/franchise-profile';
import { UpdateProfile } from './pages/player/update-profile/update-profile';
import { UpdateProfileFR } from './pages/franchise/update-profile/update-profile';

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
    },
    {
        path: 'otp',
        component:Otp,
        pathMatch: 'full'

    },
    {
        path: 'admin',
        component:AdminDashboard,
       // pathMatch: 'full',
      //  canActivate: [roleGuard],
        data:{roles:['ADMIN']},
        children: [
            {
                path: 'profile',
                component:Profile,
               // pathMatch: 'full'
            }
        ]   
        
    },
    {
        path: 'player',
        component:PlayerDashboard,
       // pathMatch: 'full',
       // canActivate: [roleGuard],
        data:{roles:['PLAYER']},
        children: [
            {
                path: 'player-profile',
                component:PlayerProfile,
               // pathMatch: 'full'
            },
            { path: 'update-profile', 
              component:UpdateProfile
            }

            


        ]   
    },
    {
        path: 'franchise',
        component:FranchiseDashboard,
        //pathMatch: 'full',
        canActivate: [roleGuard],
        data:{roles:['FRANCHISE']},
        children: [
            {
                path: 'franchise-profile',
                component:FranchiseProfile,
               // pathMatch: 'full'
            },
            { path: 'update-profile', 
              component:UpdateProfileFR
            }
        ]   
    }
    
];
