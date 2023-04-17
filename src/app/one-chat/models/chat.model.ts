export class Message{
    is_read:boolean
    chat:string
    sender:string
    receiver:string
    time:Date
    type:string
    content:Text

    constructor(
        is_read:boolean,
        chat:string,
        sender:string,
        receiver:string,
        time:Date,
        type:string,
        content:Text,
    ){
        this.is_read = is_read
        this.chat = chat
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.type = type
        this.content = content
    }

}
export class NewMessage{
    is_read:boolean
    chat:string
    sender:string
    receiver:string
    time:Date
    type:string
    content:Text
    convertedTime:string
    is_sender:boolean
    
    constructor(
        is_read:boolean,
        chat:string,
        sender:string,
        receiver:string,
        time:Date,
        type:string,
        content:Text,
        convertedTime:string,
        is_sender:boolean,
    ){
        this.is_read = is_read
        this.chat = chat
        this.sender = sender
        this.receiver = receiver
        this.time = time
        this.type = type
        this.content = content
        this.convertedTime = convertedTime
        this.is_sender = is_sender
    }
}

export class Text{
    text:string

    constructor(
        text:string
    ){
        this.text= text
    }
}

export class CreateChat{
    owner:string
    chat_type:string
    title:string
    members:string[]
    _id?:string

    constructor(
        owner:string,
        chat_type:string,
        title:string,
        members:string[],
        _id?:string
    ){
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this._id = _id
    }
}

export class Typing{
    receiver:string
    sender:string

    constructor(
        receiver:string,
        sender:string
    ){
        this.receiver = receiver
        this.sender = sender
    }
}

export class Conversation{
    _id:string
    owner:string
    chat_type:string
    title:string
    members:Member[]
    lastMessage:Message

    constructor(
        _id:string,
        owner:string,
        chat_type:string,
        title:string,
        members:Member[],
        lastMessage:Message
    ){
        this._id = _id
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this.lastMessage = lastMessage
    }
}
export class Chat{
    _id:string
    owner:string
    chat_type:string
    title:string
    members:Member[]
    _v:number

    constructor(
        _id:string,
        owner:string,
        chat_type:string,
        title:string,
        members:Member[],
        _v:number
    ){
        this._id = _id
        this.owner = owner
        this.chat_type = chat_type
        this.title = title
        this.members = members
        this._v = _v
    }
}

export class Member{
    _id:string
    first_name:string
    last_name:string
    photo:string

    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        photo:string,
    ){
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.photo = photo
    }
}

export class ConversationUser{
    _id:string
    first_name:string
    last_name:string
    chatId:string
    photo:string
    full_name:string
    time:string
    message:string
    notificationCount:number

    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        chatId:string,
        photo:string,
        full_name:string,
        time:string,
        message:string,
        notificationCount:number
    ){
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