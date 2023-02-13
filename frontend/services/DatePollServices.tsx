export interface DatePollData {    
    id: number
    options: {
        date: [
            userId: number
        ]
    }
    timeout: string
    event: {
        id: number
        date: string
        eventName: string
        eventLocation: string
        Date: string
        group: {
            id: number
        }
    }
    type:string
}

export function getDatePollData(): Promise<DatePollData[]> {
  return fetch("http://127.0.0.1:8080/date-polls", {
    method: "GET",
    // headers: {
    // },
  })
    .then((response) => response.json())
    .then((response) => {
      return response as DatePollData[];
    });
}

export function getDatePollDataByUserId(id: number): Promise<DatePollData[]> {
  return fetch("http://127.0.0.1:8080/date-polls?user_id=" + id.toString(), {
    method: "GET",
    // headers: {
    // },
  })
    .then((response) => response.json())
    .then((response) => {
      return response as DatePollData[];
    });
}

export function getDatePollDataByGroupId(id: number): Promise<DatePollData[]> {
  return fetch("http://127.0.0.1:8080/date-polls?group_id=" + id.toString(), {
    method: "GET",
    // headers: {
    // },
  })
    .then((response) => response.json())
    .then((response) => {
      return response as DatePollData[];
    });
}

export function updateDatePollDataWithNewOption(
  datePollId: number,
  payload: { [key: string]: [] }
): Promise<DatePollData> {
  return fetch(
    "http://127.0.0.1:8080/date-polls/" + datePollId.toString() + "/add-option",
    {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => response.json())
  .then((response) => {
    console.log(response)
    return response as DatePollData;
  })
}

export function updateDatePollWithNewVote(
  pollId: number, 
  payload:{[key: string]: number} 
  ): Promise <DatePollData> {
return fetch(
      'http://127.0.0.1:8080/date-polls/' + pollId.toString() + '/add-vote', 
  {
  method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
}
  ).then ((response) => response.json())
  .then ((response) => {
      console.log(response)
      return response as DatePollData
  })
}