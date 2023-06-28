import { Day } from "../models/days.model";

/** Use to convert the digit into string of days */
export const convertDay: Day[] = [
    {
        digits: 0,
        daysInString: 'Sun'
    },
    {
        digits: 1,
        daysInString: 'Mon'
    },
    {
        digits: 2,
        daysInString: 'Tue'
    },
    {
        digits: 3,
        daysInString: 'Wed'
    },
    {
        digits: 4,
        daysInString: 'Thu'
    },
    {
        digits: 5,
        daysInString: 'Fri'
    },
    {
        digits: 6,
        daysInString: 'Sat'
    },
];

/** Use to convert the response task type in to format */
export const taskTypeFormat = {
    InProgress: 'In Progress',
    completed: 'Complete',
    newLearning: 'New Learning'
}

/** Use to return the value for the color */
export const taskBgColor = {
    InProgress: 'bg-progress',
    completed: 'bg-completed',
    newLearning: 'bg-learning'
}   