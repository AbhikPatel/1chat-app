import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    template: ''
})
export class OneChatPresentationBase {

    @Output() public emitEodTasks: EventEmitter<any>;

    constructor(

    ) {
        this.emitEodTasks = new EventEmitter();
    }

    public getEodTasks(tasks: any): void {
        this.emitEodTasks.emit(tasks)
    }
}