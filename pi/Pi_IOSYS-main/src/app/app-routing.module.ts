import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddproduitsComponent } from './addproduits/addproduits.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { NosServicesComponent } from './nos-services/nos-services.component';
import { ContactsComponent } from './contacts/contacts.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentDetailComponent } from './component-detail/component-detail.component';
import { CartComponent } from './cart/cart.component';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataStatisticsComponent } from './data-statistics/data-statistics.component';
import { AuthGuard } from './AuthGuard'; // Importez votre AuthGuard
import { ListComponent } from './list/list.component';
import { ListadminComponent } from './listadmin/listadmin.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { UpdateCompComponent } from './update-comp/update-comp.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  {
    path: 'list', component: ProductsComponent
  },
  {
    path: 'add', component: AddproduitsComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'rest', component: ResetPasswordComponent
  },
  {
    path: 'dash', component: DashboardComponent
  },
  { path: 'apropos', component: AProposComponent },
  { path: 'nos_services', component: NosServicesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'component', component: ListComponent },
  { path: 'component/:id', component: ComponentDetailComponent },
  { path: 'cart', component: CartComponent },// Ajoutez la route pour le panier
  { path: 'allusers', component: ShowAllUsersComponent },
  { path: 'updateuser/:id', component: UpdateUserComponent },
  { path: 'deleteuser/:id', component: DeleteUserComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'senddata', component: DataFormComponent },
  { path: 'stat', component: DataStatisticsComponent },
  { path: 'listadmin', component: ListadminComponent },
  { path: 'addcomp', component: AddComponentComponent },
  { path: 'updatecomp', component: UpdateCompComponent }
]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
