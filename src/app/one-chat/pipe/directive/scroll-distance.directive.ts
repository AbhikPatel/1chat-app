import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollDistance]'
})
export class ScrollDistanceDirective {
  previousScrollPosition = 0;
  scrollDirection: 'up' | 'down' = 'down';

  constructor(private elementRef: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const currentScrollPosition = this.elementRef.nativeElement.scrollTop;
    const scrollDistance = Math.abs(currentScrollPosition - this.previousScrollPosition);
    this.previousScrollPosition = currentScrollPosition;
    
    if (currentScrollPosition > this.previousScrollPosition) {
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }
    
    console.log(scrollDistance, this.scrollDirection);
  }

}
