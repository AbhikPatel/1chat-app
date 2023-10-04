import { Data } from "@angular/router"

export class personalDetail {
    _id: string
    first_name: string
    last_name: string
    photo: string
    full_name: string
    constructor(
        _id: string,
        first_name: string,
        last_name: string,
        photo: string,
        full_name: string,
    ) {
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.photo = photo
        this.full_name = full_name
    }
}

export class lastMessage {
    _id: string
    isRead: boolean
    isEdited: boolean
    isReplied: boolean
    chatId: string
    senderId: string
    receiverId: string
    repliedMessageId: string
    timestamp: string
    threadType: string
    body: string
    editedBody: [string]

    constructor(
        _id: string,
        isRead: boolean,
        isEdited: boolean,
        isReplied: boolean,
        chatId: string,
        senderId: string,
        receiverId: string,
        repliedMessageId: string,
        timestamp: any,
        threadType: string,
        body: string,
        editedBody: [string],
    ) {
        this._id = _id
        this.isRead = isRead
        this.isEdited = isEdited
        this.isReplied = isReplied
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.repliedMessageId = repliedMessageId
        this.timestamp = timestamp
        this.threadType = threadType
        this.body = body
        this.editedBody = editedBody
    }
}

export class MessageResponse {
    body: string
    editedBody: [string]
    chatId: string
    isRead: boolean
    isEdited: boolean
    isReplied: boolean
    senderId: personalDetail
    receiverId: personalDetail
    repliedMessageId: any
    timestamp: Date
    displayTime ?:string
    threadType: string
    _id: string


    constructor(
        body: string,
        editedBody: [string],
        chatId: string,
        isRead: boolean,
        isEdited: boolean,
        isReplied: boolean,
        senderId: personalDetail,
        receiverId: personalDetail,
        repliedMessageId: any,
        timestamp: Date,
        displayTime:string,
        threadType: string,
        _id: string,

    ) {
        this._id = _id
        this.isRead = isRead
        this.isEdited = isEdited
        this.isReplied = isReplied
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.repliedMessageId = repliedMessageId
        this.timestamp = timestamp
        this.displayTime=displayTime
        this.threadType = threadType
        this.body = body
        this.editedBody = editedBody
    }
}

export class MessageRead {
    senderId: string
    receiverId: string
    messageIds: [string]

    constructor(
        senderId: string,
        receiverId: string,
        messageIds: [string],
    ) {
        this.senderId = senderId
        this.receiverId = receiverId
        this.messageIds = messageIds
    }
}

export class MessageEdit {
    body?: string
    senderId: string
    receiverId: string
    editedMessageId: string
    isEdited: boolean
    editedBody: string[]

    constructor(
        senderId: string,
        receiverId: string,
        editedMessageId: string,
        isEdited: boolean,
        editedBody: string[],
    ) {
        this.senderId = senderId
        this.receiverId = receiverId
        this.editedMessageId = editedMessageId
        this.isEdited = isEdited
        this.editedBody = editedBody
    }
}

export class MessageReply {
    isReplied: boolean
    chatId: string
    senderId: string
    receiverId: string
    repliedMessageId: string
    timestamp: Date
    threadType: string
    body: string

    constructor(
        isReplied: boolean,
        chatId: string,
        senderId: string,
        receiverId: string,
        repliedMessageId: string,
        timestamp: Date,
        threadType: string,
        body: string,
    ) {
        this.isReplied = isReplied
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.repliedMessageId = repliedMessageId
        this.timestamp = timestamp
        this.threadType = threadType
        this.body = body
    }
}

export class Message {
    chatId: string
    senderId: string
    receiverId: string
    timestamp: Date
    threadType: string
    body: string

    constructor(
        chatId: string,
        senderId: string,
        receiverId: string,
        timestamp: Date,
        threadType: string,
        body: string,
    ) {
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.timestamp = timestamp
        this.threadType = threadType
        this.body = body
    }
}

export class GroupMessageSeenBy {
    senderId: string
    chatId: string
    messageIds: [string]

    constructor(
        senderId: string,
        chatId: string,
        messageIds: [string],
    ) {
        this.senderId = senderId
        this.chatId = chatId
        this.messageIds = messageIds
    }
} 