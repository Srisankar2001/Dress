const validate = (input) => {
    const errors = {}
    const firstname = input.firstname.trim()
    const lastname = input.lastname.trim()
    const address = input.address.trim()
    const phone = input.phone.trim()
    const email = input.email.trim()

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

    return errors
}

export default validate