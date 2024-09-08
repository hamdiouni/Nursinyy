import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddproduitsComponent } from './addproduits/addproduits.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { NosServicesComponent } from './nos-services/nos-services.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentDetailComponent } from './component-detail/component-detail.component';
import { CartComponent } from './cart/cart.component';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LogoutComponent } from './logout/logout.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdminComponent } from './admin/admin.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataStatisticsComponent } from './data-statistics/data-statistics.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { ListadminComponent } from './listadmin/listadmin.component';
import { ListComponent } from './list/list.component';
import { UpdateCompComponent } from './update-comp/update-comp.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddproduitsComponent,
    LoginComponent,
    ListComponent,
    SignupComponent,
    HomeComponent,
    ResetPasswordComponent,
    AccueilComponent,
    DashboardComponent,
    AProposComponent,
    NosServicesComponent,
    WelcomeComponent,
    ContactsComponent,
    ProfileComponent,
    ComponentDetailComponent,
    CartComponent,
    ShowAllUsersComponent,
    UpdateUserComponent,
    LogoutComponent,
    DeleteUserComponent,
    AdminComponent,
    DataFormComponent,
    DataStatisticsComponent,
    AddComponentComponent,
    ListadminComponent,
    UpdateCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
