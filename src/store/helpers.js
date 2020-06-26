export const promiseWrapper = (fn, callback) => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    fn.then(res => {
      callback(res.data)
      resolve(res.data)
    }).catch(err => reject(err))
    // }, 1000)
  })
}

/*
return new Promise((resolve, reject) => {
  axios.get('profiles').then(({ data }) => {
    commit(Profiles.fetchAll, data)
    resolve(data)
  }).catch(err => reject(err))
})
*/
