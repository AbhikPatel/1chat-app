export class Message {
    is_read: boolean
    chat: string
    sender: string
    receiver: string
    time: Date
    type: string
    content: Text

    constructor(
        is_read: boolean,
        chat: string,
        sender: string,
        receiver: string,
        time: Date,
        type: string,
        content: Text,
    ) {
        this.is_read = is_read
        this.chat = chat
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.type = type
        this.content = content
    }

}
export class NewMessage {
    is_read: boolean
    chat: string
    sender: string
    receiver: string
    time: Date
    type: string
    content: Text
    convertedTime: string
    is_sender: boolean
    chat_type:string

    constructor(
        is_read: boolean,
        chat: string,
        sender: string,
        receiver: string,
        time: Date,
        type: string,
        content: Text,
        convertedTime: string,
        is_sender: boolean,
        chat_type:string
    ) {
        this.is_read = is_read
        this.chat = chat
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.type = type
        this.content = content
        this.convertedTime = convertedTime
        this.is_sender = is_sender
        this.chat_type = chat_type
    }
}

export class Text {
    text: string

    constructor(
        text: string
    ) {
        this.text = text
    }
}

export class CreateChat {
    owner: string
    chat_type: string
    title: string
    members: string[]
    _id?: string

    constructor(
        owner: string,
        chat_type: string,
        title: string,
        members: string[],
        _id?: string
    ) {
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this._id = _id
    }
}

export class Typing {
    receiver: string
    sender: string
    isGroup: boolean
    typer?:string

    constructor(
        receiver: string,
        sender: string,
        isGroup: boolean,
        typer?:string
    ) {
        this.receiver = receiver
        this.sender = sender
        this.isGroup = isGroup
    }
}

export class Conversation {
    _id: string
    owner: string
    chat_type: string
    title: string
    members: Member[]
    lastMessage: Message

    constructor(
        _id: string,
        owner: string,
        chat_type: string,
        title: string,
        members: Member[],
        lastMessage: Message
    ) {
        this._id = _id
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this.lastMessage = lastMessage
    }
}
export class Chat {
    _id: string
    owner: string
    chat_type: string
    title: string
    members: Member[]
    _v: number

    constructor(
        _id: string,
        owner: string,
        chat_type: string,
        title: string,
        members: Member[],
        _v: number
    ) {
        this._id = _id
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this._v = _v
    }
}

export class Member {
    _id: string
    first_name: string
    last_name: string
    photo: string
    role:string
    full_name?:string

    constructor(
        _id: string,
        first_name: string,
        last_name: string,
        photo: string,
        role:string,
        full_name?:string
    ) {
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.photo = photo
        this.role = role
    }
}

export class ConversationUser {
    _id: string
    first_name: string
    last_name: string
    chatId: string
    photo: string
    full_name: string
    time: string
    message: string
    notificationCount: number
    role?:string
    type?:string
    timestamp?:Date
    members?:string[]

    constructor(
        _id: string,
        first_name: string,
        last_name: string,
        chatId: string,
        photo: string,
        full_name: string,
        time: string,
        message: string,
        notificationCount: number,
        role?:string,
        type?:string,
        timestamp?:Date,
        members?:string[],
    ) {
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.chatId = chatId
        this.photo = photo
        this.full_name = full_name
        this.time = time
        this.message = message
        this.notificationCount = notificationCount
    }
}

export class MessageRead {
    chatId: string
    sender: string
    receiver: string
    count: number

    constructor(
        chatId: string,
        sender: string,
        receiver: string,
        count: number
    ) {
        this.chatId = chatId
        this.sender = sender
        this.receiver = receiver
        this.count = count
    }
}

export class Alive{
    userId:string
    socketId:string
    
    constructor(
        userId:string,
        socketId:string
    ){
        this.userId = userId
        this.socketId = socketId
    }
}

export class Group{
    chatId:string
    members:Member[]
    title:string
    photo:string
    message:string
    lastUser:string
    notificationCount:number
    time:string
    type:string

    constructor(
        chatId:string,
        members:Member[],
        title:string,
        photo:string,
        message:string,
        lastUser:string,
        notificationCount:number,
        time:string,
        type:string
    ){
        this.chatId = chatId
        this.members = members
        this.title = title
        this.photo = photo
        this.message = message
        this.lastUser = lastUser
        this.notificationCount = notificationCount
        this.time = time
        this.type = type
    }
}

export interface GroupDetails{
    chatId:string,
    members:Member[],
    photo:string,
    title:string
}