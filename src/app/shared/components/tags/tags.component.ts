import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { IGroup } from '../../interfaces/category.interface';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  public group = input<IGroup | null>(null);
}
