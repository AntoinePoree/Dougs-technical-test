import { Component, input } from '@angular/core';
import { TagColorDirective } from '../../directives/tag-color.directive';
import { IGroup } from '../../interfaces/category.interface';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [TagColorDirective],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  public group = input<IGroup | null>(null);
}
