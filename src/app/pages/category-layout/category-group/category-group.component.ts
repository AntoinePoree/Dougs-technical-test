import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
@Component({
  selector: 'app-category-group',
  standalone: true,
  imports: [],
  templateUrl: './category-group.component.html',
  styleUrl: './category-group.component.scss',
})
export class CategoryGroupComponent {
  public categoryService = inject(CategoryService);
}
