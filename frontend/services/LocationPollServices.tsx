export interface LocationPollData {    
    id: number
    options: {
        location: [
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
    type:string
}

export function getLocationPollData(): Promise<LocationPollData[]> {
return fetch('http://127.0.0.1:8080/location-polls', {
    method: 'GET',
    // headers: {
    // },
})
    .then((response) => response.json())
    .then((response) => {
        return response as LocationPollData[];
    });
}

export function getLocationPollDataById(pollId: number): Promise<LocationPollData[]> {
    return fetch('http://127.0.0.1:8080/location-polls/' + pollId.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
        .then((response) => response.json())
        .then((response) => {
            return response as LocationPollData[];
        });
    }

export function getLocationPollDataByGroupId(id: number): Promise<LocationPollData[]> {
    return fetch('http://127.0.0.1:8080/location-polls?group_id=' + id.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
    .then((response) => response.json())
    .then((response) => {
        return response as LocationPollData[];
    });
}

export function getLocationPollDataByUserId(id: number): Promise<LocationPollData[]> {
    return fetch('http://127.0.0.1:8080/location-polls?user_id=' + id.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
    .then((response) => response.json())
    .then((response) => {
        return response as LocationPollData[];
    });
}

export function updateLocationPollWithNewVote(
    pollId: number, 
    payload:{[key: string]: number} 
    ): Promise <LocationPollData> {
    return fetch(
        'http://127.0.0.1:8080/location-polls/' + pollId.toString() + '/add-vote', 
    {
    method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as LocationPollData
    })
}

export function updateLocationPollWithRemovedVote(
    pollId: number, 
    payload:{[key: string]: number} 
    ): Promise <LocationPollData> {
    return fetch(
        'http://127.0.0.1:8080/location-polls/' + pollId.toString() + '/remove-vote', 
    {
    method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as LocationPollData
    })
    }

export function updateLocationPollDataWithNewOption(
    locationPollId: number,
    payload: { [key: string]: [] }
    ): Promise<LocationPollData> {

    console.log("payload: ", JSON.stringify(payload))
    return fetch(
        "http://127.0.0.1:8080/locations-polls/" + locationPollId.toString() + "/add-option",
        {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        }
    ).then((response) => response.json())
    .then((response) => {
        return response as LocationPollData;
    });
}

export function postLocationPoll(payload: Object): Promise<LocationPollData> {
    return fetch('http://127.0.0.1:8080/location-polls', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
            "Accept":"application/json",
            "Content-Type":"application/json",
         }
    })
        .then((response) => response.json())
        .then((response) => {
            return response as LocationPollData;
        });
}

export function updateLocationPollTimeout(
    pollId: number, 
    payload: Object
    ): Promise <LocationPollData> {
  return fetch(
        'http://127.0.0.1:8080/location-polls/' + pollId.toString() + '/update-timeout', 
    {
    method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
  }
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as LocationPollData
    })
  }

  export function updateLocationPollToComplete(pollId: number): Promise <LocationPollData> {
    return fetch(
        'http://127.0.0.1:8080/location-polls/' + pollId.toString() + '/set-completed', 
    {
        method: 'PUT',
        // body: JSON.stringify(payload),
        // headers: { 'Content-Type': 'application/json' }
    }
    ).then ((response) => response.json())
    .then ((response) => {
        console.log(response)
        return response as LocationPollData
    })
  }