import axios from 'axios'

//GET All Courses 
export const getCourses = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/courses',
            method: 'get',
            responseType: 'json',
            validateStatus: status => status === 200,
        })
        .then(response => {
            if(response.status === 200){ // 200 Courses successfully retrieved
                resolve(response.data)
            }
        })
        .catch(error => { // 500 Internal Server Error
            console.error(error)
            reject(error)
        })
    })
}

//GET Course that Matches ID
export const getCourse = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'get',
            responseType: 'json',
            validateStatus: status => status === 200 || status === 404 || status === 500,
        })
        .then(response => {
            if(response.status === 200){
                resolve(response.data)
            } else { // 404 - Not Found OR 500 - Internal Server Error
                reject(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

//POST Create a New Course
export const createCourse = (course, user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/courses',
            method: 'post',
            data: course,
            responseType: 'json',
            auth: {
                username: user.emailAddress,
                password: user.password,
            },
            validateStatus: status => status === 201 || status === 400 || status === 500,
        })
        .then(response => {
            if(response.status === 201){
                resolve(response)
            } else { // 400 - Bad Request OR 500 - Internal Server Error
                reject(response)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

//PUT Update an Existing Course
export const updateCourse = (id, course, user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'put',
            data: course,
            responseType: 'json',
            auth: {
                username: user.emailAddress,
                password: user.password,
            },
            validateStatus: status => status === 204 || status === 400 || status === 500,
        })
        .then(response => {
            if(response.status === 204){
                resolve(response)
            } else { // 400 - Bad Request OR 500 - Internal Server Error
                reject(response)
            } 
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

//DELETE Course with Matching ID
export const deleteCourse = (id, user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'delete',
            responseType: 'json',
            auth: {
                username: user.emailAddress,
                password: user.password,
            },
            validateStatus: status => status === 204 || status >= 400,
        })
        .then(response => {
            if(response.status === 204){
                resolve(true)
            } else {
                reject(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

//GET User with Matching Credentials
export const getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/users',
            method: 'get',
            responseType: 'json',
            auth: {
                username: email,
                password: password,
            },
            validateStatus: status => status === 200 || status === 401 || status === 500,
        })
        .then(response => {
            if(response.status === 200){ //User Successfully Authenticated
                resolve({...response.data, password})
            } else { // 401 - Authentication Failed || 500 - Internal Server Error
                reject(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error) //reject the promise
        })
    })
}

//POST Create a New User
export const createUser = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/users',
            method: 'post',
            data: user,
            responseType: 'json',
            validateStatus: status => status === 201 || status === 400 || status === 500,
        })
        .then(response => {
            if(response.status === 201){
                resolve(response)
            } else {
                reject(response)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}