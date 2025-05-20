import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-category-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './category-layout.component.html',
  styleUrl: './category-layout.component.scss',
})
export class CategoryLayoutComponent {}
