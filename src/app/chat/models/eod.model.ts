export class EODResponse{
    employeeName:string
    position:string
    department:string
    date:Date
    sender:string
    receiver:string
    chatId:string
    status:TaskResponse[]
    constructor(
        employeeName:string,
        position:string,
        department:string,
        date:Date,
        sender:string,
        receiver:string,
        chatId:string,
        status:TaskResponse[],
    ){
        this.employeeName = employeeName
        this.position = position
        this.department = department
        this.date = date
        this.sender = sender
        this.receiver = receiver
        this.status = status
        this.chatId = chatId
    }
}
export class EOD{
    employeeName:string
    position:string
    department:string
    date:Date
    sender:string
    receiver:string
    chatId:string
    status?:Task[]
    
    constructor(
        employeeName:string,
        position:string,
        department:string,
        date:Date,
        sender:string,
        receiver:string,
        chatId:string,
        status?:Task[],
    ){
        this.employeeName = employeeName
        this.position = position
        this.department = department
        this.date = date
        this.sender = sender
        this.receiver = receiver
        this.status = status
        this.chatId = chatId
    }
}

export class TaskResponse{
    name:string
    hours:number
    description:string
    blocker:string
    type:string
    
    constructor(
        name:string,
        hours:number,
        description:string,
        blocker:string,
        type:string
    ){
        this.name = name
        this.hours = hours
        this.description = description
        this.blocker = blocker
        this.type = type
    }
}

export class Task{
    name:string
    hours:number
    description:string
    blocker:string
    type:TaskType
    isEdit?:boolean;
    constructor(
        name:string,
        hours:number,
        description:string,
        blocker:string,
        type:TaskType
    ){
        this.name = name
        this.hours = hours
        this.description = description
        this.blocker = blocker
        this.type = type
    }
}
export class TaskType{
    displayName:string
    className:string
    
    constructor(
        displayName:string,
        className:string
    ){
        this.displayName = displayName
        this.className = className
    }
}