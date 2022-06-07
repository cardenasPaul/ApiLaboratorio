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
        <v-row>
        <v-col cols="4">
            <form v-on:submit.prevent="obtenerClientePorCUIT(cuit)">
                <v-subheader dark="true">Ingrese el CUIT del Contribuyente</v-subheader>
                <v-text-field 
                    v-model="cuit"
                    type="number"
                    width="350"
                    label="CUIT"
                    outlined
                    required
                    counter="11"
                >
                </v-text-field>                         
                <v-card-actions>
                    <v-btn v-on:click.stop="obtenerClientePorCUIT(cuit)"  color="primary" class="mr-4" type="submit">Consultar</v-btn>      
                </v-card-actions>
            </form>              
    </v-col>
    </v-row>      
            <!-- componente snackbar para mostrar mensaje de validacion de CUIT -->
    <v-snackbar v-model="snackbar" color="orange accent-2"> {{textsnack}}
        <template v-slot:action="{attrs}">
            <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
        </template>
    </v-snackbar>  
    </v-container>     
</template>
<script>
import axios from 'axios';
export default {
    name: 'inicio-item',    
    props: {
        idContribuyente:String,
        razonSocial:String,
        domicilio:String,
        telefono:String
    },
    data(){
        return{
            cuit:null,      
            snackbar:false,
            textsnack:'¡No existen contribuyentes para el CUIT ingresado!',      
            props:{
                idContribuyente:'',
                razonSocial:'',
                domicilio:'',
                telefono:'',
                cuit:''
            }
        };
    },
    methods:{
        obtenerClientePorCUIT(cuit){       

           var url = 'http://localhost:8090/api/contribuyentes/'+cuit;
           console.log(url)
           axios.get(url)
          .then(r => {
                //this.contribuyente = r.data;
                if(!Object.keys(r.data).length){
                    this.snackbar = true
                    console.log("No hay contribuyentes registrados con ese CUIT");
                }
                else{
                    console.log(r.data[0].UMEID);                    
                    this.props.idContribuyente =  r.data[0].UMEID
                    this.props.razonSocial = r.data[0].UMENM
                    this.props.domicilio = r.data[0].UMEDI
                    this.props.telefono = r.data[0].UMETE
                    this.props.cuit = r.data[0].UMECU
                   // Con el nombre de la ruta
                    this.$router.push({ name: 'listarIIBB',
                    params: {id:this.props.idContribuyente
                    ,razonSocial:this.props.razonSocial
                    , domicilio:this.props.domicilio
                    , telefono: this.props.telefono,
                    cuit: this.props.cuit,
                    } })
                }
                
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
}
</script>