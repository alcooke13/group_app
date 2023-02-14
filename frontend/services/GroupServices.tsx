export interface GroupData {
    id:number
    groupName: string,
    users: [],
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

export function getGroupDataByGroupId(groupId: number): Promise<GroupData> {
    return fetch('http://127.0.0.1:8080/groups/' + groupId.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
        .then((response) => response.json())
        .then((response) => {
            return response as GroupData;
        });
}

export function postGroup(payload: Object): Promise<GroupData> {
    return fetch('http://127.0.0.1:8080/groups', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
            "Accept":"application/json",
            "Content-Type":"application/json",
         }
    })
        .then((response) => response.json())
        .then((response) => {
            return response as GroupData;
        });
}

export function updateGroupDataWithNewUsers(groupId: number, payload: Array<number>): Promise<Response> {
    return fetch('http://127.0.0.1:8080/groups/' + groupId.toString() + '/add-users', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
}

export function updateGroupTitle(groupId: number, payload: Object): Promise<Response> {
    return fetch('http://127.0.0.1:8080/groups/' + groupId.toString() + '/modify-title', {
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



export function deleteMembersByGroupId(groupId: number, payload: Array<number>): Promise<Response> {
    console.log("delete members payload", payload)
    return fetch('http://127.0.0.1:8080/groups/' + groupId.toString() + '/remove-members', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.json())
    // .then((response) => {
    // //   return response as UserData;
    // });
}