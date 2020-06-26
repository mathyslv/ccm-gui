export const Root = {
  setCcmServerUrl: 'setCcmServerUrl',
  _cookies: {
    ccmServerUrl: 'CCM_SERVER_URL'
  }
}

export const Layout = {
  setNotificationDrawer: 'setNotificationDrawer',
  setNavbarExtension: 'setNavbarExtension',
  setBreadcrumbs: 'setBreadcrumbs'
}

export const Notifications = {
  addNotification: 'addNotification',
  deleteNotification: 'deleteNotification',
  clearNotifications: 'clearNotifications'
}

export const Auth = {
  login: 'login',
  logout: 'logout',
  register: 'register',
  _cookies: {
    token: 'TOKEN'
  }
}

export const Profiles = {
  fetchAll: 'fetchAll',
  fetchOne: 'fetchOne',
  create: 'create',
  delete: 'delete'
}

export const Resources = {
  fetchAll: 'fetchAll',
  createOne: 'createOne',
  updateOne: 'updateOne',
  deleteOne: 'deleteOne'
}
