import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryFilterService {
  private searchText = signal<string>('');
  private selectedGroup = signal<string>('all');

  public setSearchText = (text: string) => this.searchText.set(text);

  public setSelectedGroup = (group: string) => this.selectedGroup.set(group);

  public getSearchText = this.searchText.asReadonly();

  public getSelectedGroup = this.selectedGroup.asReadonly();
}
