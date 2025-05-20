import { Routes } from '@angular/router';
import { CategoryLayoutComponent } from '../pages/category-layout/category-layout.component';
import { RoutesEnum } from './routes.enum';

export const routes: Routes = [
  {
    path: '',
    component: CategoryLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesEnum.CATEGORY_GROUP,
      },
      {
        path: RoutesEnum.CATEGORY_GROUP,
        loadComponent: () =>
          import('../pages/category-layout/category-group/category-group.component').then(
            m => m.CategoryGroupComponent,
          ),
      },
      {
        path: RoutesEnum.CATEGORY_ALPHABETICAL,
        loadComponent: () =>
          import(
            '../pages/category-layout/category-alphabetical/category-alphabetical.component'
          ).then(m => m.CategoryAlphabeticalComponent),
      },
    ],
  },
];
