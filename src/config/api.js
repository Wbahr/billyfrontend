export function GraphQLCall(body){
  fetch(`${process.env.API_URL + '/graphql'}`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'omit', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    body: body, // make sure this is stringified  
  })
  .then( res => res.json() )
  .then( data => {
    return(data)
  })
}

