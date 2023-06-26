export class User{
    _id:string
    first_name:string
    last_name:string
    full_name:string
    email:string
    chats:string[]
    photo:string
    role:string
    showIsOnline?:boolean
    
    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        full_name:string,
        email:string,
        chats:string[],
        photo:string,
        role:string,
        showIsOnline?:boolean
    ){
        this._id = _id
        this.first_name = first_name
        this.last_name = last_name
        this.full_name = full_name
        this.email = email
        this.chats = chats
        this.photo = photo
        this.role = role
    }
}

export class UserResponse{
    _id:string
    first_name:string
    last_name:string
    email:string
    admin:string
    timezone:string
    country:string
    language:string
    chats:string[]
    passwordChangedAt:string
    _v:number
    photo:string
    role:string
    
    constructor(
        _id:string,
        first_name:string,
        last_name:string,
        email:string,
        admin:string,
        timezone:string,
        country:string,
        language:string,
        chats:string[],
        passwordChangedAt:string,
        _v:number,
        photo:string,
        role:string
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
        this.role = role
    }
}

