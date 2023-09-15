import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { DivisionServiceProxy,CategoriesServiceProxy,FoodTypeServiceProxy,CustomerServiceProxy, FoodServiceProxy, OrderServiceProxy} from '@shared/service-proxies/service-proxies';
import { CreateOrEditDivisionModalComponent } from './divisions/create-or-edit/create-or-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateOrEditCategoriesModalComponent } from './categories/create-or-edit-category/create-or-edit-category.component';
import { FoodTypeComponent } from './food-type/food-type.component';
import { CreateOrEditTypeComponent } from './food-type/create-or-edit-type/create-or-edit-type.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateOrEditCustomersComponent } from './customers/create-or-edit-customers/create-or-edit-customers.component';
import { FoodsComponent } from './foods/foods.component';
import { CreateOrEditFoodComponent } from './foods/create-or-edit-food/create-or-edit-food.component';
import { OrdersComponent } from './orders/orders.component';
import { EditFoodComponent } from './foods/create-or-edit-food/edit-food/edit-food.component';
import { CreateOrEditOrderComponent } from './orders/create-or-edit-order/create-or-edit-order.component';
import { FoodListInformationComponent } from './orders/food-information/food-information.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { CustomerDashboardComponent } from './customer-cart/customer-dashboard/customer-dashboard.component';
import { AddToCartDetailsComponent } from './orders/add-to-cart-details/add-to-cart-details.component';
import { ReportsComponent } from './orders/reports/reports.component';
import { NextStageComponent } from './orders/next-stage/next-stage.component';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        DivisionsComponent,
        CreateOrEditDivisionModalComponent,
        CategoriesComponent,
        CreateOrEditCategoriesModalComponent,
        FoodTypeComponent,
        CreateOrEditTypeComponent,
        CustomersComponent,
        CreateOrEditCustomersComponent,
        FoodsComponent,
        CreateOrEditFoodComponent,
        OrdersComponent,
        EditFoodComponent,
        CreateOrEditOrderComponent,
        FoodListInformationComponent,
        CustomerCartComponent,
        CustomerDashboardComponent,
        AddToCartDetailsComponent,
        ReportsComponent,
        NextStageComponent,
     
    
       
    

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [
        DivisionServiceProxy,
        CategoriesServiceProxy,
        FoodTypeServiceProxy,
        CustomerServiceProxy,
        FoodServiceProxy,
        OrderServiceProxy,


    ]
})
export class AppModule {}
