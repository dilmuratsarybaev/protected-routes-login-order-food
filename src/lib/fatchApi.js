export const BASE_URL =
    'http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1'

export const fetchApi = async (path, options = {}) => {
    try {
        const requestOptions = {
            method: options.method || 'GET',
            headers: { UserID: 'dilmurat', 'Content-Type': 'application/json' },
        }
        if (requestOptions.method !== 'GET') {
            requestOptions.body = JSON.stringify(options.body)
        }
        const response = await fetch(`${BASE_URL}/${path}`, requestOptions)
        if (!response.ok) {
            throw new Error('Something went wrong')
        }
        const result = response.json()
        return result
    } catch (error) {
        throw error
    }
}
