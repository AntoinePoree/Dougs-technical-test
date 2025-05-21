import { Component, input, output, signal } from '@angular/core';
import { ICategory } from '../../interfaces/category.interface';
import { TagsComponent } from './../tags/tags.component';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  standalone: true,
  imports: [TagsComponent],
})
export class CategoryItemComponent {
  public category = input<ICategory | null>(null);
  // Normal, we dont have a "isSelected" who's not an output, but were in "demo" mode
  private isSelected = signal(false);
  public seeTags = input<boolean>(true);
  public selectedSignal = output<boolean>();

  public toggleSelection() {
    this.selectedSignal.emit(!this.isSelected());
    this.isSelected.update(value => !value);
  }

  public get selected() {
    return this.isSelected();
  }
}
