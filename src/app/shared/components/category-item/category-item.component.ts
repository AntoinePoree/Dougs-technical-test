import { Component, input } from '@angular/core';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  standalone: true,
})
export class CategoryItemComponent {
  public category = input<ICategory | null>(null);
}
