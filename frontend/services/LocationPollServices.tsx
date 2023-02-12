export interface LocationPollData {    
    id: number
    options: {
        location: [
            userId: number
        ]
    }
    timeout: string
    event: {
        id: number
        date: string
        eventName: string
        eventLocation: string
        activity: string
        group: {
            id: number
        }
    }
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