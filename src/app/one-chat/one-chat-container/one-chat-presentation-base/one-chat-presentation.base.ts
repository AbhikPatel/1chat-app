import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { GroupDetails, Message, MessageRead, OnlineUser, Typing } from "../../models/chat.model";
import { EOD } from "../../models/eod.model";

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChatPresentationBase {

    /** This property is used to get typing info from container component */
    @Input() public set typingInfo(typing: Typing) {
        if (typing) {
            this._typingInfo = typing;
            this.showTyping(typing);
        }
    }
    public get typingInfo(): Typing {
        return this._typingInfo;
    }

    /** This property is used to get all the online users details from container component */
    @Input() public set onlineUsers(users: OnlineUser[]) {
        if (users) {
            this._onlineUsers = users;
        }
    }

    public get onlineUsers(): OnlineUser[] {
        return this._onlineUsers;
    }


 

    /** This property is used to get all the EOD Reports */
    @Input() public set getReports(eodReports: EOD[]) {
        if (eodReports)
        console.log(eodReports);
        
            this._getReports = eodReports;
            console.log( this._getReports);
            

    }

    public get getReports(): EOD[] {
        return this._getReports;
    }

    /** This variable is used to store the user Id */
    @Input() public senderId: string;

    /** This property is used to emit the data of the logged out user */
    @Output() public logOutUser: EventEmitter<string>;
    /** This property is used to emit the read messages */
    @Output() public readedMessages: EventEmitter<MessageRead>;
    /** This property is used to emit the typing input */
    @Output() public InputTyping: EventEmitter<void>;
    /** This property is used to emit the edit message */
    @Output() public editMessageObj: EventEmitter<Message>;
    /** TO emit the create group information */
    @Output() public newGroupDetails: EventEmitter<GroupDetails>
    /** TO emit the replied message */
    @Output() public repliedMessage: EventEmitter<Message>
    /** TO emit the EOD report */
    @Output() public eodReport: EventEmitter<EOD>
    /** TO emit the EOD Tab */
    @Output() public onEodTab: EventEmitter<string>

    /** Flag for showing typing text */
    public showTypingText: BehaviorSubject<boolean>;
    /** variable for all typing Ids */
    public typingIds: string[];
    /** variable for name of the types in group chat */
    public groupTyperNames: string[];
    /** variable for replied to message */
    public repliedToMessage: Message;

    /** This variable is used for setter getter */
    // private _chatArray: Message[];
    public chatArrayData: Message[];
    private _onlineUsers: OnlineUser[];
    private _typingInfo: Typing;
    private _getReports: EOD[];

    constructor(
    ) {
        this.logOutUser = new EventEmitter();
        this.readedMessages = new EventEmitter();
        this.InputTyping = new EventEmitter();
        this.editMessageObj = new EventEmitter();
        this.newGroupDetails = new EventEmitter();
        this.repliedMessage = new EventEmitter();
        this.eodReport = new EventEmitter();
        this.onEodTab = new EventEmitter();
        // this._chatArray = [];
        this.showTypingText = new BehaviorSubject(false);
        this.typingIds = [];
        this._onlineUsers = [];
        this.groupTyperNames = [];
        this._getReports = [];
    }

    /**
     * @name onLogOut
     * @description This method will emit the data of the user which is logged out
     */
    public onLogOut(email: string): void {
        this.logOutUser.emit(email);
    }

    /**
     * @name getReadedMessages
     * @param messages 
     * @description This method is used to emit the readed messages
     */
    public getReadedMessages(messages: MessageRead): void {
        this.readedMessages.emit(messages);
    }

    /**
     * @name getInputTyping
     * @description This method is used to emit the typing data
     */
    public getInputTyping(): void {
        this.InputTyping.emit();
    }

    /**
     * @name getEditMessageObj
     * @param message 
     * @description this method is used to emit the edit message
     */
    public getEditMessageObj(message): void {
        this.editMessageObj.emit(message);
    }

    /**
     * @name getNewGroupDetails
     * @param groupDetails 
     * @description This method is used to emit the new group details
     */
    public getNewGroupDetails(groupDetails): void {
        this.newGroupDetails.emit(groupDetails);
    }

    /**
     * @name getRepliedMessage
     * @param message 
     * @description This method is used to emit the replied message
     */
    public getRepliedMessage(message: Message): void {
        this.repliedMessage.emit(message);
        this.repliedToMessage = message;
    }

    /**
     * @name getEodReport
     * @param eod 
     * @description This method is used to emit the eod report
     */
    public getEodReport(eod: EOD): void {
        this.eodReport.emit(eod);
    }

    /**
     * @name getEodTab
     * @param id
     * @description This method is used to emit the eod report
     */
    public getEodTab(id: string): void {
        this.onEodTab.emit(id);
    }

    /**
     * @name showTyping
     * @param sender 
     * @description This method will show the typing effect.
     */
    public showTyping(typingData: Typing): void {
        if (typingData.isGroup) {
            if (!this.groupTyperNames.includes(typingData.typerName))
                this.groupTyperNames.push(typingData.typerName);
            setTimeout(() => {
                let id = this.groupTyperNames.indexOf(typingData.typerName);
                this.groupTyperNames.splice(id, 1);
            }, 2000);
        } else {
            if (!this.typingIds.includes(typingData.sender))
                this.typingIds.push(typingData.sender)
            this.showTypingText.next(true);
            setTimeout(() => {
                this.typingIds = [];
                this.showTypingText.next(false);
            }, 2000);
        }
    }
}