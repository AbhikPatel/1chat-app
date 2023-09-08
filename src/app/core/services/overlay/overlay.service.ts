import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable()
export class OverlayService {
  overlayRef: any;
  constructor(private overlay: Overlay) {
  }
  /**
   * Open a custom component in an overlay
   */
  open<T>(component: ComponentType<T>,isTrue:boolean,data?:any) {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
    // Create the overlay with customizable options
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: isTrue ? 'overlay-backdrop':'' ,
    });
    const portal = new ComponentPortal(component);
    const instance = this.overlayRef.attach(portal);
         // Pass data to the component instance
           instance.instance.getAllUsers = data
           this.overlayRef.backdropClick().subscribe(() => { this.overlayRef.detach()})
           return instance;
  }
  close() {
    this.overlayRef.detach()
  }
}