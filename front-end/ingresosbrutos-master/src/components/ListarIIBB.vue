/* eslint-disable */
<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="2">
                <v-img :src="require('../assets/logo_baseTVN.png')" class="my-3" contain height="100"/>
            </v-col>
            <v-col class="mb-4">
                <h2 class="display-1 font-weight-bold mb-2 blue--text text--lighten-1">Declaracion de Ingresos Brutos</h2>
            </v-col>
        </v-row>       
            <v-form>
                <v-row>
                <v-subheader>Informacion del Contribuyente</v-subheader>
                </v-row>
                <v-row>
                <v-col
                cols="12"
                sm="12"
                md="12">
                <v-text-field 
                    v-model="this.razonSocial"
                    label="Razon Social"
                    readonly
                 
                >
                </v-text-field>                         
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="9"
                >
                <v-text-field 
                    v-model="this.domicilio"
                    label="Dirección"
                    readonly
                 
                >
                </v-text-field>                         
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field 
                    v-model="this.telefono"
                    label="Contacto"
                    readonly
                 
                >
                </v-text-field>                                         
                </v-col>
                </v-row>
            </v-form>
            <v-card class="mx-auto mt-5" max-width="1200">        
                <v-data-table
                    :headers="columnas"
                    :items="movprodsalientes"
                    class="elevation-19"
                    :items-per-page="12"
                    :footer-props="{
                        'items-per-page-options': [12]
                    }" 
                    
                >   // ACA SE DECLARAN LAS FUNCIONES DE FORMATEO DE FECHAS
                    <template v-slot:[`item.FECHA_VENC`]="{ item }">
                        <span>{{ formatearFecha(item.FECHA_VENC)}}</span>
                    </template>
                    <template v-slot:[`item.FECHA_DECLARACION`]="{ item }">
                        <span>{{ formatearFechaConHora(item.FECHA_DECLARACION)}}</span>
                    </template>
                    <template v-slot:[`item.FECHA_PAGO`]="{ item }">
                        <span>{{ formatearFechaConHora(item.FECHA_PAGO)}}</span>
                    </template>
                    
                    // ACA SE DEFINE EL TEXTFIELD PARA EDICION DE BASE IMPONIBLE
                    <template v-slot:[`item.BASE_IMPONIBLE`]="{ item }">
                        <v-text-field v-on:blur="calcularIIBB(editedItem.BASE_IMPONIBLE,item)" v-model="editedItem.BASE_IMPONIBLE" :hide-details="true" dense single-line :autofocus="true" v-if="item.RECNO === editedItem.RECNO"></v-text-field>
                        <span v-else>{{item.BASE_IMPONIBLE}}</span>
                    </template>   
                    // ACA SE DEFINEN LOS BOTONES DE ACCION DE LA TABLA                 
                    <template v-slot:[`item.actions`]="{ item }">
                        <div v-if="item.RECNO === editedItem.RECNO">
                            <v-icon color="red" class="mr-3" @click="close">
                                mdi-window-close
                            </v-icon>
                            <v-icon color="green"  @click="save">
                                mdi-content-save
                            </v-icon>
                        </div>
                        <div v-else>
                            <v-icon v-if="item.Seleccionado == true && formatearMes(item.FECHA_VENC) < formatearMes(new Date().toLocaleDateString())" color="green" class="mr-3" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>                            
                        </div>
                        <!--  -->
                    </template>
                </v-data-table>
            </v-card>
            <!-- componente snackbar para mostrar mensaje de DDJJ Exitosa -->
            <v-snackbar v-model="snackbar" color="green accent-4"> {{textsnack}}
                <template v-slot:action="{attrs}">
                    <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
                </template>
            </v-snackbar>  
        </v-container>        
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name: 'listarIIBB-item',
    contribuyente: {
        razonSocial: String,
        domicilio: String,
        telefono: String
    },
methods: {    
// METODO DE CARGA DE LA GRILLA
    async obtenerIIBBContribuyente()
    {
        this.id = this.$route.params.id;  
        var url = 'http://localhost:8090/api/ingresosbrutos/'+ this.id;
        var ultimaFecha = null;
        axios.get(url).then((respuesta)=>{
            this.movprodsalientes  = respuesta.data;   
            respuesta.data.forEach(function(item) {
                if(item.IMPORTE_IIBB == null && ultimaFecha == null){
                    console.log("localizada..."+ item.FECHA_VENC)
                    ultimaFecha = item.FECHA_VENC;
                    this.lastDate = item.FECHA_VENC;
                }
            }); 
        });
        return ultimaFecha;

    },
    // METODOS DE FORMATEO DE FECHA
    formatearFecha(fecha) {
        if (moment(fecha).isValid())
        {
            fecha = moment(fecha).add(1,"d")
            return moment(fecha).format("DD/MM/YYYY")
        }
    },
    formatearFechaConHora(fecha) {
        if (moment(fecha).isValid())
        {
            fecha = moment(fecha).add(1,"d")
            return moment(fecha).format("DD/MM/YYYY hh:mm")
        }
    },
        formatearMes(fecha) {
        if (moment(fecha).isValid())
        {
            fecha = moment(fecha).add(1,"d")
            return moment(fecha).format("MM")
        }
    },
    // METODO DE REDONDEO DE DECIMALES PARA GRILLA
    redondeo2decimales(num, decimales = 2) {
        var signo = (num >= 0 ? 1 : -1);
        num = num * signo;
        if (decimales === 0) //con 0 decimales
            return signo * Math.round(num);
        // round(x * 10 ^ decimales)
        num = num.toString().split('e');
        num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
        // x * 10 ^ (-decimales)
        num = num.toString().split('e');
        return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
    },
     // METODOS DE EDICION DE BASE IMPONIBLE EN LA TABLA
     editItem (item) {
      this.editedIndex = this.movprodsalientes.indexOf(item);
      this.editedItem = Object.assign({}, item);      
    },
    
    close () {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        try{
            var url = 'http://localhost:8090/api/altaFactura?baseImponible='+this.editedItem.BASE_IMPONIBLE+'&idContribuyente='+this.id+'&recnoMontoProductoSaliente='+this.editedItem.RECNO;
            let respuesta = axios.put(url).then()
            if (respuesta.status === 201)
            {
                console.log(respuesta.status);
                this.snackbar = true;
                this.id = this.$route.params.id;  
                var urli = 'http://localhost:8090/api/ingresosbrutos/'+ this.id;
                var datos = axios.get(urli)
                this.movprodsalientes  = datos.data;   
                //this.obtenerIIBBContribuyente();
                //this.$forceUpdate()
            }

            
            
        }catch(error){
            console.log(error);
        }
        //Object.assign(this.movprodsalientes[this.editedIndex], this.editedItem)
      }
      this.close()
    },
    obtenerAlicuota() {
        var url = 'http://localhost:8090/api/alicuota/';
        
        axios.get(url).then(response =>{            
            this.alicuota = response.data.alicuota;                      
        });        
    },
    async obtenerImporteIIBB(baseImp) {
        try{
            var url = 'http://localhost:8090/api/calcularMontoIIBB?alicuota='+this.alicuota+'&monto='+baseImp
            let respuesta = await axios.get(url);
            this.importeIIBB  = respuesta.data.monto; 
            this.editedItem.IMPORTE_IIBB =  this.redondeo2decimales(this.importeIIBB);
            Object.assign(this.movprodsalientes[this.editedIndex], this.editedItem);
        } catch(error) {
            console.log(error);
        }
    },
    calcularIIBB(baseImp,item)
    {
        if (baseImp > 0 )
        {
            this.obtenerImporteIIBB(baseImp);
            this.editedIndex = this.movprodsalientes.indexOf(item);              
            this.editedItem.ALICUOTA = this.alicuota;
        }
    },
    async buscarDatosContribuyente()
    {
        try{
            var url = 'http://localhost:8090/api/contribuyentes/'+this.$route.params.cuit;
            console.log(url)
            await axios.get(url).then(response =>{
                this.razonSocial = response.data[0].UMENM
                this.domicilio = response.data[0].UMEDI
                this.telefono = response.data[0].UMETE
            })
        } catch(error) {
            console.log(error);
        }
    }
},
async created(){       
        this.obtenerIIBBContribuyente();
        this.obtenerAlicuota();
        this.buscarDatosContribuyente();
},
mounted(){
    console.log("eso")
this.obtenerIIBBContribuyente();
},
data(){        
          return{ 
            columnas: [
                    { text: 'RECNO', value: 'RECNO', align: ' d-none', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'PERIODO', value: 'PERIODO', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'FECHA VENCIMIENTO', value: 'FECHA_VENC',  class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'BASE IMPONIBLE', value: 'BASE_IMPONIBLE', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'ALICUOTA', value: 'ALICUOTA', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'IMPORTE IIBB', value: 'IMPORTE_IIBB', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'FECHA DECLARACION', value: 'FECHA_DECLARACION', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'ID FACTURA', value: 'ID_FACTURA', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'FECHA PAGO', value: 'FECHA_PAGO', class: 'light-blue darken-4 white--text', sortable: false},
                    { text: 'ACCIONES', value: 'actions', class: 'light-blue darken-4 white--text', sortable: false , width: "100px"},
                    { text: 'Seleccionado', value: 'Seleccionado', align: ' d-none', class: 'light-blue darken-4 white--text', sortable: false},
               ],  
               razonSocial:'',
               domicilio:'',
               telefono:'',
               snackbar:false,
               textsnack:'¡La declaracion de Ingresos Brutos ha sido exitosa!',      
               alicuota: '',
               importeIIBB:'',             
               movprodsalientes: [],
               editedIndex: -1,
               ultimaFecha:null,
                editedItem: {
                    RECNO: 0,
                    PERIODO: '',
                    FECHA_VENC: '',
                    BASE_IMPONIBLE:0,
                    ALICUOTA: 0,
                    IMPORTE_IIBB: 0,
                    FECHA_DECLARACION:'',
                    ID_FACTURA: 0,
                    FECHA_PAGO: '',
                    Seleccionado:false
                },
                defaultItem: {
                    RECNO: 0,
                    PERIODO: '',
                    FECHA_VENC: '',
                    BASE_IMPONIBLE:0,
                    ALICUOTA: 0,
                    IMPORTE_IIBB: 0,
                    FECHA_DECLARACION:'',
                    ID_FACTURA: 0,
                    FECHA_PAGO: '',
                    Seleccionado:false
              },   
          
          }
          
    }
}
</script>