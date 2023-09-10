import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { CreateGroupFormContainerComponent } from 'src/app/chat/create-group-form-container/create-group-form-container.component';
import { TaskFormContainerComponent } from 'src/app/chat/eod/task-form-container/task-form-container.component';

@Injectable()
export class OverlayService {
  overlayRef: any;
  constructor(private overlay: Overlay) {
  }
  /**
   * Open a custom component in an overlay
   */
  open<T>(component: ComponentType<T>, isTrue: boolean, data?: any) {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
    // Create the overlay with customizable options
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: isTrue ? 'overlay-backdrop' : '',
    });
    const portal = new ComponentPortal(component);
    const instance = this.overlayRef.attach(portal);
    // Pass data to the component instance based on component type
    if (component === CreateGroupFormContainerComponent) {
      instance.instance.getAllUsers = data;
    } else if (component === TaskFormContainerComponent) {
      instance.instance.stateActivityType = data;
    }
    // Pass data to the component instance
    instance.instance.stateActivityType = data
    this.overlayRef.backdropClick().subscribe(() => { this.overlayRef.detach() })
    return instance;
  }
  close() {
    this.overlayRef.detach()
  }
}