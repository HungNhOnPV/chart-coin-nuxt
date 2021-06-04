import axios from "axios";
import Cookies from "js-cookie";

export const state = ({
  local: Cookies.get("local") || null
})

export const getters = {
  local: state => state.local
}

export const actions = {
  getHolder: ({ commit }, { contractAddress, timeLine }) => {
    return axios.get(`${process.env.NUXT_ENV_API}/api/v1/coin/getHolders?contractAddress=${contractAddress}&timeLine=${timeLine}`)
  },
  getContractAddress: ({ commit }, { contractAddress }) => {
    return axios.get(`${process.env.NUXT_ENV_API_BSCSCSAN}/tokens?search=${contractAddress}`)
  },
  createContractAddress: ({ commit }, { contractAddress, local }) => {
    return axios.get(`${process.env.NUXT_ENV_API}/api/v1/coin/createContractAddress?contractAddress=${contractAddress}&local=${local}`)
  },
  getFavoriteCoin: ({ commit }, { local }) => {
    return axios.get(`${process.env.NUXT_ENV_API}/api/v1/coin/getFavoriteCoin?local=${local}`)
  },
}

export const mutations = {}
