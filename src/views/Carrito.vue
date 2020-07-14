<template>
  <div class="carrito" style="padding-top:60px;">
    <div v-if="this.cart.length > 0">

      <div class="table-responsive">
        <table class="table table-sm" id="cartProductsTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th scope="col">Cantidad</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.cart" :key="item.id">
              <td class="align-middle" scope="row">{{item.id}}</td>
              <td class="align-middle">{{item.name}}</td>
              <td class="align-middle">{{item.quantity}}</td>
              <td class="align-middle"><button class="btn btn-xs"><font-awesome-icon icon="trash" size="xs" @click="removeProductFromCart(item)"/></button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-12 float-center" style="margin-top: 30px; margin-bottom:80px;">
          <button class="btn btn-primary" style="" @click="enviarPedido()">Realizar Pedido</button>
        </div>
      </div>
    </div>
    <div v-else class="row" style="flex-direction: column;justify-content: center;align-content: center;height: calc(100vh - 180px) !important;align-items: center;color:#aaa;">
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
      this.$confirm("Deseas enviar el pedido?", "", "question").then(() => {
      
        this.axios.post("/carrito/gracias.php", this.cart)
        .then(response => {
          console.log(response);
          if(response.data.estado == "ok")
          {
            this.$alert("Su pedido fue enviado correctamente!", "Éxito", "success")
            .then(() => window.location = "https://wa.me/5491169987211");
          }
          else
          {
            this.$alert("Ha ocurrido un error, intente nuevamente.", "Error", "warning");
          }
        })
        .catch(e => console.log(e));
        
      });  
    },
    ...mapActions('cart', [
      'removeProductFromCart'
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


</style>
