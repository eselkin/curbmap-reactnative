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
