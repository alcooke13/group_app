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


// export const getGroupData = async () => {
//     await fetch(`http://localhost:8080/groups`).then(async res => {
//             const response: GroupData[] = await res.json()
//             return response;
//     })
// }

export function getGroupData(): Promise<GroupData[]> {
	return fetch('http://localhost:8080/groups', {
		method: 'GET',
		headers: {
		},
	})
		.then((response) => response.json()) // Parse the response in JSON
		.then((response) => {
            console.log(response)
			return response as GroupData[]; // Cast the response type to our interface
		});
}

// function getGroupData(): Promise<GroupData[]> {
// 	return fetch('http://localhost:8080/groups', {
// 		method: 'GET',
// 		headers: {
// 		},
// 	})
// 		.then((response) => response.json()) // Parse the response in JSON
// 		.then((response) => {
// 			return response as GroupData[]; // Cast the response type to our interface
// 		});
// }