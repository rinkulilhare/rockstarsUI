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
import { FranchiseHome } from './pages/franchise/franchise-home/franchise-home';
import { FranchiseEvents } from './pages/franchise/franchise-events/franchise-events';
import { FranchiseRegisteredPlayers } from './pages/franchise/franchise-registered-players/franchise-registered-players';
import { FranchiseAuction } from './pages/franchise/franchise-auction/franchise-auction';
import { FranchisePurse } from './pages/franchise/franchise-purse/franchise-purse';
import { FranchiseTransactions } from './pages/franchise/franchise-transactions/franchise-transactions';
import { PlayerEvents } from './pages/player/player-events/player-events';
import { PlayerHome } from './pages/player/player-home/player-home';
import { AdminHome } from './pages/admin/admin-home/admin-home';
import { AdminEvents } from './pages/admin/admin-events/admin-events';
import { AdminPlayers } from './pages/admin/admin-players/admin-players';
import { AdminFranchises } from './pages/admin/admin-franchises/admin-franchises';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { AdminRoles } from './pages/admin/admin-roles/admin-roles';

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
                path: 'home',
                component:AdminHome,
               // pathMatch: 'full'
            },
            {
                path: 'profile',
                component:Profile,
               // pathMatch: 'full'
            },
             {
                path: 'events',
                component:AdminEvents,
               // pathMatch: 'full'
            },
             {
                path: 'players',
                component:AdminPlayers,
               // pathMatch: 'full'
            },
             {
                path: 'franchises',
                component:AdminFranchises,
               // pathMatch: 'full'
            },
             {
                path: 'users',
                component:AdminUsers,
               // pathMatch: 'full'
            },
             {
                path: 'roles',
                component:AdminRoles,
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
                path: 'home',
                component:PlayerHome,
               // pathMatch: 'full'
            },
           
            {
                path: 'player-profile',
                component:PlayerProfile,
               // pathMatch: 'full'
            },
            { path: 'update-profile', 
              component:UpdateProfile
            },
            { path: 'events', 
              component:PlayerEvents
            },

            


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
            path:'home',    
            component:FranchiseHome
            },

            {
                path: 'franchise-profile',
                component:FranchiseProfile,
               // pathMatch: 'full'
            },
            { path: 'update-profile', 
              component:UpdateProfileFR
            },
            { path: 'event', 
              component:FranchiseEvents
            },
            {
                path:'registered_players',
                component:FranchiseRegisteredPlayers

            },
            {
                path:'auction',
                component:FranchiseAuction
            },
            {
                path:'purse',
                component:FranchisePurse
            },
            {
                path:'transactions',
                component:FranchiseTransactions
            }


        ]   
    }
    
];
