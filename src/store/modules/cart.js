// import shop from '../../api/shop'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
    items: [],
    checkoutStatus: null,
    order: '',
})

// getters
const getters = {

}
  
// actions
const actions = {
    // checkout ({ commit, state }, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //         commit('setCheckoutStatus', 'failed')
    //         // rollback to the cart saved before sending the request
    //         commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },
  
    addProductToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
            commit('pushProductToCart', { id: product.id, name: product.name, url: product.url, quantity: product.quantity, quantityType: product.quantityType})
        }
        else {
            commit('addQuantityToCart', { id: product.id, quantity: product.quantity })
        }
    },

    removeProductFromCart ({ commit }, product) {
        commit('removeCartItem', { product })
    },

    clearCart ({ commit }) {
        commit('clearCart')
    },

    saveOrderNumber ({ commit }, order) {
        commit('saveOrder', order)
    },

    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    addQuantityToCart ({commit}, [product, quantity]) {
        if( !(quantity < 0 && product.quantity<=1))
            commit('addQuantity', {product, quantity})
    }

}
  
// mutations
const mutations = {
    pushProductToCart (state, { id, name, url, quantity, quantityType }) {
        state.items.push({
            id,
            name,
            url,
            quantity,
            quantityType,
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

    clearCart (state) {
        state.items = []
    },
  
    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    },

    saveOrder (state, order) {
        state.order = order
    },

    addQuantity (state, {product, quantity}) {
        let index = state.items.findIndex(item => item.id == product.id)
        state.items[index].quantity += quantity
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }