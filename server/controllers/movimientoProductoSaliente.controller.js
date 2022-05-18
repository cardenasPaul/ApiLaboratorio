var config = require('./../.././config/dbconfig');
const sql = require('mssql');
const { request } = require('express');

async function getMovimientoProductoSaliente(){
    try {
        let pool = await sql.connect(config);
        let producto = await pool.request().query("SELECT * FROM MPS");
        return producto.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getMovimientoProductoSalienteById(idProducto){
    try {
        let pool = await sql.connect(config);
        let producto = await pool.request()
        .input('input_parameter',sql.VarChar, idProducto)
        .query("SELECT * FROM MPS where MPSIV = @input_parameter");
        return producto.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updateById( recno, baseImponible, fechaDeclaracion, cabeceraOriginante){
    try {
        let pool = await sql.connect(config);
        let producto = await pool.request()
        .input('baseImponible',sql.Numeric, baseImponible)
        .input('fechaDeclaracion',sql.VarChar, fechaDeclaracion)
        .input('cabeceraOriginante',sql.VarChar, cabeceraOriginante)
        .input('recno',sql.VarChar, recno)
        .query(`UPDATE MPS
        SET MPSFR = @fechaDeclaracion, MPSQP = @baseImponible, MPSHOID = @cabeceraOriginante
        WHER RECNO = @recno;`);
        return producto.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addMovimientoProductoSaliente(movimiento){
    try {
        let pool = await sql.connect(config);
        let insertMovimientoProducto = await pool.request()
        insertMovimientoProducto.input('Recno', sql.NVarChar, movimiento.Recno);
        insertMovimientoProducto.input('Is_deleted', sql.NVarChar, movimiento.Is_deleted);
        insertMovimientoProducto.input('Mpsume', sql.NVarChar, movimiento.Mpsume);
        insertMovimientoProducto.input('Mpsups', sql.NVarChar, movimiento.Mpsups);
        insertMovimientoProducto.input('Mpsiv', sql.NVarChar, movimiento.Mpsiv);
        insertMovimientoProducto.input('Mpshoty', sql.NVarChar, movimiento.Mpshoty);
        insertMovimientoProducto.input('Mpshoid', sql.NVarChar, movimiento.Mpshoid);
        insertMovimientoProducto.input('Mpshcty', sql.NVarChar, movimiento.Mpshcty);
        insertMovimientoProducto.input('Mpshcid', sql.NVarChar, movimiento.Mpshcid);
        insertMovimientoProducto.input('Mpsfv', sql.NVarChar, movimiento.Mpsfv);
        insertMovimientoProducto.input('Mpsfr', sql.NVarChar, movimiento.Mpsfr);
        insertMovimientoProducto.input('Mpsqp', sql.NVarChar, movimiento.Mpsqp);
        insertMovimientoProducto.input('Mpsqp2', sql.NVarChar, movimiento.Mpsqp2);
        insertMovimientoProducto.input('Mpsdmr', sql.NVarChar, movimiento.Mpsdmr);
        insertMovimientoProducto.input('Mpslt', sql.NVarChar, movimiento.Mpslt);
        insertMovimientoProducto.input('Mpsrf', sql.NVarChar, movimiento.Mpsrf);
        insertMovimientoProducto.input('Ie$0', sql.NVarChar, movimiento.Ie$0);
        insertMovimientoProducto.input('Ie$1', sql.NVarChar, movimiento.Ie$1);
        insertMovimientoProducto.input('Ie$2', sql.NVarChar, movimiento.Ie$2);
        insertMovimientoProducto.input('Ie$3', sql.NVarChar, movimiento.Ie$3);
         let sentencia =`INSERT INTO MPS 
                            (
                                Recno,
                                Is_deleted,
                                Mpsume,
                                Mpsups,
                                Mpsiv,
                                Mpshoty,
                                Mpshoid,
                                Mpshcty,
                                Mpshcid,
                                Mpsfv,
                                Mpsfr,
                                Mpsqp,
                                Mpsqp2,
                                Mpsdmr,
                                Mpslt,
                                Mpsrf,
                                Ie$0,
                                Ie$1,
                                Ie$2,
                                Ie$3
                            ) 
                         VALUES (
                            @Recno,
                            @Is_deleted,
                            @Mpsume,
                            @Mpsups,
                            @Mpsiv,
                            @Mpshoty,
                            @Mpshoid,
                            @Mpshcty,
                            @Mpshcid,
                            @Mpsfv,
                            @Mpsfr,
                            @Mpsqp,
                            @Mpsqp2,
                            @Mpsdmr,
                            @Mpslt,
                            @Mpsrf,
                            @Ie$0,
                            @Ie$1,
                            @Ie$2,
                            @Ie$3
                        ) `;
         console.log(movimiento);
         insertMovimientoProducto.query(movimiento);
         return insertMovimientoProducto.recordsets;                
     } catch (error) {
         console.log("Error en la insercion de datos: " + error);
     }
 } 
async function devolverUltimosID(){
    try {
        let pool = await sql.connect(config);
        let producto = await pool.request()
        .query(`SELECT MAX(RECNO)+1 as [RECNO], MAX(CONVERT(Numeric, IVID))+1 as [IVID]  from iv;`);
        return producto.recordsets;
    } catch (error) {
        console.log(error);
    }
}
 

 module.exports = {
    getMovimientoProductoSaliente: getMovimientoProductoSaliente,
     getMovimientoProductoSalienteById: getMovimientoProductoSalienteById,
     addMovimientoProductoSaliente: addMovimientoProductoSaliente,
     updateMovimientoProductoSaliente: updateById,
     getLastMovimientoProductoSalienteID:devolverUltimosID
 }