import { fetchFromLocalStorage } from "./utils"
import axios from "axios"
const customFetch = axios.create({
  baseURL: " https://jobify-prod.herokuapp.com/api/v1/toolkit",
})

customFetch.interceptors.request.use((config) => {
  const user = fetchFromLocalStorage()
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`
  }
  return config
})
export default customFetch
