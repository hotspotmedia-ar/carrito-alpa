import shop from '../../api/shop'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
    items: [],
    checkoutStatus: null,
    order: '',
})

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.items.map(({ id, quantity }) => {
            const product = rootState.products.all.find(product => product.id === id)
            return {
                title: product.title,
                price: product.price,
                quantity
            }
        })
    },
  
    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}
  
// actions
const actions = {
    checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', { items: [] })
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
            commit('setCheckoutStatus', 'failed')
            // rollback to the cart saved before sending the request
            commit('setCartItems', { items: savedCartItems })
            }
        )
    },
  
    addProductToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
            commit('pushProductToCart', { id: product.id, name: product.name, url: product.url, quantity: product.quantity })
        }
        else {
            commit('addQuantityToCart', { id: product.id, quantity: product.quantity })
        }
    },

    removeProductFromCart ({ commit }, product) {
        commit('removeCartItem', { product })
    },

    saveOrderNumber ({ commit }, order) {
        commit('saveOrder', order)
    }

}
  
// mutations
const mutations = {
    pushProductToCart (state, { id, name, url, quantity }) {
        state.items.push({
            id,
            name,
            url,
            quantity,
        })
    },

    addQuantityToCart (state, { id, quantity }) {
        let item = state.items.find(item => item.id == id)
        item.quantity += quantity
    },
  
    setCartItems (state, { items }) {
        state.items = items
    },

    removeCartItem (state, { product }) {
        let index = state.items.findIndex(item => item.id == product.id)
        state.items.splice(index, 1)
    },
  
    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    },

    saveOrder (state, order) {
        console.log(order)
        state.order = order
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }