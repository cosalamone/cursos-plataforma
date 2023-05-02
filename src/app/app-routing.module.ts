import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent, // que componente se muestra

    // children: [

    //   {
    //     path: 'login',
    //     component: LogInComponent,
    //   }

    // ]
  },

  // {
  //   path: 'auth',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       component: LogInComponent,
  //     },

  //   ]
  // },

  {
    path: '**', // Cualquier otra ruta que no este definida
    redirectTo: 'home', // la redirige al dashboard = home
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
