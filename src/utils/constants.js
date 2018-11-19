/**
 * Created by mel on 2017/3/9.
 */

function createConstants(...constants){
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  })
}

export default createConstants([
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_FAILURE',
  'LOGIN_USER_SUCCESS',
  'LOGOUT_USER',
  'FETCH_PROTECTED_DATA_REQUEST',
  'RECEIVE_PROTECTED_DATA'
]);
