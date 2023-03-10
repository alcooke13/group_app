export interface UserData {    
    id: number
    userName: string
    phoneNumber: string
    address: string
    groups: Array<Object>
    friendOf: Array<Object>
}

export function getUserData(): Promise<UserData[]> {
return fetch('http://127.0.0.1:8080/users', {
    method: 'GET',
    // headers: {
    // },
})
    .then((response) => response.json())
    .then((response) => {
        return response as UserData[];
    });
}

export function getUserDataByUserId(id: number): Promise<UserData> {
    return fetch('http://127.0.0.1:8080/users/'  + id.toString(), {
        method: 'GET',
        // headers: {
        // },
    })
        .then((response) => response.json())
        .then((response) => {
            return response as UserData;
        });
    }

export function getFriendsByUserId(id: number): Promise<UserData[]> {
    return fetch('http://127.0.0.1:8080/users?friends_of_user_id=' + id.toString(), {
        method: 'GET',
        // headers: {
        // },
        })
        .then((response) => response.json())
        .then((response) => {
            return response as UserData[];
        });
}

export function updateUserName(
    userId: number,
    payload: Object
  ): Promise<UserData> {
    return fetch(
      "http://127.0.0.1:8080/users/" + userId.toString() + "/update-user-name",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json())
    .then((response) => {
      return response as UserData;
    });
}

export function updateUserAddress(
    userId: number,
    payload: Object
  ): Promise<UserData> {
    return fetch(
      "http://127.0.0.1:8080/users/" + userId.toString() + "/update-address",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json())
    .then((response) => {
      return response as UserData;
    });
}

export function deleteFriendsByUserId(userId: number, payload: Array<number>): Promise<UserData> {
    console.log(payload)
    return fetch('http://127.0.0.1:8080/users/' + userId.toString() + '/remove-friends', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.json())
    .then((response) => {
      return response as UserData;
    });
}
