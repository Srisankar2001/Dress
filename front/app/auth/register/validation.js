const validate = (input) => {
    const errors = {}
    const firstname = input.firstname.trim()
    const lastname = input.lastname.trim()
    const address = input.address.trim()
    const phone = input.phone.trim()
    const email = input.email.trim()
    const password = input.password.trim()
    const confirmPassword = input.confirmPassword.trim()

    if(firstname === ""){
        errors.firstname = "Firstname field is empty"
    }

    if(lastname === ""){
        errors.lastname = "Lastname field is empty"
    }

    if(address === ""){
        errors.address = "Address field is empty"
    }

    if(phone === ""){
        errors.phone = "Phone Number field is empty"
    }else if(!(/^\d{10}$/).test(phone)){
         errors.phone = "Invalid phone number"
    }

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

    if(confirmPassword === ""){
        errors.confirmPassword = "Confirm password field is empty"
    }else if(/\s/.test(confirmPassword)){
        errors.confirmPassword = "Invalid password"
    }else if(password !== confirmPassword){
        errors.confirmPassword = "Password and Confirm password not matched"
    }

    return errors
}

export default validate