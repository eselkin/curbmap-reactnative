import { AsyncStorage } from 'react-native'

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('AUTH_TOKEN')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
  });
};

export const onSignOut = () => {
  AsyncStorage.removeItem('AUTH_TOKEN');
  AsyncStorage.removeItem('REFRESH_TOKEN');
  AsyncStorage.removeItem('EXPIRES_AT');
  AsyncStorage.removeItem('USERNAME');
  return AsyncStorage.removeItem('PASSWORD');
};