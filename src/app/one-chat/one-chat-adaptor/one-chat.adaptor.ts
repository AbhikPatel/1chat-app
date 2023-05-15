import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { NewUser, User } from "src/app/shared/models/user.model";
import { Chat, Conversation, ConversationUser, EditMessage, Member, Message, NewMessage, replyMessage } from "../models/chat.model";
import { FormatTime } from "src/app/core/utilities/formatTime";

@Injectable()
export class allUserAdaptor implements Adapter<NewUser[]>{

    public toResponse(item: User[]): NewUser[] {

        const items: NewUser[] = []; 
        item.forEach((data: User) => {
            const fullName: string = data.first_name + ' ' + data.last_name

            const user: NewUser = new NewUser(
                data._id,
                data.first_name,
                data.last_name,
                fullName,
                data.email,
                data.chats,
                data.photo,
                data.role,
            )
            items.push(user)
            return data
        });
        return items
    }
}

@Injectable()
export class MessageAdaptor implements Adapter<NewMessage[]>{
    public userID: string | null
    constructor(
        private _formatter: FormatTime
    ) {
        this.userID = localStorage.getItem('userId')
    }
    public toResponse(item: Message[]): NewMessage[] {
        const items: any = item.map((data: Message) => {
            const converter: Date = new Date(data.time)
            const allTIme: string = this._formatter.Formatter(converter)
            const newItem: NewMessage = new NewMessage(
                data._id,
                data.is_read,
                data.is_edit,
                data.replied_to,
                data.chat,
                data.sender,
                data.receiver,
                data.time,
                data.type,
                data.content,
                allTIme,
                this.userID === data.sender,
                data.chat === data.receiver ? 'group' : 'dm'
            )
            data = newItem
            return data
        })
        return items
    }

}
// @Injectable()
// export class ConversationUserAdaptor implements Adapter<ConversationUser[]>{

//     public userId: string
//     constructor(
//         private _formatter: FormatTime
//     ) {
//         this.userId = localStorage.getItem('userId')
//     }

//     public toResponse(item: Conversation[]): ConversationUser[] {
//         var result: ConversationUser[] = []
//         item.forEach((chatData: Conversation) => {
//             if (chatData.chat_type === 'dm') {
//                 let id: string = chatData._id
//                 let member: Member = chatData.members.find((user: Member) => user._id !== this.userId)
//                 let obj = {
//                     message: chatData.lastMessage ? chatData.lastMessage.content.text : 'No Messages',
//                     time: this._formatter.Formatter(chatData.lastMessage ? new Date(chatData.lastMessage.time) : new Date()),
//                     timestamp: chatData.lastMessage ? new Date(chatData.lastMessage.time) : new Date(),
//                     notificationCount: 0,
//                     full_name: member.first_name + ' ' + member.last_name,
//                     chatId: id,
//                     type:chatData.chat_type
//                 }
//                 result.push(Object.assign(member, obj))
//             } 
//             else {
//                 let Obj: ConversationUser = {
//                     _id: '',
//                     first_name: '',
//                     last_name: '',
//                     chatId: chatData._id,
//                     photo: '',
//                     full_name: chatData.title,
//                     time: this._formatter.Formatter(new Date()),
//                     timestamp: new Date(),
//                     message: 'No Messages',
//                     notificationCount: 0,
//                     role: '',
//                     type:chatData.chat_type
//                 }
//                 let memberArr:string[] = [];
//                 chatData.members.map((member:Member) => {
//                     const fullName = member.first_name + ' ' + member.last_name;
//                     memberArr.push(fullName)
//                 })
//                 result.push(Object.assign(Obj, {members:memberArr}))
//             }
//         })
//         const sortbyTime = (a, b) => {
//             const timestampA = a.timestamp.getTime();
//             const timestampB = b.timestamp.getTime();
//             return timestampB - timestampA;
//         };
//         return result.sort(sortbyTime)
//     }
// }

@Injectable()
export class NewChatAdaptor implements Adapter<NewMessage>{

    public userID: string | null
    constructor(
        private _formatter: FormatTime
    ) {
        this.userID = localStorage.getItem('userId')
    }

    public toResponse(item: Message): NewMessage {
        const converter: Date = new Date(item.time)
        const allTIme: string = this._formatter.Formatter(converter)
        const newChat: NewMessage = new NewMessage(
            item._id,
            item.is_read,
            item.is_edit,
            item.replied_to,
            item.chat,
            item.sender,
            item.receiver,
            item.time,
            item.type,
            item.content,
            allTIme,
            this.userID === item.sender,
            item.chat === item.receiver ? 'group' : 'dm'
        )
        return newChat
    }

    public toRequest(item: NewMessage): Message {
        const data: Message = new Message(
            item.is_read,
            item.is_edit,
            item.chat,
            item.sender,
            item.receiver,
            item.time,
            item.type,
            item.content,
        );
        return data
    }
}

@Injectable()

export class NewEditAdaptor implements Adapter<NewMessage>{
    public toRequest(item: NewMessage): EditMessage {
        const data: EditMessage = new EditMessage(
            item._id,
            item.is_read,
            item.is_edit,
            item.replied_to,
            item.chat,
            item.sender,
            item.receiver,
            item.time,
            item.type,
            item.content,
        );
        return data
    }
}

export class NewReplyAdaptor implements Adapter<NewMessage>{
    public toRequest(item: NewMessage): replyMessage {
        const data: replyMessage = new replyMessage(
            item.is_read,
            item.is_edit,
            item.replied_to,
            item.chat,
            item.sender,
            item.receiver,
            item.time,
            item.type,
            item.content,
        );
        return data
    }
}
