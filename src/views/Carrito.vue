<template>
  <div class="carrito" style="padding-top:70px;">
    <div v-if="this.cart.length > 0">
      <h5>CARRITO</h5>
      <div class="pt-2">
        <table class="table table-sm" id="cartProductsTable">
          <thead>
            <tr>
              <th scope="col" style="width: 8%;">#</th>
              <th scope="col" style="width: 55%;">Producto</th>
              <th scope="col" style="width: 30%;">Cantidad</th>
              <th scope="col" style="width: 8%;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.cart" :key="item.id">
              <td class="align-middle" scope="row" style="width: 8%;">{{item.id}}</td>
              <td class="align-middle" style="width: 55%;">{{item.name}}</td>
              <td class="align-middle" style="width: 30%;">
                <div class="d-flex justify-content-center align-items-center">
                  <button class="btn btn-sm btn-default" @click="addQuantityToCart([item, -1])">-</button>
                  <input class="form-control form-control-sm text-center disabled;" disabled min=1 type="number" v-model="item.quantity" style="font-size: 10pt;padding: 0 !important;background-color: white;width: 50px;" />
                  <button class="btn btn-sm btn-default" @click="addQuantityToCart([item, 1])">+</button>
                </div>
                </td>
              <td class="align-middle text-center" style="width: 8%;">
                <button class="btn btn-xs"><font-awesome-icon icon="trash" size="xs" @click="removeProductFromCart(item)"/></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-12 float-center" style="margin-top: 30px; margin-bottom:80px;">
          <button class="btn btn-primary" style="" @click="enviarPedido()">
            <font-awesome-icon icon="shopping-cart" size="lg"></font-awesome-icon>
            <span style="font-weight: 600;margin-left: 10px;">Enviar Pedido</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="row" style="flex-direction: column;justify-content: center;align-content: center;height: calc(100vh - 100px) !important;align-items: center;color:#aaa;">
      <font-awesome-icon icon="shopping-cart" size="2x" />
      <p class="align-self-center" style="margin-top: 15px; font-size: 18px;">No hay productos en el carrito.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Carrito',
  computed: mapState({
    cart: state => state.cart.items
  }),
  methods: {
    enviarPedido() {
      this.$router.push({ name: 'Checkout' })
    },
    ...mapActions('cart', [
      'removeProductFromCart',
      'addQuantityToCart'
    ])
  },
  created () {

  }
}
</script>

<style scoped>

#cartProductsTable {
  font-size: 12px;
  bottom: 50px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>


<style>

button.number-input__button {
    width: 25px !important;
}

input.number-input__input {
  padding-left: 0 !important;
  padding-right: 0 !important;
}


</style>