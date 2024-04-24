import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotYourPasswordComponent } from './forgot-your-password/forgot-your-password.component';
import { NotRegisteredSignInComponent } from './not-registered-sign-in/not-registered-sign-in.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';
import { OurHistoryComponent } from './our-history/our-history.component';
import { TestimonialCommentComponent } from './testimonial-comment/testimonial-comment.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  { path: 'shipping', component:ShippingComponent },
  { path: '', component:HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'forgot-your-password', component: ForgotYourPasswordComponent },
  { path: 'not-registered-sign-in', component: NotRegisteredSignInComponent },
  { path: 'login', component: LoginComponent },
  { path: 'our-history', component: OurHistoryComponent },
  { path: 'who-are-we', component: WhoAreWeComponent },
  { path: 'testimonial-comment', component: TestimonialCommentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
