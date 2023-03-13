import axiosInstance from '../config/mealInstance'

export const postMealRequest = (newMeal, token) => {
    return axiosInstance.post('/foods', newMeal, {
        headers: { Authorization: token },
    })
}

export const getMealRequest = (token) => {
    return axiosInstance.get('/foods', { headers: { Authorization: token } })
}

export const deleteMealRequest = (id, token) => {
    return axiosInstance.delete(`/foods/${id}`, {
        headers: { Authorization: token },
    })
}

export const editMealRequest = (token, data) => {
    console.log(data)
    return axiosInstance.put(`/foods/${data.id}`, data, {
        headers: { Authorization: token },
    })
}
