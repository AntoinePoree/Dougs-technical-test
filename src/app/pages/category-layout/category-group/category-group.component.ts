import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category-group',
  standalone: true,
  imports: [CategoryItemComponent, NgClass],
  templateUrl: './category-group.component.html',
  styleUrl: './category-group.component.scss',
})
export class CategoryGroupComponent {
  public categoryService = inject(CategoryService);
}
