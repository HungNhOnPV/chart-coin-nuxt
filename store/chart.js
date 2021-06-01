import axios from "axios";

export const state = ({})

export const getters = {}

export const actions = {
  getHolder: ({ commit }, { contractAddress, timeLine }) => {
    return axios.get(`${process.env.NUXT_ENV_API}/api/v1/coin/getHolders?contractAddress=${contractAddress}&timeLine=${timeLine}`)
    // return axios.get(`https://demo-live-data.highcharts.com/aapl-c.json`)
  },
}

export const mutations = {}
