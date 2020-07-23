import shop from '../../api/shop'

// initial state
const state = () => ({
    all: [],
    categories: [],
})
  
// getters
const getters = {}
  
// actions
const actions = {
    getAllProducts ({ commit }) {
        shop.getProducts(products => {
            commit('setProducts', products)
        })
    },
    getAllCategories ({ commit }) {
        shop.getCategories(categories => {
            commit('setCategories', categories)
        })
    }
}
  
// mutations
const mutations = {
    setProducts (state, products) {
        state.all = products
    },
    setCategories (state, categories) {
        state.categories = categories.sort((a,b) => (a.categoria > b.categoria) ? 1 : -1)
    },
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}