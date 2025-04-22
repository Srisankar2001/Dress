const validate = (input) => {
    const errors = {}
    const email = input.email.trim()
    const password = input.password.trim()

    if(email === ""){
        errors.email = "Email field is empty"
    }else if(!(/^[a-zA-Z]{1}[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/).test(email)){
        errors.email = "Invalid email address"
    }

    if(password === ""){
        errors.password = "Password field is empty"
    }else if(/\s/.test(password)){
        errors.password = "Invalid password"
    }

    return errors
}

export default validate