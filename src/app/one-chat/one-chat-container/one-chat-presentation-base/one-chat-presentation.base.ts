import { Component, EventEmitter, Output } from "@angular/core";
import { GroupDetails } from "../../models/chat.model";

@Component({
    template: ''
})
export class OneChatPresentationBase {

    @Output() public emitEodTasks: EventEmitter<any>;
    @Output() public emitGroupData: EventEmitter<GroupDetails>;

    constructor(

    ) {
        this.emitEodTasks = new EventEmitter();
    }

    public getEodTasks(tasks: any): void {
        this.emitEodTasks.emit(tasks)
        this.emitGroupData = new EventEmitter();
    }

    public groupDetails(data: GroupDetails): void {
        this.emitGroupData.emit(data)
    }
}