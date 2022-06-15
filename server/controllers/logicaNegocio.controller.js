var config = require('./../.././config/dbconfig');
const sql = require('mssql');
const { request } = require('express');
var utilidades = require('./../.././config/utilidades');
var controladorProductoSaliente = require('./movimientoProductoSaliente.controller');
var controladorFactura = require('./facturas.controller');
var controladorItem = require('./itemVentas.controller');
var controladorMonedaEntrante = require('./movimientoMontoEntrante.controller');

async function obtenerAlicuota(){
    return utilidades.valorAlicuota();
}
async function obtenerMnotoIIBB(alicuota, monto){
    try {
        return parseFloat(alicuota) * parseFloat(monto);
    } catch (error) {
        console.log("No se pudo realizar la operacion. Eror: "+error)
    }
    return 0;
}

async function registrarFactura(baseImponible, idContribuyente, recnoMontoProductoSaliente){
    try {
        let pool = await sql.connect(config);
        const transaction = new sql.Transaction(pool)
        //id y recno desde la base de datos
        var recnoFV, recnoIv, recnoMme, idFv, idMme, idIv;
        recnoFV = await controladorFactura.getLastRecno();
        recnoIv = await controladorItem.getLastRecno();
        recnoMme = await controladorMonedaEntrante.getLastRecno();
        idFv = await controladorFactura.getLastID();
        idMme = await controladorMonedaEntrante.getLastID()
        idIv = await controladorItem.getLastID()
        transaction.begin(err => {
            const request = new sql.Request(transaction)
            //armado de la consulta
            request.input('_NServicio',sql.NVarChar,utilidades.nombreServicio())
            request.input('_CFactura',sql.NVarChar,utilidades.conceptoFactura())
            request.input('_CItem',sql.NVarChar,utilidades.conceptoItem())
            request.input('_VAlicuota',sql.Numeric(13,6),utilidades.valorAlicuota())//parcearFecha
            request.input('_FSistema',sql.NVarChar,utilidades.fechaConFormato())
            request.input('_BImponible',sql.Numeric(13,6),baseImponible)
            request.input('_IDContribuyente',sql.NVarChar,idContribuyente)
            request.input('_RFv',sql.Numeric,recnoFV)
            request.input('_RIv',sql.Numeric,recnoIv)
            request.input('_RMme',sql.Numeric,recnoMme)
            request.input('_RMps',sql.Numeric,recnoMontoProductoSaliente)
            request.input('_IDfv',sql.Numeric,idFv)
            request.input('_IDmme',sql.Numeric,idMme)
            request.input('_IDiv',sql.Numeric,idIv)
            request.query(
                //variables del proceso
            `USE [PCBD700LaMarca]
            declare 
                @alicuota Numeric(13,6),
                @base_imponible Numeric(13,6),
                @nombre_servicio varchar(10),
                @concepto_item varchar(10),
                @concepto_factura varchar(10),
                @id_contribuyente varchar(13),
                @fecha_sistema varchar(14),
                @recno_fv numeric(10, 0),
                @recno_iv numeric(10, 0),
                @recno_mme numeric(10, 0),
                @recno_mps numeric(10, 0),
                @id_fv  numeric(13, 0),
                @id_mme numeric(13, 0),
                @id_iv numeric(13, 0);
            SET @nombre_servicio = @_NServicio;
            SET @concepto_factura = @_CFactura;
            SET @concepto_item = @_CItem;
            SET @alicuota = CAST(@_VAlicuota as FLOAT);
            SET @fecha_sistema = @_FSistema;
            SET @base_imponible = @_BImponible;
            SET @id_contribuyente = @_IDContribuyente;
            SET @recno_fv = @_RFv;
            SET @recno_iv = @_RIv;
            SET @recno_mme = @_RMme;
            SET @recno_mps = @_RMps;
            SET @id_fv = @_IDfv;
            SET @id_mme = @_IDmme;
            SET @id_iv = @_IDiv;` +
            /*debug de las variables
            `SELECT 	
                @alicuota AS [alicuota],
                @base_imponible AS [base imponible], 
                @nombre_servicio  AS [nombre servicio],
                @concepto_item  AS [concepto item],
                @concepto_factura  AS [concepto factura],
                @id_contribuyente  AS [id contribuyente],
                @fecha_sistema  AS [fecha sistema],
                @recno_fv AS [recno factura],
                @recno_iv AS [recno item],
                @recno_mme AS [recno movimiento],
                @recno_mps AS [id producto],
                @id_fv AS [id factura],
                @id_mme AS [id movimiento],
                @id_iv AS [id item];`+
            //alta de fv
            */
            `  insert into fv([RECNO],[IS_DELETED],[FVID],[FVUME],[FVTS],[FVEF],[FVQP],[FVQM]) 
            values(
            @recno_fv,'N' ,@id_fv, @id_contribuyente,@fecha_sistema,@nombre_servicio,@base_imponible,(@base_imponible * @alicuota)
            );`+
            //alta de iv
            `  insert into iv([RECNO],[IS_DELETED],[IVID],[IVPR],[IVFV],[IVUME],[IVTS],[IVRF],[IVQP],[IVQMEX],[IVQM],[IVDMR]) 
            values (
              @recno_iv, 'N', @id_iv, @concepto_item, @id_fv, @id_contribuyente, @fecha_sistema, @concepto_item, @base_imponible, @alicuota, (@base_imponible * @alicuota), @nombre_servicio
            )`+
            //alta mme
            `INSERT INTO MME(   [RECNO],[IS_DELETED] , [MMEUME] ,[MMEHOTY] ,[MMEHOID] ,[MMEHCTY] ,[MMEFV] ,[MMEFR] ,[MMEQM] ,[MMEDMR] ,[MMEID] )
            values(
                @recno_mme  ,
                'N' ,
                @_IDContribuyente  ,
                @concepto_factura   ,
                @id_fv  ,
                @concepto_factura  ,
                @fecha_sistema,
                '',
                (@base_imponible * @alicuota),
                @nombre_servicio ,
                @id_mme
            );`+
            //update mps
            `UPDATE MPS 
            SET MPSIV = @id_iv,
            MPSHOID = @id_fv,
            MPSHCID =  @id_fv,
            MPSFR = @fecha_sistema , 
            MPSQP = @base_imponible, 
            MPSDMR = @nombre_servicio 
            WHERE [RECNO] = @recno_mps;`
            ,async (err, result) => {
                try {
                    //se cierra el commit
                    await transaction.commit(err => {
                        console.log("Transaccion terminada con exito.")
                    })
                    pool.close()
                } catch (error) {
                    console.log("Error no detectable en la transaccion."+error)
                    //rollback
                    await transaction.rollback(err => {
                        console.log("Se hizo un rollback de la transaccion. "+ err)
                    })
                }
            })
            
            
        })

        
                       
    } catch (error) {
        console.log("Error en la insercion de datos: " + error);
    }
}
module.exports = {
    registrarFactura: registrarFactura,
    obtenerAlicuota: obtenerAlicuota,
    obtenerMnotoIIBB: obtenerMnotoIIBB
}
