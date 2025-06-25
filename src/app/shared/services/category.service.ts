import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ICategory, IGroupedCategory } from '../interfaces/category.interface';
import { CategoryFilterService } from './category-filter.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private filterService = inject(CategoryFilterService);

  public getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/all-categories');
  }

  public getVisibleCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/visible-categories');
  }

  public categoryGroup = rxResource({
    defaultValue: [],
    loader: () => this.getAllCategories(),
  });

  public categoryVisible = rxResource({
    defaultValue: [],
    loader: () => this.getVisibleCategories(),
  });

  public categoryMixed = computed(() => {
    return this.categoryGroup
      .value()
      .filter(category =>
        this.categoryVisible.value().some(visibleCategory => visibleCategory.id === category.id),
      );
  });

  public categoryAlphabeticalFiltered = computed(() => {
    const searchText = this.filterService.getSearchText();
    const selectedGroup = this.filterService.getSelectedGroup();

    return this.categoryMixed()
      .filter(category => {
        const matchesSearch = category.wording.toLowerCase().includes(searchText.toLowerCase());
        const matchesGroup =
          selectedGroup === 'all' || category.group?.id === Number(selectedGroup);
        return matchesSearch && matchesGroup;
      })
      .sort((a, b) => a.wording.localeCompare(b.wording));
  });

  public categoriesByGroupsFiltered = computed(() => {
    const categories = this.categoryMixed();
    // First group by group name with group id using a reduce
    return (
      categories
        .reduce<IGroupedCategory[]>((acc, category) => {
          const groupName = category.group?.name || 'Sans groupe';
          const existingGroup = acc.find(g => g.name === groupName);

          if (existingGroup) {
            existingGroup.categories.push(category);
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
