import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appTagColor]',
  standalone: true,
})
export class TagColorDirective {
  private el = inject(ElementRef);
  color = input<string>('');

  constructor() {
    effect(() => {
      let colorName = 'app-yellow'; // Default color

      if (this.color()) {
        colorName = this.color().replace('m-', 'app-');

        // We dont have color for pink, purple and green
        // So we remapped it to another color waiting for designer to act something
        if (colorName.includes('green')) {
          colorName = 'app-yellow';
        }

        if (colorName.includes('purple')) {
          colorName = 'app-blue';
        }

        if (colorName.includes('pink')) {
          colorName = 'app-red';
        }
      }

      this.el.nativeElement.style.backgroundColor = `var(--${colorName}-100)`;
      this.el.nativeElement.style.color = `var(--${colorName}-600)`;
    });
  }
}
