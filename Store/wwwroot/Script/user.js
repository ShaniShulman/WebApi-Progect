﻿sessionStorage.getItem("id")

const getDataFromRegister = () => {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password2").value
    const firstname = document.querySelector("#firstname").value
    const lastname = document.querySelector("#lastname").value
    return { username, password, firstname, lastname }
}
const getDataFromUpdate = () => {
    const username = document.querySelector("#usernameOnUpdate").value
    const password = document.querySelector("#password2").value
    const firstname = document.querySelector("#firstnameOnUpdate").value
    const lastname = document.querySelector("#lastnameOnUpdate").value
    const userId = sessionStorage.getItem("id");
    return { userId, username, password, firstname, lastname }
}
const getDataFromLogin = () => {
    const username = document.querySelector("#nameInput").value
    const password = document.querySelector("#passwordInput").value
    const firstname = "no-name"
    const lastname = "no-name"
    return { username, password, firstname, lastname }
}
const login = async () => {
    const user = getDataFromLogin()
    try {
        const data = await fetch(`api/Users/login/?username=${user.username}&password=${user.password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            query: {
                username: user.username,
                password: user.password
            }
        });
        if (data.status == 204) {
            throw new Error("user not found")
        }
        if (data.status == 400) {
            throw new Error("all fields are required")
        }
        console.log(data)
        const dataLogin = await data.json()
        console.log('post data',dataLogin)
        //sessionStorage
        sessionStorage.setItem("id", dataLogin.id)
        window.location.href = 'Options.html'
        //const cart = []
        //sessionStorage.setItem("cart", JSON.stringify(cart))
        //if want update
        //window.location.href = 'userDetails.html'
    }
    catch (error) {
        console.log(error)
        alert(error)
    }
    
}
const newUser = () => {
    const container = document.querySelector(".container")

    container.classList.remove("container")
}
const closePanel = () => {
    const container = document.querySelector(".container")

    container.classList.add("container")
}
const seeTheUpdateUser = () => {
    const container = document.querySelector(".containerOfUpdate")
    container.classList.remove("containerOfUpdate")
}

const register = async () => {
    const user = getDataFromRegister()
    //console.log(user.password.length)
    try {
        if (user.username.length > 50 ) {
            throw new Error("the username must be smaller than 50")
        }
        if (user.password.length > 20) {
            throw new Error("the password must be smaller than 20")
        }
        if (user.username == null || user.password == null) {
            throw new Error("username and password fields are required")
        }
        const postFromData = await fetch("api/Users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (postFromData.status == 400) {
            throw new Error("all fieldes are required")
        }
        //console.log(postFromData)
        if (postFromData.status == 404) {
            throw new Error("password not strenge")
        }
        
        const dataPost = await postFromData.json()
        console.log('post data', dataPost)
        alert("user register succussfully")
    }
    catch (error) {
        alert(error)
    }
}
const updateUser = async () => {
    console.log(sessionStorage.getItem("id"))
    const user = getDataFromUpdate()
    try {
        if (user.username.length > 50) {
            throw new Error("the username must be smaller than 50")
        }
        if (user.password.length > 20) {
            throw new Error("the password must be smaller than 20")
        }
        if (user.username == null || user.password == null) {
            throw new Error("username and password fields are required")
        }
        console.log(sessionStorage.getItem("id"))
        const updateFromData = await fetch(`api/Users/${sessionStorage.getItem("id")}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (updateFromData.status == 400) {
            console.log(updateFromData)
            throw new Error("all fields are required")
        }
        if (updateFromData.status == 404) {
            throw new Error("password not strenge")
        }
        alert(`user ${sessionStorage.getItem("id")} update`)
        window.location.href = 'Options.html'

    }
    catch (error) {
        alert(error)
    }
}
const checkScore = async () => {
    const password = document.querySelector("#password2").value
    try {
        const scoreFromData = await fetch("api/Users/password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        });
        
        const scoresDataPost = await scoreFromData.json()
        console.log('post data', scoresDataPost)

        let score = document.querySelector("#score")
        //console.log(score)
        score.value = scoresDataPost
        console.log(score)
        
    }
    catch (error) {
        alert(error)
    }
}