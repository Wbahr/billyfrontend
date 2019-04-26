const url = 'https://preprodapi.airlinehyd.com'

export function getInvoice(invoiceNum) {
  // Default options are marked with *
    const token = 'hVa-Olr_iqUeJAp9ZlVrEm6b4pOT_6KimgT74xGOaoO1IngU7vdK4zarsx4i6ajSEyo1ycePpoCYcTnbJgydK1_3ughRrNxKmE9lM-6I5xjccF_dW1i9siLAa2xjD-923dZ8y6OFjTwaYSsAONLT4CtscjpPEv_CYzzkvnnlpDShpEve00hd_d-9R4RTmvVbqzE4O_dMcCvVZ0-YBFZGNu1bZTACZ2Tt-MHLs61w0ILPHjg9qmimDdYFrA72XJDIyE8gjcnw2Ob6zqq-FU7zGCZY20zGPklhvoFqcmqMGF4yNP1ZD0aW4zoBdGyDlQeJhgjUaQpeE-KLb2pcTabvGDe8a4rVemDJeRpR0B02zEc7yjCHu2oem1RVRUze7sO3Puf2OdMrisPyf4JMjvQthb-uT0tjHckuGG6dRODjfVfr74QJK0jlAMMJzj8t9SWWE-MrM5DAzDxPZnOkyiRPcthpiM7DPXyFbqng6bFfJ3byb2HcPsYO0S4bDF93iBFUVJdEuBUG_ZfunWpI8yYjYylxKXusZs2sXkuMpzhiMBQttLP8WXdGCaufqDvrnMinR9tLRX_2ryXdu-s7YJGlnmaNf9tY8arHNcuHoWnIFzO0inlw752QW6YpQOLT7fnH'
    const endpoint = `/corvus/myaccount/get/invoices/${invoiceNum}`
    return fetch(url + endpoint, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    })
    .then(function(response){
      if(response.ok){
        return response.json()
      }
      throw new Error('Bad Request.')
    }).catch(function(error) {
      return {'error': 'Bad Request. Try again.'}
    })
}

// UPDATE THIS ONCE I HAVE AN RMA
// export function postRMA(data) {
//   // Default options are marked with *
//     const token = 'hVa-Olr_iqUeJAp9ZlVrEm6b4pOT_6KimgT74xGOaoO1IngU7vdK4zarsx4i6ajSEyo1ycePpoCYcTnbJgydK1_3ughRrNxKmE9lM-6I5xjccF_dW1i9siLAa2xjD-923dZ8y6OFjTwaYSsAONLT4CtscjpPEv_CYzzkvnnlpDShpEve00hd_d-9R4RTmvVbqzE4O_dMcCvVZ0-YBFZGNu1bZTACZ2Tt-MHLs61w0ILPHjg9qmimDdYFrA72XJDIyE8gjcnw2Ob6zqq-FU7zGCZY20zGPklhvoFqcmqMGF4yNP1ZD0aW4zoBdGyDlQeJhgjUaQpeE-KLb2pcTabvGDe8a4rVemDJeRpR0B02zEc7yjCHu2oem1RVRUze7sO3Puf2OdMrisPyf4JMjvQthb-uT0tjHckuGG6dRODjfVfr74QJK0jlAMMJzj8t9SWWE-MrM5DAzDxPZnOkyiRPcthpiM7DPXyFbqng6bFfJ3byb2HcPsYO0S4bDF93iBFUVJdEuBUG_ZfunWpI8yYjYylxKXusZs2sXkuMpzhiMBQttLP8WXdGCaufqDvrnMinR9tLRX_2ryXdu-s7YJGlnmaNf9tY8arHNcuHoWnIFzO0inlw752QW6YpQOLT7fnH'
//     const endpoint = `/corvus/myaccount/get/invoices/${invoiceNum}`
//     return fetch(url + endpoint, {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, cors, *same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//             'Authorization': 'bearer ' + token,
//             // "Content-Type": "application/json",
//             // "Content-Type": "application/x-www-form-urlencoded",
//         },
//         redirect: "follow", // manual, *follow, error
//         referrer: "no-referrer", // no-referrer, *client
//         // body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//     .then(response => console.log('response', response.json()))
// }

// export function testTracking() {
//     let data = 'actid=252092509&key=3d91ab1cc5cb0e82b591213e9c77cca56e2ec002&event=ADD_PRODUCT_TAG&eventdata=TEST1&visit=%7B%22email%22%3A%22zlinsell%40airlinehyd.com%22%7D'
//
//     return fetch('https://cors-anywhere.herokuapp.com/https://trackcmp.net/event', {
//         method: "POST",
//         mode: "no-cors",
//         cache: "no-cache",
//         credentials: "omit",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         redirect: "follow",
//         referrer: "no-referrer",
//         body: data,
//     })
//     .then(response => console.log('response', response.json()))
// }
