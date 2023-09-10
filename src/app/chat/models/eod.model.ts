export class EODResponse {
    chatId: string
    senderId: string
    receiverId: string
    senderName: string
    generationTime: any
    status?: TaskResponse[]
    constructor(
        chatId: string,
        senderId: string,
        receiverId: string,
        senderName: string,
        generationTime: any,
        status?: TaskResponse[],

    ) {
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.senderName = senderName
        this.generationTime = generationTime
        this.status = status
    }
}
export class EOD {
    position: string
    department: string
    chatId: string
    senderId: string
    receiverId: string
    senderName: string
    generationTime: any
    status?: Task[]

    constructor(
        chatId: string,
        senderId: string,
        receiverId: string,
        senderName: string,
        generationTime: any,
        status?: Task[],
    ) {
        this.chatId = chatId
        this.senderId = senderId
        this.receiverId = receiverId
        this.senderName = senderName
        this.generationTime = generationTime
        this.status = status
    }
}

export class TaskResponse {
    title: string
    stateType: number
    activityType: string
    blocker: string
    description: string
    originalTime: number
    remainingTime: number
    competeTime: number

    constructor(
        title: string,
        stateType: number,
        activityType: string,
        blocker: string,
        description: string,
        originalTime: number,
        remainingTime: number,
        competeTime: number
    ) {
        this.title = title
        this.stateType = stateType
        this.activityType = activityType
        this.blocker = blocker
        this.description = description
        this.originalTime = originalTime
        this.remainingTime = remainingTime
        this.competeTime = competeTime
    }
}

export class Task {
    title: string
    stateType: number
    activityType: string
    blocker: string
    description: string
    originalTime: number
    remainingTime: number
    competeTime: number

    constructor(
        title: string,
        stateType: number,
        activityType: string,
        blocker: string,
        description: string,
        originalTime: number,
        remainingTime: number,
        competeTime: number
    ) {
        this.title = title
        this.stateType = stateType
        this.activityType = activityType
        this.blocker = blocker
        this.description = description
        this.originalTime = originalTime
        this.remainingTime = remainingTime
        this.competeTime = competeTime
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