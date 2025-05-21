import { Component, computed, inject } from '@angular/core';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';
import { TagColorDirective } from '../../../shared/directives/tag-color.directive';
import { ICategory, IGroup } from '../../../shared/interfaces/category.interface';
import { CategoryFilterService } from '../../../shared/services/category-filter.service';
import { CategoryService } from '../../../shared/services/category.service';

interface IGroupedCategory extends IGroup {
  categories: ICategory[];
}

@Component({
  selector: 'app-category-group',
  standalone: true,
  imports: [CategoryItemComponent, TagColorDirective],
  templateUrl: './category-group.component.html',
  styleUrl: './category-group.component.scss',
})
export class CategoryGroupComponent {
  public categoryService = inject(CategoryService);
  private filterService = inject(CategoryFilterService);

  public categoriesByGroups = computed(() => {
    const categories = this.categoryService.categoryMixed();
    // First group by group name with group id using a reduce
    return (
      categories
        .reduce<IGroupedCategory[]>((acc, category) => {
          const groupName = category.group?.name || 'Sans groupe';
          const existingGroup = acc.find(g => g.name === groupName);

          if (existingGroup) {
            existingGroup.categories.push(category);
            existingGroup.categories.sort((a, b) => a.wording.localeCompare(b.wording));
          } else {
            acc.push({
              name: groupName,
              id: category.group?.id ?? 0,
              color: category.group?.color ?? 'app-yellow',
              categories: [category],
            });
          }

          return acc;
        }, [])
        .sort((a, b) => a.name.localeCompare(b.name))
        // Then filter by search text and selected group
        .filter(group => {
          const searchText = this.filterService.getSearchText();
          const selectedGroup = this.filterService.getSelectedGroup();

          const matchesSearch = group.name.toLowerCase().includes(searchText.toLowerCase());
          const matchesGroup = selectedGroup === 'all' || group.id === Number(selectedGroup);
          return matchesSearch && matchesGroup;
        })
    );
  });
}
