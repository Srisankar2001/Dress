const validate = (input) => {
    const errors = {}

    const name = input.name.trim()
    const email = input.email.trim()
    const message = input.message.trim()
    
    if(name === ""){
        errors.name = "Name field is empty"
    }

    if(email === ""){
        errors.email = "Email field is empty"
    }else if(!(/^[a-zA-Z]{1}[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/).test(email)){
        errors.email = "Invalid email address"
    }

    if(message === ""){
        errors.message = "Message field is empty"
    }

    return errors
}

export default validate