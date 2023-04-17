// This class is used to format time
export class FormatTime {

    /**
     * @name Formatter
     * @param date the value of date
     * @returns the formatted time in string
     */
    public Formatter(date: Date): string {
        const currentTime = new Date();
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const result = hours + ':' + minutes + ' ' + ampm
        if (currentTime.getDate() > date.getDate())
            return date.getDate() + '/' + date.getMonth() + ' ' + result
        else
            return result
    }
}