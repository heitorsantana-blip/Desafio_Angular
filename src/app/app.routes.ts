import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Login } from './login/login';
import { Vehicle } from './vehicle/vehicle';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
   {
    path: "",
    component:Login,
   }, 
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   {
      path: "dashboard",
      component: Dashboard,
      canActivate: [authGuard]
   },
   {
      path: "vehicle",
      component: Vehicle,
      canActivate: [authGuard]
   }
];