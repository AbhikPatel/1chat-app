import { Component, EventEmitter, Output } from "@angular/core";
import { GroupDetails } from "../../models/chat.model";

@Component({
    template: ''
})
export class OneChatPresentationBase {

    @Output() public emitGroupData: EventEmitter<GroupDetails>;

    constructor(

    ) {
        this.emitGroupData = new EventEmitter();
    }

    public groupDetails(data:GroupDetails): void {
        this.emitGroupData.emit(data)
    }
}