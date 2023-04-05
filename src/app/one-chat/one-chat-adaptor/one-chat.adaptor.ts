import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { NewUser, User } from "src/app/shared/models/user.model";
import { Message, NewMessage } from "../models/chat.model";

@Injectable()
export class allUserAdaptor implements Adapter<NewUser[]>{

    public toResponse(item: User[]): NewUser[] {
        const items: any = item.map((data: User) => {
            const fullName: string = data.first_name + ' ' + data.last_name

            const user: NewUser = new NewUser(
                data._id,
                data.first_name,
                data.last_name,
                fullName,
                data.email,
                data.admin,
                data.timezone,
                data.country,
                data.language,
                data.chats,
                data.passwordChangedAt,
                data._v,
                data.photo,
                data.role,
            )
            data = user
            return data
        });
        return items
    }
}

@Injectable()
export class MessageAdaptor implements Adapter<NewMessage[]>{
    public userID: string | null
    constructor() {
        this.userID = localStorage.getItem('userId')
    }
    public toResponse(item: Message[]): NewMessage[] {
        const items: any = item.map((data: Message) => {
            const converter: Date = new Date(data.time)
            const allTIme: string = `${converter.getHours()}:${converter.getMinutes()}`
            const newItem: NewMessage = new NewMessage(
                data.is_read,
                data.chat,
                data.sender,
                data.receiver,
                data.time,
                data.type,
                data.content,
                allTIme,
                this.userID === data.sender
            )
            data = newItem
            return data
        })
        return items
    }

}
@Injectable()
export class ConversationUserAdaptor implements Adapter<NewMessage[]>{
    public userID: string | null
    constructor() {
        this.userID = localStorage.getItem('userId')
    }
    public toResponse(item: Message[]): NewMessage[] {
        const items: any = item.map((data: Message) => {
            const converter: Date = new Date(data.time)
            const allTIme: string = `${converter.getHours()}:${converter.getMinutes()}`
            const newItem: NewMessage = new NewMessage(
                data.is_read,
                data.chat,
                data.sender,
                data.receiver,
                data.time,
                data.type,
                data.content,
                allTIme,
                this.userID === data.sender
            )
            data = newItem
            return data
        })
        return items
    }
}

@Injectable()
export class NewChatAdaptor implements Adapter<NewMessage>{

    public userID: string | null
    constructor() {
        this.userID = localStorage.getItem('userId')
    }

    public toResponse(item: Message): NewMessage {
        const converter: Date = new Date(item.time)
        const allTIme: string = `${converter.getHours()}:${converter.getMinutes()}`
        const newChat: NewMessage = new NewMessage(
            item.is_read,
            item.chat,
            item.sender,
            item.receiver,
            item.time,
            item.type,
            item.content,
            allTIme,
            this.userID === item.sender
        )
        return newChat
    }

    public toRequest(item: NewMessage) {
        const data:Message = new Message(
            item.is_read,
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