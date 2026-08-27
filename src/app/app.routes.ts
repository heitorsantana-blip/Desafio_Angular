import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Vehicle } from './vehicle/vehicle'

export const routes: Routes = [
   {
    path: "",
    component:Login,
   }, 
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   {
      path: "dashboard",
      component: Dashboard,
   },
   {
      path: "vehicle",
      component: Vehicle,
   }
];
