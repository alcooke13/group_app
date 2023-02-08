export interface EventData {    
        id: number
        date: string
        eventName: string
        eventLocation: string
        activity: string
        activityPoll?: string
        locationPoll?: string
        datePoll?: string
}

export function getEventData(): Promise<EventData[]> {
	return fetch('http://127.0.0.1:8080/events', {
		method: 'GET',
		// headers: {
		// },
	})
		.then((response) => response.json())
		.then((response) => {
			return response as EventData[];
		});
}