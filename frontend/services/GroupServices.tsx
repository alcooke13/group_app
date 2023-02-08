export interface GroupData {
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
	return fetch('http://127.0.0.1:8080/groups', {
		method: 'GET',
		// headers: {
		// },
	})
		.then((response) => response.json())
		.then((response) => {
			return response as GroupData[];
		});
}