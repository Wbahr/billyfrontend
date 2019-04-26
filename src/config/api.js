// export const fetchData = async () => {
//   try {
//     const response = await fetch("https://api.airlinehyd.com/")
//     const data = await response.json()
//     return data
//   } catch (e) {
//     console.log(e)
//   }
// }

// const apiConfig = {
//   'baseURL': 'https://api.airlinehyd.com/'
// }
//
// import _ from 'lodash'
// // import * as apiConfig from '../../config/api'
// import { errorStatus, requestStatus, successStatus } from '../../config/fetch'
// import queryString from 'query-string'
//
// const api = ({ accessTokenRequired, endpoint, headers = {}, method, body, ignore401, callback }) => {
//   let customHeaders = {
//     'Accept': 'application/json',
//     ...headers
//   }
//   if (accessTokenRequired === true) {
//     const accessToken = localStorage.getItem('accessToken')
//     const refreshToken = localStorage.getItem('refreshToken')
//     const refreshTokenAt = _.toInteger(localStorage.getItem('refreshTokenAt'))
//
//     if (refreshTokenAt < (new Date()).getTime()) {
//       const refreshBody = new FormData()
//       _.each({
//         'refresh_token': refreshToken,
//         'grant_type': 'refresh_token',
//         'client_id': apiConfig.clientID,
//         'client_secret': apiConfig.clientSecret
//       }, (val, key) => refreshBody.append(key, val))
//
//       return fetchApi({
//         accessTokenRequired: false,
//         endpoint: 'oauth/access_token',
//         headers: {
//           'Accept': 'application/json'
//         },
//         method: 'POST',
//         body: refreshBody,
//         callback: ({ resp, text, json }) => {
//           const refreshTokenAt = new Date()
//           refreshTokenAt.setTime(refreshTokenAt.getTime() + json.expires_in * 1000)
//
//           localStorage.setItem('accessToken', json.access_token)
//           localStorage.setItem('refreshToken', json.refresh_token)
//           localStorage.setItem('refreshTokenAt', refreshTokenAt.getTime())
//
//           customHeaders = {
//             ...customHeaders,
//             'Authorization': `Bearer ${json.access_token}`
//           }
//
//           return fetchApi({ accessTokenRequired, endpoint, headers: customHeaders, method, body, callback })
//         }
//       })
//     } else {
//       customHeaders = {
//         ...customHeaders,
//         'Authorization': `Bearer ${accessToken}`
//       }
//     }
//   }
//
//   return fetchApi({ accessTokenRequired, endpoint, headers: customHeaders, method, body, ignore401, callback })
// }
//
// const fetchApi = ({ accessTokenRequired, endpoint, headers, method, body, ignore401 = false, callback = null }) => {
//   return fetch(apiConfig.baseURL + endpoint, { method, headers, body })
//     .then(
//       (resp) =>
//         resp.text().then(
//           (text) => ({ resp, text })
//         )
//     )
//     .then(
//       ({ resp, text }) => {
//         try {
//           let json = (resp.status === 204) ? {} : JSON.parse(text)
//           return ({ resp, text, json })
//         } catch (err) {
//           console.log(err)
//         }
//       }
//     )
//     .then(({ resp, text, json }) => {
//       if (!resp.ok || !json || json.error) {
//         if (resp.status === 401 && !ignore401) {
//           let params = queryString.parse(window.location.search)
//           let logout = '/logout'
//           if (params['next']) {
//             logout += `?next=${encodeURIComponent(params['next'])}`
//           }
//           window.location.replace(logout)
//         }
//
//         let errorDescription = resp.statusText
//         if (json && json.error_description) {
//           errorDescription = json.error_description
//         }
//         const error = new Error(errorDescription)
//         error.resp = resp
//         error.text = text
//         error.json = json
//
//         return Promise.reject(error)
//       }
//
//       if (_.isFunction(callback)) {
//         return callback({ resp, text, json })
//       } else {
//         return ({ resp, text, json })
//       }
//     }).catch(err => Promise.reject(err))
// }
//
// export default (store) => (next) => (action) => {
//   // The middleware only gets applied to certain actions
//   if (_.isUndefined(action[ apiConfig.symbol ])) {
//     return next(action)
//   }
//
//   const { accessTokenRequired, endpoint, method, headers, body, actionTypes, actionProps = {}, ignore401 } = action[ apiConfig.symbol ]
//   const [ requestType, successType, errorType ] = actionTypes
//
//   next({
//     type: requestType,
//     status: requestStatus,
//     ...actionProps
//   })
//
//   return api({ accessTokenRequired, endpoint, method, headers, body, ignore401 }).then(
//     ({ resp, text, json }) => next({
//       resp,
//       text,
//       json,
//       type: successType,
//       status: successStatus,
//       ...actionProps
//     }),
//
//     (reason) => {
//       const message = reason.message || 'There was an API error'
//
//       next({
//         reason,
//         type: errorType,
//         status: {
//           ...errorStatus,
//           message
//         },
//         ...actionProps
//       })
//     }
//   )
// }
