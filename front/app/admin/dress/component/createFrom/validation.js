const validate = (input) => {
    const errors = {}
    const name = input.name.trim()
    const type_id = input.type_id
    const description = input.description.trim()
    const price = input.price
    const image = input.image
  
    if(name === ""){
        errors.name = "Name field is Empty"
    }else if(!(/^[a-zA-Z0-9' ]+$/).test(name)){
        errors.name = "Invalid name"
    }

    if(description === ""){
        errors.description = "Description field is Empty"
    }

    if(type_id === ""){
        errors.type_id = "Select the Type"
    }

    if(price === ""){
        errors.price = "Price field is Empty"
    }

    if(image === null){
        errors.image = "Select an Image"
    }

    return errors
}

export default validate