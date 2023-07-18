import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { fromEvent, take } from 'rxjs';

@Directive({
  selector: '[appOnClickOutside]'
})
export class OnClickOutsideDirective implements OnInit {
  @Output() appOnClickOutside = new EventEmitter();
  public clickOutSide: boolean;
  constructor(private elRef: ElementRef) {
    this.clickOutSide = false
  }
  @HostListener("document:click", ["$event.target"])
  onClick(target: any) {
    if (!this.clickOutSide) {
      return;
    }
    if (!this.elRef.nativeElement.contains(target)) {
      this.appOnClickOutside.emit();
    }
  }
  ngOnInit() {
    fromEvent(document, "click",).pipe(take(1)).subscribe(() => (this.clickOutSide = true));
  }
}
