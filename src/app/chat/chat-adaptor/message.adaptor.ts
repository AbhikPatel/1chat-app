import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { Message, MessageResponse } from "../models/message.model";
import { FormatTime } from "src/app/core/utilities/formatTime";

@Injectable()
export class MessageAdapter implements Adapter<MessageResponse> {
    
    constructor(private _formatter: FormatTime,) {}

    public toResponse(item: MessageResponse): MessageResponse {
        return new MessageResponse(
            item._id,
            item.isRead ? item.isRead : false,
            item.isEdited ? item.isEdited : false,
            item.isReplied ? item.isReplied : false,
            item.chatId,
            {
                ...item.senderId,
                full_name : `${item.senderId.first_name} ${item.senderId.last_name}`
            },
            {
                ...item.receiverId,
                full_name : `${item.receiverId.first_name} ${item.receiverId.last_name}`
            },
            item.repliedMessageId ? item.repliedMessageId : '',
            item.timestamp,
            item.threadType,
            item.body,
            item.editedBody ? item.editedBody : ['']
        )
    }
}
