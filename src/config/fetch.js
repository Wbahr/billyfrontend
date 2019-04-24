export const initialStatus = {
  isComplete: false, // Becomes true after first API call and stays true forever afterwards
  notComplete: true, // Becomes false after first API call and stays true forever afterwards
  inFlight: false, // Becomes true while the call is active, false after the call returns
  hasSucceeded: false, // Becomes true if the call returns without any errors
  hasFailed: false, // Becomes false if the call returns with errors
  message: '' // Empty while inFlight or hasSucceeded, contains an error message if hasFailed
}

export const requestStatus = {
  isComplete: false,
  notComplete: true,
  inFlight: true,
  hasSucceeded: false,
  hasFailed: false,
  message: ''
}

export const successStatus = {
  isComplete: true,
  notComplete: false,
  inFlight: false,
  hasSucceeded: true,
  hasFailed: false,
  message: ''
}

export const errorStatus = {
  isComplete: true,
  notComplete: false,
  inFlight: false,
  hasSucceeded: false,
  hasFailed: true,
  message: ''
}
