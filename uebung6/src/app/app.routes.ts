import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: "read", component: TableComponent},
    {path: "create", component: FormComponent},
    {path: "", component: HomeComponent, pathMatch:'full'}
];
