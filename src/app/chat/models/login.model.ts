export class login{
    email:string
    fullName:string
    profile:string
    role:string
    userId:string
    constructor(
        email:string,
        profile:string,
        fullName:string,
        role:string,
        userId:string
    ){
        this.email = email
        this.fullName = fullName
        this.profile = profile
        this.role = role
        this.userId = userId
    }
}