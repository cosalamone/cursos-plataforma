import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective {

  @Input() size: number = 20;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size',  `${this.size}px`)
  }
}
