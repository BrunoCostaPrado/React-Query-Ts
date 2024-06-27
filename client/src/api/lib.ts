import axios from "axios"

export const baseURL = "http://192.168.15.20:3000"
export const getURL = "http://192.168.15.20:3000/getWeight"
export const api = axios.create({ baseURL: "http://192.168.15.20:3000" })
