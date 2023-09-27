import { lastMessage } from "./message.model"

export class ConversationUserResponse {
    _id: string
    owner: string
    chat_type: string
    title: string
    members: Member[]
    lastMessage: lastMessage
    notificationCount: number
    photo?: string

    constructor(
        _id: string,
        owner: string,
        chat_type: string,
        title: string,
        members: Member[],
        lastMessage: lastMessage,
        notificationCount: number,
        photo?: string,
    ) {
        this._id = _id
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this.lastMessage = lastMessage
        this.notificationCount = notificationCount
    }
}

export class Member {
    _id: string
    first_name: string
    last_name: string
    photo: string
    role: string
    full_name?: string

    constructor(
        _id: string,
        first_name: string,
        last_name: string,
        photo: string,
        role: string,
        full_name?: string
    ) {
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.photo = photo
        this.role = role
    }
}