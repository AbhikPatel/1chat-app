export class EODResponse {
    _id:number
    chatId: string
    senderId: string
    receiverId: string
    senderName: string
    generationTime: string
    tasks: TaskResponse[]
    constructor(
    
        _id:number,
        chatId: string,
        senderId: string,
        receiverId: string,
        senderName: string,
        generationTime: string,
        tasks: TaskResponse[],

    ) {
        this._id=_id
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.senderName = senderName
        this.generationTime = generationTime
        this.tasks = tasks
    }
}
export class EOD {
    _id:number
    position: string
    department: string
    chatId: string
    senderId: string
    receiverId: string
    senderName: string
    generationTime: string
    tasks: Task[]

    constructor(
        _id:number,
        chatId: string,
        senderId: string,
        receiverId: string,
        senderName: string,
        generationTime: string,
        tasks: Task[],
    ) {
        this._id=_id
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.senderName = senderName
        this.generationTime = generationTime
        this.tasks = tasks
    }
}

export class TaskResponse {
    eodId: string
    taskTitle: string
    taskState: number
    taskActivity: number
    taskDescription: string
    taskBlocker: string
    taskOriginalEstimate: number
    taskEffortsRemaining: number
    taskEffortsCompleted: number


    constructor(
        eodId: string,
        taskTitle: string,
        taskState: number,
        taskActivity: number,
        taskDescription: string,
        taskBlocker: string,
        taskOriginalEstimate: number,
        taskEffortsRemaining: number,
        taskEffortsCompleted: number
    ) {
        this.eodId = eodId
        this.taskTitle = taskTitle
        this.taskState = taskState
        this.taskActivity = taskActivity
        this.taskDescription = taskDescription
        this.taskBlocker = taskBlocker
        this.taskOriginalEstimate = taskOriginalEstimate
        this.taskEffortsRemaining = taskEffortsRemaining
        this.taskEffortsCompleted = taskEffortsCompleted
    }
}

export class Task {
    _id?:number
    eodId: string
    taskTitle: string
    taskState: number
    taskActivity: number
    taskDescription: string
    taskBlocker: string
    taskOriginalEstimate: number
    taskEffortsRemaining: number
    taskEffortsCompleted: number

    constructor(
        eodId: string,
        taskTitle: string,
        taskState: number,
        taskActivity: number,
        taskDescription: string,
        taskBlocker: string,
        taskOriginalEstimate: number,
        taskEffortsRemaining: number,
        taskEffortsCompleted: number
    ) {
        this.eodId = eodId
        this.taskTitle = taskTitle
        this.taskState = taskState
        this.taskActivity = taskActivity
        this.taskDescription = taskDescription
        this.taskBlocker = taskBlocker
        this.taskOriginalEstimate = taskOriginalEstimate
        this.taskEffortsRemaining = taskEffortsRemaining
        this.taskEffortsCompleted = taskEffortsCompleted
    }
}

export class TaskType {
    displayName: string
    className: string

    constructor(
        displayName: string,
        className: string
    ) {
        this.displayName = displayName
        this.className = className
    }
}