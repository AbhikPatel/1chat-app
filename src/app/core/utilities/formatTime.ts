import { Day } from "../models/days.model";
import { convertDay } from "./constants";

// This class is used to format time
export class FormatTime {

    /**
     * @name Formatter
     * @param date the value of date
     * @returns the formatted time in string
     */
    public Formatter(date: Date): string {
        const currentTime = new Date();
        const todayDate = currentTime.getDate();
        const incomingDate = date.getDate();
        const day = date.getDay();
        const convertToString = convertDay.find((data: Day) => data.digits === day).daysInString
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const result = hours + ':' + minutes + ' ' + amPm;
        // if (todayDate > incomingDate) {
        //     if (todayDate - incomingDate === 1)
        //         return 'Yesterday ' + result;
        //     else if (todayDate - incomingDate > 1 && todayDate - incomingDate < 7)
        //         return convertToString + ' ' + result;
        //     else
        //         return date.getDate() + '/' + date.getMonth() + ' ' + result;
        // }
        // else
            return result

    }
}