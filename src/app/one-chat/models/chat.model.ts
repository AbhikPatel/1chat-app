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