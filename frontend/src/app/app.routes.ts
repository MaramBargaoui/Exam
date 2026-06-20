import { Routes } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ApiDocsComponent } from './pages/api-docs/api-docs.component';

export const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'orders/new', component: OrderDetailsComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'api-docs', component: ApiDocsComponent }
];
