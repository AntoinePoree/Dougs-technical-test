import { Component, computed, inject } from '@angular/core';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';
import { CategoryFilterService } from '../../../shared/services/category-filter.service';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category-alphabetical',
  imports: [CategoryItemComponent],
  standalone: true,
  templateUrl: './category-alphabetical.component.html',
  styleUrl: './category-alphabetical.component.scss',
})
export class CategoryAlphabeticalComponent {
  private categoryService = inject(CategoryService);
  private filterService = inject(CategoryFilterService);

  public categoryAlphabetical = computed(() => {
    const searchText = this.filterService.getSearchText();
    const selectedGroup = this.filterService.getSelectedGroup();

    return this.categoryService
      .categoryMixed()
      .filter(category => {
        const matchesSearch = category.wording.toLowerCase().includes(searchText.toLowerCase());
        const matchesGroup =
          selectedGroup === 'all' || category.group?.id === Number(selectedGroup);
        return matchesSearch && matchesGroup;
      })
      .sort((a, b) => a.wording.localeCompare(b.wording));
  });
}
