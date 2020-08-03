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
                            <the-mask  class="form-control" :mask="(documento.tipo == 'cuit') ? '##-########-#' : '########'" v-model="documento.numero" style="border-top-left-radius: 0;border-bottom-left-radius: 0;" />
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
                        <!-- <input type="text" class="form-control" aria-describedby="direccionFacturacion" v-model.trim="$v.direccionFacturacion.$model" /> -->
                        <multiselect aria-describedby="direccionFacturacion" v-model="direccionFacturacion" :options="direcciones" :showLabels="false"
                            placeholder="" :showNoResults="false" :searchable="false">
                            <template slot="singleLabel" slot-scope="props">
                                <div class="option__desc" v-if="!props.option.adminDirecciones"><span class="option__title">{{ props.option.direccionLinea1 }}</span><span class="option__small" style="font-size: 10pt;">&nbsp;<span class="text-muted">{{ props.option.direccionLinea2 }}</span><br><span class="text-muted">{{ props.option.direccionLinea3 }}</span></span></div>
                            </template>
                            <template slot="option" slot-scope="props">
                                <div class="option__desc" v-if="!props.option.adminDirecciones"><span class="option__title">{{ props.option.direccionLinea1 }}</span><span class="option__small" style="font-size: 10pt;">&nbsp;<span class="text-white">{{ props.option.direccionLinea2 }}</span><br><span>{{ props.option.direccionLinea3 }}</span></span></div>
                            </template>
                            <template slot="afterList">
                                <div class="option__desc pt-1 pb-1" style="text-align: center; font-size: 10pt;" @click="showAdminDireccionesModal('direccionFacturacion')"><span class="option__title">Agregar / Eliminar</span></div>
                            </template>
                            <span slot="noOptions">No tienes direcciones registradas</span>
                        </multiselect>
                        <div v-if="$v.direccionFacturacion.$error && formSubmitted">
                            <small class="d-block text-left text-danger" v-if="!$v.direccionFacturacion.required">Debes ingresar la dirección de facturación</small>
                        </div>
                    </div>
                    <!-- Direccion entrega -->
                    <div class="form-group" :class="{ 'form-group--error': $v.direccionEntrega.$error }">
                        <label class="float-left" for="direccionEntrega">Dirección de entrega</label>
                        <div class="input-group">
                            <multiselect aria-describedby="direccionEntrega" v-model="direccionEntrega" :options="direcciones" :showLabels="false"
                                placeholder="" :showNoResults="false" :searchable="false">
                                <template slot="singleLabel" slot-scope="props">
                                    <div class="option__desc" v-if="!props.option.adminDirecciones"><span class="option__title">{{ props.option.direccionLinea1 }}</span><span class="option__small" style="font-size: 10pt;">&nbsp;<span class="text-muted">{{ props.option.direccionLinea2 }}</span><br><span class="text-muted">{{ props.option.direccionLinea3 }}</span></span></div>
                                </template>
                                <template slot="option" slot-scope="props">
                                    <div class="option__desc" v-if="!props.option.adminDirecciones"><span class="option__title">{{ props.option.direccionLinea1 }}</span><span class="option__small" style="font-size: 10pt;">&nbsp;<span class="text-white">{{ props.option.direccionLinea2 }}</span><br><span>{{ props.option.direccionLinea3 }}</span></span></div>
                                </template>
                                <template slot="afterList">
                                    <div class="option__desc pt-1 pb-1" style="text-align: center; font-size: 10pt;" @click="showAdminDireccionesModal('direccionEntrega')"><span class="option__title">Agregar / Eliminar</span></div>
                                </template>
                                <span slot="noOptions">No tienes direcciones registradas</span>
                            </multiselect>
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

                    <hr style="margin-top: 30px;margin-bottom: 25px;" />
                    <!-- Envio sin stock? -->
                    <div class="form-group">
                        <p style="font-size: 10pt;">En el caso de que no tengamos stock de la totalidad del pedido, te lo entregamos igual?</p>
                        <!-- <small>En el caso de que no tengamos stock de la totalidad del pedido, te lo entregamos igual?</small> -->
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-sm" :class="{'btn-primary': (envioSinStock == 'SI')}" style="border: #ced4da 1px solid">
                                <input type="radio" autocomplete="off" @click="envioSinStock = 'SI'"> SI
                            </label>
                            <label class="btn btn-sm" :class="{'btn-primary': (envioSinStock == 'NO')}" style="border: #ced4da 1px solid">
                                <input type="radio" autocomplete="off" @click="envioSinStock = 'NO'"> NO
                            </label>
                        </div>
                        <div v-if="$v.envioSinStock.$error && formSubmitted">
                            <small class="d-block text-left text-danger" v-if="!$v.envioSinStock.required">Debes elegir una opción</small>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary mt-3" v-if="!sending">
                        <font-awesome-icon :icon="['fab', 'telegram-plane']" size="lg"></font-awesome-icon>
                        <span style="font-weight: 600;margin-left: 10px;">Enviar</span>    
                    </button>
                    <button type="button" class="btn btn-primary mt-3 disabled" v-else disabled>
                        <font-awesome-icon icon="sync-alt" spin size="lg"></font-awesome-icon>
                        <span style="font-weight: 600;margin-left: 10px;">Enviando... </span>    
                    </button>
                </form>
            </div>

            <div class="col-12 mt-5 mb-5">
                <a target="_blank" href="http://www.hotspotmedia.com.ar" style="text-decoration: none; color: #2c3e50;">
                    <span>Desarrollado por </span><img src="../assets/hotspot-logo.png" style="height: 35px; margin-top: -11px;" />
                </a>
            </div>
        </div>



        <modal name="admin-direcciones" :adaptive=true :max-width="300" width="80%" height="auto" styles="padding: 15px;" @closed="boolAgregarDireccion = false">

            <h6>MIS DIRECCIONES</h6>

            <div v-if="boolAgregarDireccion">
                <p>Nueva dirección</p>
                <div class="form-group"><input type="text" class="form-control text-center" v-model="newDireccion.direccionLinea1" placeholder="Calle y número" required /></div>
                <div class="form-group"><input type="text" class="form-control text-center" v-model="newDireccion.direccionLinea2" placeholder="Local, piso y/o Dto." /></div>
                <div class="form-group"><input type="text" class="form-control text-center" v-model="newDireccion.direccionLinea3" placeholder="Entre calles" /></div>
                <div class="form-group"><input type="text" class="form-control text-center" v-model="newDireccion.codigoPostal" placeholder="Código postal" /></div>
                <div class="form-group"><button class="btn btn-primary mt-2" @click="agregarDireccion">Agregar</button></div>
            </div>
            <div v-else>
                <button class="btn btn-outline-primary btn-sm mt-3" @click="boolAgregarDireccion = true" v-if="direcciones.length <=1">Nueva dirección</button>
                <ul class="list-group mt-4" style="line-height: 1;">
                    <li class="list-group-item" v-for="(direccion, i) in direcciones" :key="i" @click="eliminarDireccion(i)">
                        {{direccion.direccionLinea1}} <font-awesome-icon icon="trash" class="float-right"></font-awesome-icon>
                    </li>
                </ul>
            </div>
        </modal>
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
            direcciones: [],
            newDireccion: {
                direccionLinea1: '',
                direccionLinea2: '',
                direccionLinea3: '',
                codigoPostal: '',
            },
            copiarDireccionEntrega: false,
            localidad: '',
            localidades: localidades,
            envioSinStock: '',
            formSubmitted: false,
            boolAgregarDireccion: false,
            sending: false,
            campoDireccionAgregando: '',
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
                let text = '<b>'+this.localidadTiempoEntrega()+'</b><br><br>Si corresponde, las entregas se realizarán de un día para el otro siempre y cuando el pedido haya ingresado antes de las 16hs.<br><br>Si su pedido es inferior a $1000, se le cobrará un adicional de $80 por el envío.'
                let formData = {
                    'carrito': this.cart,
                    'nombre': this.nombre,
                    'documento': this.documento,
                    'razon_social': this.razonSocial,
                    'direccion_facturacion': this.direccionFacturacion,
                    'direccion_entrega': this.direccionEntrega,
                    'localidad': this.localidad,
                    'envio_sin_stock': this.envioSinStock
                }
                this.$confirm(text, "", "warning", {confirmButtonText: 'De acuerdo', cancelButtonText: 'Cancelar', html: text}).then(() => {
                    this.sending = true
                    this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                    this.axios.post("https://server.hotspotmedia.com.ar/alpa/carrito/gracias.php", formData, { withCredentials: true } )
                    .then(response => {
                    if(response.data.estado == "ok")
                    {
                        this.clearCart()
                        this.sending = false
                        this.$alert("Su pedido fue enviado correctamente!", "Éxito", "success")
                        .then(() => window.location = "https://wa.me/5491156435252");
                    }
                    else
                    {
                        this.sending = false
                        this.$alert("Ha ocurrido un error, intente nuevamente.", "Error", "warning");
                    }
                    })
                    .catch(() => { 
                        this.sending = false
                        this.$alert("Ha ocurrido un error, intente nuevamente.", "Error", "warning");
                     });
                }).catch((e) => { return e });  
            }
        },
        showAdminDireccionesModal(campoDireccion) {
            this.campoDireccionAgregando = campoDireccion
            this.$modal.show('admin-direcciones')
        },
        agregarDireccion() {
            //AGREGAR EN EL SERVIDOR
            this.direcciones.push({
                direccionLinea1: this.newDireccion.direccionLinea1,
                direccionLinea2: this.newDireccion.direccionLinea2,
                direccionLinea3: this.newDireccion.direccionLinea3,
                codigoPostal: this.newDireccion.codigoPostal,
            })
            this[this.campoDireccionAgregando] = this.newDireccion
            this.newDireccion = {
                direccionLinea1: '',
                direccionLinea2: '',
                direccionLinea3: '',
                codigoPostal: ''
            }
            this.boolAgregarDireccion = false
            this.$modal.hide('admin-direcciones')
        },
        eliminarDireccion(i) {
            //ELIMINAR EN EL SERVIDOR
            this.direcciones.splice(i,1)
        },
        consoleLog(v) { 
            console.log(v)
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
                },
                envioSinStock: {
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
                },
                envioSinStock: {
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

.multiselect__tags {
    border: #ced4da 1px solid;
}

.multiselect__option--highlight, .multiselect__option--selected, .multiselect__option--selected.multiselect__option--highlight {
  background: #007bff;
  outline: none;
  color: white;
}
</style>