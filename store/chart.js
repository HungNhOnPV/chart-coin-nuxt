import axios from "axios";

export const state = ({})

export const getters = {}

export const actions = {
  getHolder: ({ commit }, { contractAddress, timeLine }) => {
    return axios.get(`${process.env.NUXT_ENV_API}/api/v1/coin/getHolders?contractAddress=${contractAddress}&timeLine=${timeLine}`)
  },
}

export const mutations = {}
