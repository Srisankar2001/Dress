const validate = (input) => {
    const errors = {}
    const startDate = input.startDate
    const endDate = input.endDate
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!startDate || startDate === "") {
        errors.startDate = "Please select a start date"
    } else {
        const start = new Date(startDate)
        if (isNaN(start.getTime())) {
            errors.startDate = "Invalid start date"
        } else {
            if (start > today) {
                errors.startDate = "Start date cannot be in the future"
            }
        }
    }

    if (!endDate || endDate === "") {
        errors.endDate = "Please select an end date"
    } else {
        const end = new Date(endDate)
        if (isNaN(end.getTime())) {
            errors.endDate = "Invalid end date"
        } else {
            if (end > today) {
                errors.endDate = "End date cannot be in the future"
            }
            if (startDate && !errors.startDate && !errors.endDate) {
                const start = new Date(startDate)
                if (start >= end) {
                    errors.endDate = "End date must be after start date"
                }
            }
        }
    }

    return errors
}

export default validate