const validate = (input) => {
    const fieldsToCheck = Object.keys(input)

    for (let field of fieldsToCheck) {
        const value = input[field]

        if (value === undefined || value === null || value === "") {
            const label = field.replace(/_/g, " ")
            return `${label.charAt(0).toUpperCase() + label.slice(1)} measurement is required`
        }

        const number = Number(value)
        if (isNaN(number)) {
            const label = field.replace(/_/g, " ")
            return `${label.charAt(0).toUpperCase() + label.slice(1)} must be a valid number`
        }

        if (number < 0 || number > 500) {
            const label = field.replace(/_/g, " ")
            return `${label.charAt(0).toUpperCase() + label.slice(1)} must be between 0 and 500`
        }
    }

    return null
}

export default validate
