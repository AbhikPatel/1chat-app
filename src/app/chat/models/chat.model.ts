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
    typerName?: string

    constructor(
        receiver: string,
        sender: string,
        isGroup: boolean,
        typerName?: string
    ) {
        this.receiver = receiver
        this.sender = sender
        this.isGroup = isGroup
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

export class MessageResponse {
    _id?: string
    is_read: boolean
    is_edit: boolean
    chat: string
    sender: string
    receiver: string
    time: Date
    type: string
    content: Text
    replied_to?: any
    
    constructor(
        is_read: boolean,
        is_edit: boolean,
        chat: string,
        sender: string,
        receiver: string,
        time: Date,
        type: string,
        content: Text,
    ) {

        this.is_read = is_read
        this.is_edit = is_edit
        this.chat = chat
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.type = type
        this.content = content
    }
}

export class Message {
    _id: string
    is_read: boolean
    is_edit: boolean
    chat: string
    sender: string
    receiver: string
    time: Date
    type: string
    content: Text
    is_sender: boolean
    displayTime: string
    chat_type: string
    replied_to?: any;
    ownerName?:string;
    
    constructor(
        _id: string,
        is_read: boolean,
        is_edit: boolean,
        chat: string,
        sender: string,
        receiver: string,
        time: Date,
        type: string,
        content: Text,
        is_sender: boolean,
        displayTime: string,
        chat_type: string,
        replied_to?: any
    ) {
        this._id = _id
        this.is_read = is_read
        this.is_edit = is_edit
        this.chat = chat
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.type = type
        this.content = content
        this.is_sender = is_sender
        this.displayTime = displayTime
        this.chat_type = chat_type
        this.replied_to = replied_to
    }
}


export class ConversationUserResponse {
    _id: string
    owner: string
    chat_type: string
    title: string
    members: Member[]
    lastMessage: MessageResponse
    notificationCount: number
    photo?: string

    constructor(
        _id: string,
        owner: string,
        chat_type: string,
        title: string,
        members: Member[],
        lastMessage: MessageResponse,
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

export class ConversationUsers {
    chatId: string
    owner: string
    chat_type: string
    members: Member[]
    sender: string
    receiver: string
    time: any
    lastMessage: string
    lastMessageId: string
    isRead: boolean
    isEdit: boolean
    standardTime: string
    profile: string
    displayName: string
    notificationCount: number
    showIsOnline: boolean
    eodNotification:boolean
    _id?: string
     chats?: any
    constructor(
        chatId: string,
        owner: string,
        chat_type: string,
        members: Member[],
        sender: string,
        receiver: string,
        time: any,
        lastMessage: string,
        lastMessageId: string,
        isRead: boolean,
        isEdit: boolean,
        standardTime: string,
        profile: string,
        displayName: string,
        notificationCount: number,
        showIsOnline: boolean,
        eodNotification:boolean,
        _id?: string
    ) {
        this.chatId = chatId
        this.owner = owner
        this.chat_type = chat_type
        this.members = members
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.lastMessage = lastMessage
        this.lastMessageId = lastMessageId
        this.isRead = isRead
        this.isEdit = isEdit
        this.standardTime = standardTime
        this.profile = profile
        this.displayName = displayName
        this.notificationCount = notificationCount
        this.showIsOnline = showIsOnline
        this.eodNotification = eodNotification
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

export class MessageRead {
    chatId: string
    receiver: string
    count: number

    constructor(
        chatId: string,
        receiver: string,
        count: number
    ) {
        this.chatId = chatId
        this.receiver = receiver
        this.count = count
    }
}

export class OnlineUser {
    userId: string
    socketId: string

    constructor(
        userId: string,
        socketId: string
    ) {
        this.userId = userId
        this.socketId = socketId
    }
}

export class Group {
    chatId: string
    members: Member[]
    title: string
    photo: string
    message: string
    lastUser: string
    notificationCount: number
    time: string
    type: string

    constructor(
        chatId: string,
        members: Member[],
        title: string,
        photo: string,
        message: string,
        lastUser: string,
        notificationCount: number,
        time: string,
        type: string
    ) {
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

export interface GroupDetails {
    chatId: string,
    members: Member[],
    photo: string,
    title: string
}