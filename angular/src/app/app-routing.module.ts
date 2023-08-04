import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { CategoriesComponent } from './categories/categories.component';
import { FoodTypeComponent } from './food-type/food-type.component';
import { CustomersComponent } from './customers/customers.component';
import { FoodsComponent } from './foods/foods.component';
import { OrdersComponent } from './orders/orders.component';

import { FoodListInformationComponent } from './foods/food-information/food-information.component';
import { AddToCartDetailsComponent } from './foods/add-to-cart-details/add-to-cart-details.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },

                    { path: 'divisions/admin', component: DivisionsComponent, data: { permission: 'Pages.Divisions.Admin'}, canActivate: [AppRouteGuard]  },
                    { path: 'customers/admin', component: CustomersComponent, data: { permission: 'Pages.Customers.Admin'}, canActivate: [AppRouteGuard] },

                    { path: 'categories/vendor', component: CategoriesComponent, data: { permission:'Pages.Categories.Vendor'} ,canActivate: [AppRouteGuard] },
                    { path: 'foodtypes/vendor', component: FoodTypeComponent, data: { permission: 'Pages.FoodTypes.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'foods/vendor', component: FoodsComponent, data: { permission: 'Pages.Foods.Vendor'},canActivate: [AppRouteGuard] },
                    { path: 'orders/vendor', component: OrdersComponent, data: { permission: 'Pages.Orders.Vendor'},canActivate: [AppRouteGuard] },
  
                    { path: 'foodList/customer', component: FoodListInformationComponent,data: { permission: 'Pages.FoodList.Customer'},canActivate: [AppRouteGuard] },
                    { path: 'food-list/food-details', component: AddToCartDetailsComponent, data: { permission: 'Pages.FoodDetails.Customer' },canActivate: [AppRouteGuard] },
                    { path: 'carts', component: CustomerCartComponent, canActivate: [AppRouteGuard] },





                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
