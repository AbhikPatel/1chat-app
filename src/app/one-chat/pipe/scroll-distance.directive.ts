import { AfterViewChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollDistance]'
})
export class ScrollDistanceDirective {
  public previousScrollPosition = 0;
  constructor(private elementRef: ElementRef) { }


  @HostListener('scroll', ['$event'])
  onScroll(event) {
    let currentScrollPosition = this.elementRef.nativeElement.scrollTop;
    let scrollHeights = this.elementRef.nativeElement.scrollHeights;
    const scrollDistance = (currentScrollPosition - this.previousScrollPosition);
  }

}
