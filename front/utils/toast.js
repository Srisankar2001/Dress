import { toast } from "react-toastify"

const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
}

const showToast = (type, message) => {
    if (type) {
        toast.success(message, options)
    } else {
        toast.error(message, options)
    }
}

export default showToast