import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, HomeComponent],
})
export class ViewsModule {}
