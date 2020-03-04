const state = {
  lists: []
}
const getters = {
  allLists: state => state.lists
}
const actions = {
  async fetchTodos ({ commit }) {
    const res = await window.fetch('http://localhost:3000/list')
    commit('setLists', res.data)
  },
  async addTodo ({ commit }, listName) {
    const res = await window.fetch('http://localhost:3000/list', {
      method: 'POST',
      body: JSON.stringify({ listName: listName })
    })
    commit('newList', res.data)
  }
}
const mutations = {
  setLists: (state, lists) => (state.lists = lists),
  newList: (state, list) => state.lists.push(list)
}

export default {
  state,
  getters,
  actions,
  mutations
}
