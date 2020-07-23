<template>
    <div class="checkout">
        <h5>ENVIAR PEDIDO</h5>

    <div class="row">
        <div class="col-xl-4 offset-xl-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
            <form class="form" @submit.prevent="submit">
                <!-- Nombre -->
                <div class="form-group" :class="{ 'form-group--error': $v.nombre.$error }">
                    <label class="float-left" for="nombre">Nombre</label>
                    <input type="text" class="form-control" aria-describedby="nombre" v-model.trim="$v.nombre.$model" />
                    <div v-if="$v.nombre.$error && formSubmitted">
                        <small class="d-block text-left text-danger" v-if="!$v.nombre.required">Debes ingresar el nombre</small>
                    </div>
                </div>
                <!-- Documento -->
                <p class="d-block text-left">Documento</p>
                <div class="form-group" :class="{ 'form-group--error': $v.documento.$error }">
                    <div class="d-flex">
                        <div class="input-group" style="width: auto;">
                            <div class="input-group-prepend">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label class="btn" :class="{'btn-primary': (documento.tipo == 'dni')}" style="border: #ced4da 1px solid">
                                        <input type="radio" autocomplete="off" @click="documento.tipo = 'dni'"> DNI
                                    </label>
                                    <label class="btn" :class="{'btn-primary': (documento.tipo == 'cuit')}" style="border: #ced4da 1px solid">
                                        <input type="radio" autocomplete="off" @click="documento.tipo = 'cuit'"> CUIT
                                    </label>
                                </div>
                            </div>
                        </div>
                        <the-mask  class="form-control" :mask="(documento.tipo == 'cuit') ? '##-########-#' : '########'" v-model="documento.numero" />
                    </div>
                    <div v-if="$v.documento.$error && formSubmitted">
                        <small class="d-block text-left text-danger" v-if="!$v.documento.tipo.required">Debes ingresar el tipo de documento</small>
                        <small class="d-block text-left text-danger" v-if="!$v.documento.numero.required && documento.tipo !== ''">Debes ingresar el número de {{documento.tipo.toUpperCase()}}</small>
                        <small class="d-block text-left text-danger" v-if="!$v.documento.numero.minLength && documento.tipo !== ''">El {{documento.tipo.toUpperCase()}} debe tener {{$v.documento.numero.$params.minLength.min}} números</small>
                    </div>
                </div>
                <!-- Razon social -->
                <div class="form-group" :class="{ 'form-group--error': $v.razonSocial.$error }" v-if="documento.tipo == 'cuit'">
                    <label class="float-left" for="razonSocial">Razón social</label>
                    <input type="text" class="form-control" aria-describedby="razonSocial" v-model.trim="$v.razonSocial.$model" />
                    <div v-if="$v.razonSocial.$error && formSubmitted">
                        <small class="d-block text-left text-danger" v-if="!$v.razonSocial.required">Debes ingresar la razón social</small>
                    </div>
                </div>
                <!-- Direccion facturacion -->
                <div class="form-group" :class="{ 'form-group--error': $v.direccionFacturacion.$error }" v-if="documento.tipo == 'cuit'">
                    <label class="float-left" for="direccionFacturacion">Dirección de facturación</label>
                    <input type="text" class="form-control" aria-describedby="direccionFacturacion" v-model.trim="$v.direccionFacturacion.$model" />
                    <div v-if="$v.direccionFacturacion.$error && formSubmitted">
                        <small class="d-block text-left text-danger" v-if="!$v.direccionFacturacion.required">Debes ingresar la dirección de facturación</small>
                    </div>
                </div>
                <!-- Direccion entrega -->
                <div class="form-group" :class="{ 'form-group--error': $v.direccionEntrega.$error }">
                    <label class="float-left" for="direccionEntrega">Dirección de entrega</label>
                    <div class="input-group">
                        <input type="text" class="form-control" aria-describedby="direccionEntrega" v-model.trim="$v.direccionEntrega.$model" 
                            :readonly="copiarDireccionEntrega"
                        />
                        <div class="input-group-append" v-if="documento.tipo == 'cuit'">
                            <button class="btn" :class="[copiarDireccionEntrega ? 'btn-secondary' : 'btn-light']" style="border: 1px solid #ced4da;border-left: 0;"
                                @click.prevent="copiarDireccionEntrega = !copiarDireccionEntrega">Copiar</button>
                        </div>
                    </div>
                    <div v-if="$v.direccionEntrega.$error && formSubmitted">
                        <small class="d-block text-left text-danger" v-if="!$v.direccionEntrega.required">Debes ingresar la dirección de entrega</small>
                    </div>
                </div>
                <!-- Localidad -->
                <div class="form-group" :class="{ 'form-group--error': $v.localidad.$error }">
                    <label class="float-left" for="localidad">Localidad</label>
                    <multiselect aria-describedby="localidad" v-model="localidad" :options="sortedLocalidades" :showLabels="false" placeholder="" :showNoResults="false"></multiselect>
                    <div v-if="$v.localidad.$error && formSubmitted">
                        <small class="d-block text-left text-danger" v-if="!$v.localidad.required">Debes seleciconar la localidad</small>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import localidades from '../api/localidades.json'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Checkout',
    data() {
        return {
            nombre: '',
            documento: {
                tipo: '',
                numero: ''
            },
            razonSocial: '',
            direccionFacturacion: '',
            direccionEntrega: '',
            copiarDireccionEntrega: false,
            localidad: '',
            localidades: localidades,
            formSubmitted: false
        }
    },
    methods: {
        selectedDocumento(documento) {
            console.log(documento)
        },
        localidadTiempoEntrega() {
            let zona = this.localidades.find((loc) => loc.nombre == this.localidad).zona
            switch (zona){
                case 1:
                    return "Tu pedido será entregado dentro de las próximas 48hs."
                case 2:
                    return "Tu pedido será entregado el Jueves."
                case 3:
                    return "Tu pedido será entregado el Sábado."
                case 4:
                    return "Nos contactaremos con vos para informarte la fecha de entrega."
                default:
                    return "Nos contactaremos con vos para informarte la fecha de entrega."
            }
        },
        submit() {
            this.formSubmitted = true
            this.$v.$touch()
            if (this.$v.$invalid) {
                return;
            } else {
                let text = '<b>'+this.localidadTiempoEntrega()+'</b><br><br>Si corresponde, las entregas se realizarán de un día para el otro siempre y cuando el pedido haya ingresado antes de las 16hs.'
                this.$confirm(text, "", "warning", {confirmButtonText: 'De acuerdo', cancelButtonText: 'Cancelar', html: text}).then(() => {
                    this.axios.post("https://server.hotspotmedia.com.ar/alpa/carrito/gracias.php", this.cart)
                    .then(response => {
                    if(response.data.estado == "ok")
                    {
                        this.clearCart()
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
            }
        },
        ...mapActions('cart', [
            'clearCart',
        ])
    },
    computed: {
        sortedLocalidades: function() {
            let sorted = this.localidades
            return sorted.sort(function(a,b) {
                return -(a.nombre < b.nombre) || +(a.nombre > b.nombre)
            }).map((localidad)=>localidad.nombre)
        },
        ...mapState({
            cart: state => state.cart.items
        }),
    },
    watch: {
        copiarDireccionEntrega: function(val) {
            if (val)
                this.direccionEntrega = this.direccionFacturacion
            else
                this.direccionEntrega = ''
        },
        direccionFacturacion: function(val) {
            if (this.copiarDireccionEntrega)
                this.direccionEntrega = val
        },
        'documento.tipo': function(val) {
            if(val == 'dni' && this.copiarDireccionEntrega)
                this.copiarDireccionEntrega = false

        },
        localidad: function() {
            console.log(this.localidadTiempoEntrega())
        }
    },
    validations() {
        if (this.documento.tipo == 'cuit') {
            return {
                nombre: {
                    required,
                },
                documento: {
                    tipo: {
                        required,
                    },
                    numero: {
                        required,
                        minLength: minLength(11)
                    }
                },
                razonSocial: {
                    required
                },
                direccionFacturacion: {
                    required
                },
                direccionEntrega: {
                    required
                },
                localidad: {
                    required
                }
            }
        } else {
            return {
                nombre: {
                    required,
                },
                documento: {
                    tipo: {
                        required,
                    },
                    numero: {
                        required,
                        minLength: minLength(8)
                    }
                },
                direccionEntrega: {
                    required
                },
                localidad: {
                    required
                }
            }
        }
    }
}
</script>

<style scoped>

.checkout {
    padding-top: 70px;
}

.btn-primary {
    color: white;
}
/* .form-group--error .form-control {
    border: #dc3545 1px solid;
} */

</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect {
    display: flow-root;
}
.multiselect__option--highlight, .multiselect__option--selected, .multiselect__option--selected.multiselect__option--highlight {
  background: #007bff;
  outline: none;
  color: white;
}
</style>