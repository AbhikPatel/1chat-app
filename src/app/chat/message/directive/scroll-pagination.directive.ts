import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
@Directive({
  selector: '[appScrollPagination]'
})
export class ScrollPaginationDirective {
  @Output() scrolled = new EventEmitter<void>();
  constructor(private el: ElementRef) {}
  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    // console.log('Directive is working!', event);
    const element = event.target as HTMLElement;
    if (this.isScrollAtBottom(element)) {
      this.scrolled.emit();
    }
  }

  private isScrollAtBottom(element: HTMLElement): boolean {
    // return element.scrollTop + element.clientHeight <= element.scrollHeight;
    return element.scrollTop <= 0;
  }

}
