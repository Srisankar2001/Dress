const validate = (input) => {
    let errors = null
    const answer = input.trim()

    if(answer === ""){
        errors = "Answer field is Empty"
    }
    
    return errors
}

export default validate