const validate = (input) => {
    let errors = null
    const question = input.trim()

    if(question === ""){
        errors = "Question field is Empty"
    }
    
    return errors
}

export default validate