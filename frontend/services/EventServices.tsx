export interface EventData {    
        id: number
        date: string | null
        eventName: string 
        eventLocation: string | null
        activity: string | null
        activityPoll?: string
        locationPoll?: string
        datePoll?: string
		group: {
			id: number,
		title: string
		}
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

export function getEventDataByUserId(id: number): Promise<EventData[]> {
	return fetch('http://127.0.0.1:8080/events?user_id=' + id.toString(), {
		method: 'GET',
		// headers: {
		// },
	})
		.then((response) => response.json())
		.then((response) => {
			return response as EventData[];
		});
}


export function postEvent(payload: EventData): Promise<EventData>{
	return fetch("http://127.0.0.1:8080/events", {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			 'Accept': 'application/json',
			 'Content-Type': 'application/json'
			}
	})
	.then(response => response.json())
		.then((response)=>{
			return response as EventData
		})
	
}
