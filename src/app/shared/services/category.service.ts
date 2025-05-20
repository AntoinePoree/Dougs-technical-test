import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/all-categories');
  }

  private getVisibleCategories(): Observable<ICategory[]> {
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
}
