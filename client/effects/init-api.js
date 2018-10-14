import axios from 'axios'
import { isServer } from '../util'

let api

function createApi(sessionID) {
  const baseURL = isServer
    ? `${process.env.SERVER_URL}/api`
    : '/api'
  const headers = isServer
    ? { 'X-Access-Token': sessionID }
    : { 'X-Requested-With': 'XMLHttpRequest' }
  const withCredentials = !isServer
  return axios.create({
    baseURL,
    headers,
    withCredentials
  })
}

export default function initApi(sessionID) {
  if (isServer) return createApi(sessionID)
  api = api || createApi()
  return api
}
