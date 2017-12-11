const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080/user'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        credentials:'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
      console.log(res);
        return res.json()
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const doSignUp = (payload) =>
    fetch(`${api}/signup`, {
        method: 'POST',
        credentials:'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: (payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doLogout = () =>
    fetch(`${api}/logout`,{
        method: 'POST',
        credentials:'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }})
        .then(res => res.status)
        .catch(error => {
            console.log("This is error.");
            return error;
        });


      export const createFolder = (payload) =>
            fetch(`${api}/createfolder`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify(payload)
            }).then(res => {
                return res.status;
            }).catch(error => {
                console.log("This is error in create folder");
                return error;
            });

            export const createSharedFolder = (payload) =>
                fetch(`${api}/createsharefolder`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    credentials:'include',
                    body: JSON.stringify(payload)
                }).then(res => {
                    return res.status;
                }).catch(error => {
                    console.log("This is error in creating Shared folder");
                    return error;
                });

                export const deleteFile = (payload) =>
                    fetch(`${api}/delete`, {
                        method: 'POST',
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json'
                        },
                        credentials:'include',
                        body: payload
                    }).then(res => {
                        return res.status;
                    }).catch(error => {
                        console.log("This is error in deleting File");
                        return error;
                    });

                    export const uploadFile = (payload) =>
                        fetch(`${api}/uploadfiles`, {
                            method: 'POST',
                            credentials:'include',
                            headers: {
                                ...headers
                            },
                            body: payload
                        }).then(res => {
                            return res.status;
                        }).catch(error => {
                            console.log("This is error");
                            return error;
                        });

                    export const getImages = () =>
                        fetch(`${api}/list`,{
                          method:'POST',
                          credentials:'include'
                        })
                            .then(res => res.json())
                            .catch(error => {
                                console.log("This is error.");
                                return error;
                            });
                    export const listUserGroups = (payload) =>
                        fetch(`${api}/listUserGroups`,{
                            method:'POST',
                            credentials:'include', body: JSON.stringify(payload)
                        })
                            .then(res => res.json())
                            .catch(error => {
                                console.log("This is error.");
                                return error;
                            });


                    export const listGroupMembers = (payload) =>
                        fetch(`${api}/listGroupMembers`,{
                            method:'POST',
                            credentials:'include', body: JSON.stringify(payload)
                        })
                            .then(res => res.json())
                            .catch(error => {
                                console.log("This is error.");
                                return error;
                            });
