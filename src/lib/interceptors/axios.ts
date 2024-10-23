import axios from 'axios'

const url = import.meta.env.VITE_BE_URL

axios.defaults.baseURL = `${url}`
axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  baseURL: `${url}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance

/*
const axiosInstance = axios.create({
  baseURL: `${url}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axiosInstance.post(
          '/authentication/refresh',
          {},
          { withCredentials: true }
        )
        if (refreshResponse.status === 200) {
          const newToken = refreshResponse.data.token
          localStorage.setItem('token', newToken)
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`

          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('token')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance*/
