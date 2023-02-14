export interface ActivityPollData {    
    id: number
    options: {
        activityName: [
            userId: number
        ]
    }
    timeout: string
    completed: boolean
    event: {
        id: number
        date: string
        eventName: string
        eventLocation: string
        activity: string
        group: {
            id: number
            users: [{
                id: number
                userName: string
                phoneNumber: string
                address: string
            }]
        }
    }
    type: string
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

export function getActivityPollDataById(pollId: number): Promise<ActivityPollData[]> {
    return fetch('http://127.0.0.1:8080/activity-polls/' + pollId.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
    .then((response) => response.json())
    .then((response) => {
        return response as ActivityPollData[];
    });
}

export function getActivityPollDataByGroupId(id: number): Promise<ActivityPollData[]> {
    return fetch('http://127.0.0.1:8080/activity-polls?group_id=' + id.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
        .then((response) => response.json())
        .then((response) => {
            return response as ActivityPollData[];
        });
}

export function getActivityPollDataByUserId(id: number): Promise<ActivityPollData[]> {
    return fetch('http://127.0.0.1:8080/activity-polls?user_id=' + id.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
        .then((response) => response.json())
        .then((response) => {
            return response as ActivityPollData[];
        });
}

export function updateActivityPollWithNewVote(
    pollId: number, 
    payload:{[key: string]: number} 
    ): Promise <ActivityPollData> {
	return fetch(
        'http://127.0.0.1:8080/activity-poll/' + pollId.toString() + '/add-vote', 
    {
		method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
	}
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as ActivityPollData
    })
}

export function updateActivityPollWithRemovedVote(
    pollId: number, 
    payload:{[key: string]: number} 
    ): Promise <ActivityPollData> {
	return fetch(
        'http://127.0.0.1:8080/activity-poll/' + pollId.toString() + '/remove-vote', 
    {
		method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
	}
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as ActivityPollData
    })
}

export function updateActivityPollDataWithNewOption(
    activityPollId: number,
    payload: { [key: string]: [] }
  ): Promise<ActivityPollData> {
    return fetch(
      "http://127.0.0.1:8080/activity-polls/" + activityPollId.toString() + "/add-option",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json())
    .then((response) => {
      return response as ActivityPollData;
    });
}

export function postActivityPoll(payload: Object): Promise<ActivityPollData> {
    return fetch('http://127.0.0.1:8080/activity-polls', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
            "Accept":"application/json",
            "Content-Type":"application/json",
         }
    })
        .then((response) => response.json())
        .then((response) => {
            return response as ActivityPollData;
        });
}

export function updateActivityPollTimeout(
    pollId: number, 
    payload: Object
    ): Promise <ActivityPollData> {
  return fetch(
        'http://127.0.0.1:8080/activity-polls/' + pollId.toString() + '/update-timeout', 
    {
    method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
  }
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as ActivityPollData
    })
  }

export function updateActivityPollToComplete(pollId: number): Promise <ActivityPollData> {
    return fetch(
        'http://127.0.0.1:8080/activity-polls/' + pollId.toString() + '/set-completed', 
    {
        method: 'PUT',
        // body: JSON.stringify(payload),
        // headers: { 'Content-Type': 'application/json' }
    }
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as ActivityPollData
    })
}