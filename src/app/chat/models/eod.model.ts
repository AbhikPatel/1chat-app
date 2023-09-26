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
    _id: number | string
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
        _id: number | string,
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
        this._id=_id
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
export class EodSubmission {
    eodId: string | number
    submissionTime: Date
    constructor(
        eodId: string |number,
        submissionTime: Date
    ) {
        this.eodId = eodId
        this.submissionTime = submissionTime
    }
}
export class EditEodTasks {
  
    task: TaskResponse
    editId: number
    constructor(
        task: TaskResponse,
         editId: number
    ) {
        this.task = task
        this.editId = editId
    }
}

export class NotifyEod {
    senderId: string
    receiverId: string

    constructor(
        senderId: string,
        receiverId: string,
    ) {
        this.senderId = senderId
        this.receiverId = receiverId
    }
}