import { redirect } from "react-router-dom"

export const getToken = _ => {
    const token = localStorage.getItem('token')
    return token
}

export const getRole = _ => {

    const role = localStorage.getItem('role')
    return role
}

export const getExpiration = _ => {
    const expiration = localStorage.getItem('expiration')
    return expiration

}


export const loaderForLogin = _ => {
    if (getToken() && (getRole() !== "_" || getRole !== "")) {
        if (getRole() === "doctor") {
            return redirect('/DashboardDoctor')
        }
        if (getRole() === "radiographer") {
            return redirect('/DashboardRadioGraphers')
        }
        if (getRole() === "analyzer") {
            return redirect('/DashboardMLS')
        }
        if (getRole() === 'pharmaceutical') {
            return redirect('/DashboardPharmacist')
        }
    }
    else {
        return null
    }

}


export const loaderForSaveRoutesWithExpForDoctor = _ => {

    const expiration = new Date(parseInt(getExpiration()))
    const current_Date = new Date()


    const token = getToken();
    const role = getRole()
    if (!token || role !== 'doctor') {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/')




    } else if (expiration < current_Date) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/');

    } else {

        return null
    }
}
export const loaderForSaveRoutesWithExpForMLS = _ => {

    const expiration = new Date(parseInt(getExpiration()))
    const current_Date = new Date()


    const token = getToken();
    const role = getRole()
    if (!token || role !== 'analyzer') {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/')




    } else if (expiration < current_Date) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/');

    } else {

        return null
    }
}
export const loaderForSaveRoutesWithExpForPharmacist = _ => {

    const expiration = new Date(parseInt(getExpiration()))
    const current_Date = new Date()


    const token = getToken();
    const role = getRole()
    if (!token || role !== 'pharmaceutical') {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/')




    } else if (expiration < current_Date) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/');

    } else {

        return null
    }
}
export const loaderForSaveRoutesWithExpForRadioGrapher = _ => {

    const expiration = new Date(parseInt(getExpiration()))
    const current_Date = new Date()


    const token = getToken();
    const role = getRole()
    if (!token || role !== 'radiographer') {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/')




    } else if (expiration < current_Date) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/');

    } else {

        return null
    }
}