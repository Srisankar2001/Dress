const validate = (input) => {
    const errors = {}
    const name = input.name.trim()
    const shoulder = input.shoulder
    const chest = input.chest
    const bust = input.bust
    const under_bust = input.under_bust
    const waist = input.waist
    const hip = input.hip
    const thigh = input.thigh
    const total_rise = input.total_rise
    const calf = input.calf
    const upper_arm = input.upper_arm
    const inseam = input.inseam
    const outseam = input.outseam

    if(name === ""){
        errors.name = "Name field is Empty"
    }else if(!(/^[a-zA-Z0-9\- ]+$/).test(name)){
        errors.name = "Invalid name"
    }

   if(!shoulder && !chest && !bust && !under_bust && !waist && !hip && !thigh && !total_rise && !calf && !upper_arm && !inseam && !outseam){
    errors.measure = "Select the measures needed"
   }

    return errors
}

export default validate