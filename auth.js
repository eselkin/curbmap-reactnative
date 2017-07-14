import { AsyncStorage } from 'react-native'

export const isSignedIn = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem('SESSION')
  .then((res) => {
    if (res !== null) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
  .catch(err => reject(err))
})

export const onSignOut = () => {
  AsyncStorage.removeItem('SESSION')
  AsyncStorage.removeItem('USERNAME')
  return AsyncStorage.removeItem('PASSWORD')
}

export const fetchLogin = (username, password) => {
  fetch('https://curbmap.com/login', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${this.state.user}&password=${this.state.pass}`,
  })
    .then(responseUser => responseUser.json())
    .then((responseJSON) => {
      responseJSON['success'] = true
      return responseJSON
    })
    .catch(() => {
      return {success: false}
    })
}