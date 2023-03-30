export class NewUser{
    _id:string
    first_name:string
    last_name:string
    full_name:string
    email:string
    admin:string
    timezone:string
    country:string
    language:string
    chats:Chat[]
    passwordChangedAt:string
    _v:number
    photo:string
    
    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        full_name:string,
        email:string,
        admin:string,
        timezone:string,
        country:string,
        language:string,
        chats:Chat[],
        passwordChangedAt:string,
        _v:number,
        photo:string
    ){
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.full_name = full_name
        this.email = email
        this.admin = admin
        this.timezone = timezone
        this.country = country
        this.language = language
        this.chats = chats
        this.passwordChangedAt = passwordChangedAt
        this._v = _v
        this.photo = photo
    }
}

export class User{
    _id:string
    first_name:string
    last_name:string
    email:string
    admin:string
    timezone:string
    country:string
    language:string
    chats:Chat[]
    passwordChangedAt:string
    _v:number
    photo:string
    
    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        email:string,
        admin:string,
        timezone:string,
        country:string,
        language:string,
        chats:Chat[],
        passwordChangedAt:string,
        _v:number,
        photo:string
    ){
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.admin = admin
        this.timezone = timezone
        this.country = country
        this.language = language
        this.chats = chats
        this.passwordChangedAt = passwordChangedAt
        this._v = _v
        this.photo = photo
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
    chatId:string
    photo:string

    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        chatId:string,
        photo:string
    ){
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.chatId = chatId
        this.photo = photo
    }
}