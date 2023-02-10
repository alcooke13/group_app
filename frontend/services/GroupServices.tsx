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

export function postGroup(payload: JSON): Promise<JSON> {
	return fetch('http://127.0.0.1:8080/groups?user_id=1', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => response.json());
}

export function updateGroupDataWithNewUsers(groupId: number, payload: JSON): Promise<Response> {
	return fetch('http://127.0.0.1:8080/groups/' + groupId.toString() + '/add-users', {
		method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
	})
}

export function deleteGroup(groupId: number): Promise<Response> {
    return fetch('http://127.0.0.1:8080/groups/' + groupId.toString(), {
        method: 'DELETE'
    });
}