export interface DatePollData {    
    id: number
    options: {
        date: [
            userId: number
        ]
    }
    timeout: string
    event: {
        id: number
        date: string
        eventName: string
        eventLocation: string
        Date: string
    }
}

export function getDatePollData(): Promise<DatePollData[]> {
return fetch('http://127.0.0.1:8080/date-polls', {
    method: 'GET',
    // headers: {
    // },
})
    .then((response) => response.json())
    .then((response) => {
        return response as DatePollData[];
    });
}