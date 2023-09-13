export class EODResponse {
    _id: number | string
    submissionTime: string
    chatId: string
    senderId: string
    receiverId: string
    senderName: string
    generationTime: string
    tasks: TaskResponse[]
    constructor(
        _id: number | string,
        submissionTime: string,
        chatId: string,
        senderId: string,
        receiverId: string,
        senderName: string,
        generationTime: string,
        tasks: TaskResponse[],

    ) {
        this._id = _id
        this.submissionTime = submissionTime
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.senderName = senderName
        this.generationTime = generationTime
        this.tasks = tasks
    }
}
export class EOD {
    submissionTime: string
    chatId: string
    senderId: string
    receiverId: string
    senderName: string
    generationTime: string
    tasks: Task[]

    constructor(
        submissionTime: string,
        chatId: string,
        senderId: string,
        receiverId: string,
        senderName: string,
        generationTime: string,
        tasks: Task[],
    ) {

        this.submissionTime = submissionTime
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
    _id?: number
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

export class activity {
      activity: string
      activityId: string
    constructor(
        activity: string,
        activityId: string
    ) {
        this.activity = activity
        this.activityId = activityId
    }
}
export class eodSubmission {
    eodId: string
    submissionTime: Date
    constructor(
        eodId: string,
        submissionTime: Date
    ) {
        this.eodId = eodId
        this.submissionTime = submissionTime
    }
}