export interface EventData {    
	id: number
	date: string
	eventName: string
	eventLocation: string
	activity: string
	group: {
		events: []
		groupName: string
		id: number
		users: [{
			id: number
			userName: string
			phoneNumber: string
			address: string
		}]
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




export function postEvent(payload: Object): Promise<EventData>{
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

export function updateEventDate(eventId: number, payload: Object): Promise<EventData> {
    return fetch("http://127.0.0.1:8080/events/" + eventId.toString() + "/update-date",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json())
    .then((response) => {
      return response as EventData;
    });
}

export function updateEventActivity(eventId: number, payload: Object): Promise<EventData> {
    return fetch("http://127.0.0.1:8080/events/" + eventId.toString() + "/update-activity",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json())
    .then((response) => {
      return response as EventData;
    });
}

export function updateEventLocation(eventId: number, payload: Object): Promise<EventData> {
    return fetch("http://127.0.0.1:8080/events/" + eventId.toString() + "/update-location",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json())
    .then((response) => {
      return response as EventData;
    });
}

