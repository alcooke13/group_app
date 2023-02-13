export interface ActivityPollData {    
    id: number
    options: {
        activityName: [
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