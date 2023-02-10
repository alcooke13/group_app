export interface GroupData {
    id:number
    groupName: string
    events: [
        {
        id: number
        date: string
        eventName: string
        eventLocation: string
        activity: string
        activityPoll?: string
        locationPoll?: string
        datePoll?: string
    }
]
}

export function getGroupData(): Promise<GroupData[]> {
	return fetch('http://127.0.0.1:8080/groups?user_id=1', {
		method: 'GET',
		// headers: {
		// },
	})
		.then((response) => response.json())
		.then((response) => {
			return response as GroupData[];
		});
}