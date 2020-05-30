import { Resources } from '@/constants/store'
import axios from 'axios'
import { promiseWrapper } from '@/store/helpers'

const sortSimpleResources = env => {
  env.resources.sort((r1, r2) => r1.key < r2.key ? -1 : 1)
}

const mapExtendedResources = (env, resourcesEnv) => {
  env.resources = env.resources.filter(r => !r.extended || r.override).map(r => {
    delete r.extended
    delete r.override
    return r
  })
  env.extends = null
  const toExtend = env.resources.find(r => r.key === '__extends__')
  if (!toExtend) return sortSimpleResources(env) // if there is no extends

  const baseEnv = resourcesEnv.find(e => e.env === toExtend.value)
  if (!baseEnv) return sortSimpleResources(env) // if no env corresponds to __extends__

  env.extends = baseEnv.env
  baseEnv.resources.forEach(baseResource => {
    const override = env.resources.find(finalResource => finalResource.key === baseResource.key)
    if (override) {
      override.extended = true
      override.override = true
    } else {
      env.resources.splice(0, 0, { ...baseResource, extended: true })
    }
  })
  env.resources.sort((r1, r2) => {
    if (r1.extended && !r1.override && r2.extended && !r2.override) {
      return r1.key < r2.key ? -1 : 1
    } else if (r1.extended && !r1.override && r2.extended && r2.override) return -1
    else if (r2.extended && !r2.override && r1.extended && r1.override) return 1
    else if (r1.extended && !r2.extended) return -1
    else if (r2.extended && !r1.extended) return 1
    else return r1.key < r2.key ? -1 : 1
  })
}

export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    [Resources.fetchAll] (state, { id, resourcesEnv }) {
      resourcesEnv.sort((a, b) => {
        return a.env < b.env ? -1 : 1
      })
      resourcesEnv.forEach(env => mapExtendedResources(env, resourcesEnv))
      const index = state.data.findIndex(d => d.id === id)
      if (index === -1) {
        state.data.push({ id, resourcesEnv })
      } else state.data.splice(index, 1, { id, resourcesEnv })
    },
    [Resources.createOne] (state, { id, env, resource }) {
      const dataResourcesEnv = state.data.find(d => d.id === id).resourcesEnv
      if (!dataResourcesEnv) return
      let dataEnv = dataResourcesEnv.find(re => re.env === env)
      if (!dataEnv) {
        dataResourcesEnv.push({
          env: resource.env,
          resources: [resource]
        })
        dataEnv = dataResourcesEnv.find(re => re.env === env)
      } else {
        const overrideIndex = dataEnv.resources.findIndex(r => r.key === resource.key)
        if (overrideIndex !== -1) {
          dataEnv.resources[overrideIndex] = resource
        } else dataEnv.resources.push(resource)
      }
      mapExtendedResources(dataEnv, dataResourcesEnv)
    },
    [Resources.updateOne] (state, { id, env, key, resource }) {
      const dataResourcesEnv = state.data.find(d => d.id === id).resourcesEnv
      if (!dataResourcesEnv) return
      const dataEnv = dataResourcesEnv.find(re => re.env === env)
      if (!dataEnv) return
      const updateIndex = dataEnv.resources.findIndex(r => r.key === key)
      if (updateIndex !== -1) {
        dataEnv.resources[updateIndex]._type = resource._type
        dataEnv.resources[updateIndex].value = resource.value
        if (key === '__extends') mapExtendedResources(dataEnv, dataResourcesEnv)
      }
    },
    [Resources.deleteOne] (state, { id, key, env }) {
      const dataResourcesEnv = state.data.find(d => d.id === id).resourcesEnv
      if (!dataResourcesEnv) return
      const dataEnv = dataResourcesEnv.find(re => re.env === env)
      if (!dataEnv) return
      const index = dataEnv.resources.findIndex(r => r.env === env && r.key === key)
      if (index === -1) return

      if (dataEnv.resources[index].override) delete dataEnv.resources[index].override
      else dataEnv.resources.splice(index, 1)

      if (dataEnv.resources.length === 0) {
        // Delete the env if there is no resource inside
        dataResourcesEnv.splice(dataResourcesEnv.findIndex(re => re.env === env), 1)
      } else {
        // Else, Re Map all the extended resources
        mapExtendedResources(dataEnv, dataResourcesEnv)
      }
    }
  },
  actions: {
    async [Resources.fetchAll] ({ commit }, id) {
      return promiseWrapper(
        axios.get(`resources/${id}?full`),
        resourcesEnv => commit(Resources.fetchAll, { id, resourcesEnv })
      )
    },
    async [Resources.createOne] ({ commit }, { id, env, data }) {
      return promiseWrapper(
        axios.post(`resources/${id}/${env}`, data),
        resource => commit(Resources.createOne, { id, env, resource })
      )
    },
    async [Resources.updateOne] ({ commit }, { id, env, key, data }) {
      return promiseWrapper(
        axios.patch(`resources/${id}/${env}/${key}`, data),
        resource => commit(Resources.updateOne, { id, env, key, resource })
      )
    },
    async [Resources.deleteOne] ({ commit }, { id, env, key }) {
      return promiseWrapper(
        axios.delete(`resources/${id}/${env}/${key}`),
        () => commit(Resources.deleteOne, { id, env, key })
      )
    }
  },
  getters: {
    data: state => state.data
  }
}
