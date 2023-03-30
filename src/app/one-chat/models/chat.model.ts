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
    _id:string
    is_read:boolean
    chat:string
    sender:string
    receiver:string
    time:string
    type:string
    content:Text
    convertedTime:string
    is_sender:boolean
    
    constructor(
        _id:string,
        is_read:boolean,
        chat:string,
        sender:string,
        receiver:string,
        time:string,
        type:string,
        content:Text,
        convertedTime:string,
        is_sender:boolean,
    ){
        this._id = _id
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