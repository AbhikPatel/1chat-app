import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { ConversationUserResponse, ConversationUsers, Member, Message, MessageResponse } from "../models/chat.model";
import { FormatTime } from "src/app/core/utilities/formatTime";
import { CommonService } from "src/app/shared/services/common.service";
import { environment } from "src/environments/environment";
import { EOD, EODResponse, Task, TaskResponse } from "../models/eod.model";
import { taskBgColor, taskTypeFormat } from "src/app/core/utilities/constants";

@Injectable()
export class conversationUserAdapter implements Adapter<ConversationUsers>{

    public loginUserObject: any;

    constructor(
        private _formatter: FormatTime,
        private _commonService: CommonService
    ) {
        this.loginUserObject = this._commonService.getLoginDetails()
    }

    public toResponse(item: ConversationUserResponse): ConversationUsers {

        let newMembers: Member[]
        item.chat_type === 'dm' ? newMembers = item.members.filter((member: Member) => member._id !== this.loginUserObject.userId) : newMembers = item.members
        newMembers.map((member: Member) => {
            member.full_name = member.first_name + ' ' + member.last_name;
            member.photo = environment.imageUrl + member.photo;
        });
        const profile: string = item.chat_type === 'dm' ? newMembers[0].photo : environment.imageUrl + item.photo;

        const user: ConversationUsers = new ConversationUsers(
            item._id,
            item.owner,
            item.chat_type,
            newMembers,
            item.lastMessage ? item.lastMessage.sender : '',
            item.lastMessage ? item.lastMessage.receiver : '',
            item.lastMessage ? new Date(item.lastMessage.time) : '',
            item.lastMessage ? item.lastMessage.content.text : 'No Messages',
            item.lastMessage ? item.lastMessage._id : '',
            item.lastMessage ? item.lastMessage.is_read : false,
            item.lastMessage ? item.lastMessage.is_edit : false,
            item.lastMessage ? this._formatter.Formatter(new Date(item.lastMessage.time)) : '',
            profile,
            item.chat_type === 'dm' ? newMembers[0].full_name : item.title,
            item.lastMessage ? item.lastMessage.sender === this.loginUserObject.userId ? 0 : item.notificationCount : 0,
            false,
            false
        );
        return user;
    }
}

@Injectable()
export class MessageAdapter implements Adapter<Message>{

    public userId: string;

    constructor(
        private _formatter: FormatTime,
        private _commonService: CommonService
    ) {
        this.userId = this._commonService.getUserId();
    }

    public toResponse(message: MessageResponse): Message {

        if (message.replied_to) {
            message.replied_to.sender === this.userId ? message.replied_to.is_sender = true : message.replied_to.is_sender = false;
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
            message.sender === this.userId,
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
export class EODAdapter implements Adapter<EOD>{

    /**
     * @name toResponse
     * @param eod 
     * @description This method is used to convert the type into response
     */
    public toResponse(eod: EODResponse): EOD {

        let newTasks: Task[] = [];

        eod.status.map((taskDetails: any) => {
            taskDetails.type = {
                displayName: taskTypeFormat[taskDetails.type],
                className: taskBgColor[taskDetails.type]
            }
            newTasks.push(taskDetails)
        })

        const newEOD: EOD = new EOD(
            eod.employeeName,
            eod.position,
            eod.department,
            eod.date,
            eod.sender,
            eod.receiver,
            eod.chatId,
            newTasks,
        )
        return newEOD
    }

    /**
     * @name toRequest
     * @param eod 
     */
    public toRequest(eod: EOD): EODResponse {

        let newStatus: TaskResponse[] = [];

        eod.status.map((tasks: any) => {
            switch (tasks.type.displayName) {
                case 'Complete': tasks.type = 'completed'
                    break;
                case 'In Progress': tasks.type = 'InProgress'
                    break;
                case 'New Learning': tasks.type = 'newLearning'
                    break;
            }
            newStatus.push(tasks);
        })

        const newEODResult: EODResponse = new EODResponse(
            eod.employeeName,
            eod.position,
            eod.department,
            eod.date,
            eod.sender,
            eod.receiver,
            eod.chatId,
            newStatus
        )

        return newEODResult;
    }
}