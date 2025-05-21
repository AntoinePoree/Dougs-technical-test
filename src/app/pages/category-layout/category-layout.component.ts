import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryFilterService } from '../../shared/services/category-filter.service';
import { CategoryService } from '../../shared/services/category.service';
@Component({
  selector: 'app-category-layout',
  imports: [RouterOutlet],
  templateUrl: './category-layout.component.html',
  styleUrl: './category-layout.component.scss',
})
export class CategoryLayoutComponent {
  private filterService = inject(CategoryFilterService);
  private categoryService = inject(CategoryService);

  public categoryOptions = computed(() => {
    const groups = this.categoryService.categoryMixed().map(category => ({
      label: category.group?.name,
      value: category.group?.id,
    }));

    return [...new Map(groups.map(g => [g.value, g])).values()];
  });

  public onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.setSearchText(input.value);
  }

  public onGroupChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filterService.setSelectedGroup(select.value);
  }
}
