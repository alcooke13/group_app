export interface ActivityPollData {    
    id: number
    options: {
        activityName: [
            userId: number
        ]
    }
    timeout: string
    event: {
        id: number
        date: string
        eventName: string
        eventLocation: string
        activity: string
    }
}

export function getActivityPollData(): Promise<ActivityPollData[]> {
return fetch('http://127.0.0.1:8080/activity-polls', {
    method: 'GET',
    // headers: {
    // },
})
    .then((response) => response.json())
    .then((response) => {
        return response as ActivityPollData[];
    });
}