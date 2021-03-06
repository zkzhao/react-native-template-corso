import defaultConfig from '@/config'
// import { app } from '@/index'
import { remove } from '@/utils/storage'
import { Toast } from '@ant-design/react-native'
// import { NavigationActions } from 'react-navigation'

const { authKey } = defaultConfig
const errorCode = {
  c10002: 10002,
  c10019: 10019,
  c10020: 10020,
  c330024: 330024,
}
const errorMsg = '报告！服务器出了点小问题，稍后再试试...'
const loginNoInDate = '您的登陆信息已经过期,请重新登陆'
function handleNoCommontError(err) {
  if (!err) {
    Toast.info(errorMsg)
  } else if (err.errorItems && err.errorItems.length > 0 && err.errorItems[0].message) {
    Toast.info(err.errorItems[0].message)
  } else if (err.message) {
    Toast.info(err.message)
  } else {
    Toast.info(err)
  }
}
function handleCommonError(err, config) {
  const { code } = err
  switch (code) {
    case errorCode.c10002:
    case errorCode.c10019:
    case errorCode.c10020: {
      // 在不是react组件内路由跳转例子
      // https://github.com/react-navigation/react-navigation/issues/1439#issuecomment-397604972
      remove(authKey)
      Toast.info(loginNoInDate, 1)
      // app.getStore().dispatch(NavigationActions.navigate({ routeName: 'TabRouter' }))
      break
    }
    default: {
      if (!config.noErrorTip) {
        handleNoCommontError(err)
      }
    }
  }
}

export { handleCommonError, handleNoCommontError, errorMsg, errorCode }
