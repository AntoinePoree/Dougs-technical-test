import { Component, inject } from '@angular/core';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';
import { CategoryService } from '../../../shared/services/category.service';
@Component({
  selector: 'app-category-alphabetical',
  imports: [CategoryItemComponent],
  standalone: true,
  templateUrl: './category-alphabetical.component.html',
  styleUrl: './category-alphabetical.component.scss',
})
export class CategoryAlphabeticalComponent {
  public categoryService = inject(CategoryService);
}
