// This class is used to format time
export class FormatTime {

    /**
     * @name Formatter
     * @param date the value of date
     * @returns the formatted time in string
     */
    public Formatter(date: Date): string {
        var hours = date.getHours();
        var minutes:string | number = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const result = hours + ':' + minutes + ' ' + ampm
        return result
    }
}