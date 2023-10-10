import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { ConversationUsers, Member, Message, MessageResponse } from "../models/chat.model";
import { FormatTime } from "src/app/core/utilities/formatTime";
import { CommonService } from "src/app/shared/services/common.service";
import { environment } from "src/environments/environment";
import { EOD, EODResponse, Task, TaskResponse } from "../models/eod.model";
import { taskBgColor, taskTypeFormat } from "src/app/core/utilities/constants";
import { login } from "../models/login.model";
import { ConversationUserResponse } from "../models/conversation.model";

@Injectable()
export class conversationUserAdapter implements Adapter<ConversationUsers>{

    public loginUserObject: login;

    constructor(
        private _formatter: FormatTime,
        private _commonService: CommonService
    ) {
        this.loginUserObject = this._commonService.getLoginDetails()
    }

    public toResponse(item: ConversationUserResponse): ConversationUsers {
        let receiverId: string;
        let newMembers: Member[];
        item.chat_type === 'dm' ? newMembers = item.members.filter((member: Member) => member._id !== this.loginUserObject.userId) : newMembers = item.members
        newMembers.map((member: Member) => {
            member.full_name = member.first_name + ' ' + member.last_name;
            member.photo = environment.imageUrl + member.photo;
        });
        const profile: string = item.chat_type === 'dm' ? newMembers[0].photo : environment.imageUrl + item.photo;
        if(item.chat_type === 'dm') {
            item.members.forEach(element => {
                if(element._id !== this.loginUserObject.userId) receiverId = element._id
            });
        }
        const user: ConversationUsers = new ConversationUsers(
            item._id,
            item.owner,
            item.chat_type,
            newMembers,
            '',
            receiverId,
            item.lastMessage ? new Date(item.lastMessage.timestamp) : '',
            item.lastMessage ? item.lastMessage.body : 'No Messages',
            item.lastMessage ? item.lastMessage._id : '',
            item.lastMessage ? item.lastMessage.isRead : false,
            item.lastMessage ? item.lastMessage.isEdited : false,
            item.lastMessage ? this._formatter.Formatter(new Date(item.lastMessage.timestamp)) : '',
            profile,
            item.chat_type === 'dm' ? newMembers[0].full_name : item.title,
            item.notificationCount,
            false,
            false
        );
        return user;
    }
}

@Injectable()
export class MessageAdapter implements Adapter<Message>{
    public loginUserObject: login;
    constructor(
        private _formatter: FormatTime,
        private _commonService: CommonService
    ) {
        this.loginUserObject = this._commonService.getLoginDetails()
    }

    public toResponse(message: MessageResponse): Message {

        if (message.replied_to) {
            message.replied_to.sender ===  this.loginUserObject.userId ? message.replied_to.is_sender = true : message.replied_to.is_sender = false;
        }
        const newMessage: Message = new Message(
            message._id,
            message.is_read,
            message.is_edit,
            message.chat,
            message.sender,
            message.receiver,
            message.time,
            message.type,
            message.content,
            message.sender ===this.loginUserObject.userId,
            this._formatter.Formatter(new Date(message.time)),
            message.chat === message.receiver ? 'group' : 'dm',
            message.replied_to
        )
        return newMessage
    }

    toRequest(message: Message): MessageResponse {
        const messageData: MessageResponse = new MessageResponse(
            message.is_read,
            message.is_edit,
            message.chat,
            message.sender,
            message.receiver,
            message.time,
            message.type,
            message.content,
        )

        return messageData
    }
}

@Injectable()
export class EODAdapter implements Adapter<EODResponse>{
    /**
     * @name toResponse
     * @param eod 
     * @description This method is used to convert the type into response
     */
    public toResponse(eod: EODResponse) :EODResponse{
        const inputDate =new Date(eod.generationTime);
        const day = inputDate.getDate();
        const month = inputDate.toLocaleString('default', { month: 'short' }); // Get the full month name
        const year = inputDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        eod.generationTime=formattedDate
        const newEOD: EODResponse = new EODResponse(
            eod._id,
            eod.submissionTime,
            eod.chatId,
            eod.senderId,
            eod.receiverId,
            eod.senderName,
            eod.generationTime,
            eod.tasks,
        )
        return newEOD
    }

    // /**
    //  * @name toRequest
    //  * @param eod 
    //  */
    // public toRequest(eod: EOD): EODResponse {


    //     const newEODResult: EODResponse = new EODResponse(
    //         eod.chatId,
    //         eod.senderId,
    //         eod.receiverId,
    //         eod.generationTime,
    //         eod.senderName,
    //         eod.status,
    //     )

    //     return newEODResult;
    // }
}