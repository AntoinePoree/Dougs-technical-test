import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CategoryFilterService } from '../../shared/services/category-filter.service';
import { CategoryService } from '../../shared/services/category.service';
@Component({
  selector: 'app-category-layout',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
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

  public filterForm = new FormGroup({
    search: new FormControl(''),
    group: new FormControl('all'),
  });

  constructor() {
    this.filterForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.filterService.setSearchText(value.search ?? '');
      this.filterService.setSelectedGroup(value.group ?? 'all');
    });
  }
}
