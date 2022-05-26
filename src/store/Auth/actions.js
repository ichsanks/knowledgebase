import { API_TOKEN, AUTH, KB } from 'src/constants'
import axios from 'axios'

export async function login(dispatch, payload) {
  dispatch({ type: 'REQUEST_LOGIN' })
  payload.app_token = API_TOKEN
  const { data } = await axios.post(`https://${AUTH}/login`, payload)

  if (data.access_token) {
    const userData = await axios.get(`https://${AUTH}/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    })

    if (userData.data.access.some((item) => ['INTERNAL_USER'].includes(item))) {
      localStorage.setItem('@accesstoken', data.access_token)
      userData?.data && localStorage.setItem('@userinfo', JSON.stringify(userData.data))

      // const globalData = await axios.get(`https://${KB}/globaldata`, {
      //   headers: { Authorization: `Bearer ${data.access_token}` },
      // })
      // globalData?.data && localStorage.setItem('@globaldata', JSON.stringify(globalData.data))

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          userinfo: userData.data,
          // globaldata: globalData.data,
          token: data.access_token,
        },
      })
    }
  }
}

export async function logout(dispatch) {
  localStorage.removeItem('@userinfo')
  localStorage.removeItem('@accesstoken')
  dispatch({ type: 'LOGOUT' })
}

export async function initializeData(dispatch) {
  dispatch({ type: 'RESTORE_DATA' })
  const access_token = await localStorage.getItem('@accesstoken')
  let userinfo = null
  let globaldata = null

  if (access_token) {
    const fetchUser = await axios.get(`https://${AUTH}/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
      timeout: 10000,
    })
    const fetchGlobalData = await axios.get(`https://${KB}/globaldata`, {
      headers: { Authorization: `Bearer ${access_token}` },
      timeout: 10000,
    })

    const [userData, globalData] = await Promise.all([fetchUser, fetchGlobalData])
    userData && localStorage.setItem('@userinfo', JSON.stringify(userData.data))
    userinfo = userData?.data

    globalData?.data && localStorage.setItem('@globaldata', JSON.stringify(globalData.data))
    globaldata = globalData?.data

    console.log({ userinfo, globaldata })

    // userData && localStorage.setItem('@userinfo', JSON.stringify(data))
    // userinfo = userData

    // globalData?.data && localStorage.setItem('@globaldata', JSON.stringify(globalData.data))
    // globaldata = globalData?.data
  }

  dispatch({
    type: 'RESTORE_DATA_SUCCESS',
    payload: { userinfo, globaldata, token: access_token },
  })
}

export async function stopLoading(dispatch) {
  dispatch({ type: 'LOADING_COMPLETE' })
}
