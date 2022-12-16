import { HostListener } from '@angular/core';
import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  @Input() isCorrect: boolean = false;
  // render will help us to style the native element
  constructor(private el: ElementRef, private render: Renderer2) {}
  //HostListener --> it will check for the click event
  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'background', 'green');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
    } else {
      this.render.setStyle(this.el.nativeElement, 'background', 'red');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
    }
  }
}
