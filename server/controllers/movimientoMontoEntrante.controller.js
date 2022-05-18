var config = require('./../.././config/dbconfig');
const sql = require('mssql');
const { request } = require('express');

async function getLastRecno() {
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request().query("SELECT RECNO + 1 AS id FROM [MME] WHERE RECNO = (SELECT MAX(RECNO) FROM [MME]);");
        return facturas.recordset[0].id;
    } catch (error) {
        console.log(error);
    }
}
async function getLastID() {
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request().query("SELECT CONVERT(numeric,MMEID)+1 AS id FROM [MME] WHERE MMEID = (SELECT MAX(MMEID) FROM [MME]);");
        return facturas.recordset[0].id;
    } catch (error) {
        console.log(error);
    }
}

async function getMovimientoMontoEntrante(){
    try {
        let pool = await sql.connect(config);
        let monto = await pool.request().query("SELECT * FROM MME");
        return monto.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getMovimientoMontoEntranteById(idMonto){
    try {
        let pool = await sql.connect(config);
        let monto = await pool.request()
        .input('input_parameter',sql.VarChar, idMonto)
        .query("SELECT * FROM MME where MMEID = @input_parameter");
        return monto.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addMovimientoMontoEntrante(movimiento){
    try {
        let pool = await sql.connect(config);
        let insertMovimientoMonto = await pool.request()
        insertMovimientoMonto.input('Recno', sql.Numeric,movimiento.Recno);
        insertMovimientoMonto.input('Is_deleted', sql.Char,movimiento.Is_deleted);
        insertMovimientoMonto.input('Mmeume', sql.NVarChar,movimiento.Mmeume);
        insertMovimientoMonto.input('Mmeumec', sql.NVarChar,movimiento.Mmeumec);
        insertMovimientoMonto.input('Mmeiv', sql.NVarChar,movimiento.Mmeiv);
        insertMovimientoMonto.input('Mmehoty', sql.NVarChar,movimiento.Mmehoty);
        insertMovimientoMonto.input('Mmehoid', sql.NVarChar,movimiento.Mmehoid);
        insertMovimientoMonto.input('Mmehcty', sql.NVarChar,movimiento.Mmehcty);
        insertMovimientoMonto.input('Mmehcid', sql.NVarChar,movimiento.Mmehcid);
        insertMovimientoMonto.input('Mmefv', sql.NVarChar,movimiento.Mmefv);
        insertMovimientoMonto.input('Mmefr', sql.NVarChar,movimiento.Mmefr);
        insertMovimientoMonto.input('Mmeqm', sql.Numeric,movimiento.Mmeqm);
        insertMovimientoMonto.input('Mmeit', sql.Numeric,movimiento.Mmeit);
        insertMovimientoMonto.input('Mmelt', sql.NVarChar,movimiento.Mmelt);
        insertMovimientoMonto.input('Mmedmr', sql.NVarChar,movimiento.Mmedmr);
        insertMovimientoMonto.input('Mmerf', sql.NVarChar,movimiento.Mmerf);
        insertMovimientoMonto.input('Mmeid', sql.NVarChar,movimiento.Mmeid);
        insertMovimientoMonto.input('Mmemme', sql.NVarChar,movimiento.Mmemme);
        insertMovimientoMonto.input('Ie$0', sql.NVarChar,movimiento.Ie$0);
        insertMovimientoMonto.input('Ie$1', sql.NVarChar,movimiento.Ie$1);
        insertMovimientoMonto.input('Ie$2', sql.NVarChar,movimiento.Ie$2);
        insertMovimientoMonto.input('Ie$3', sql.NVarChar,movimiento.Ie$3);

         let sentencia =`INSERT INTO MME 
                            (   Recno ,Is_deleted ,Mmeume ,Mmeumec ,Mmeiv ,Mmehoty ,Mmehoid ,Mmehcty ,Mmehcid ,Mmefv ,Mmefr ,Mmeqm ,Mmeit,
                                Mmelt ,Mmedmr ,Mmerf ,Mmeid ,Mmemme ,Ie$0 ,Ie$1 ,Ie$2 ,Ie$3
                                ) 
                         VALUES (   @Recno  ,@Is_deleted  ,@Mmeume  ,@Mmeumec  ,@Mmeiv  ,@Mmehoty  ,@Mmehoid  ,@Mmehcty  ,@Mmehcid  ,@Mmefv  
                            ,@Mmefr  ,@Mmeqm  ,@Mmeit ,@Mmelt  ,@Mmedmr  ,@Mmerf  ,@Mmeid  ,@Mmemme  ,@Ie$0  ,@Ie$1  ,@Ie$2  ,@Ie$3
                            ) `;
         console.log(sentencia);
         insertMovimientoMonto.query(sentencia);
         return insertMovimientoMonto.recordsets;                
     } catch (error) {
         console.log("Error en la insercion de datos: " + error);
     }
 } 
 
 

 module.exports = {
     getMovimientoMontoEntrante: getMovimientoMontoEntrante,
     getMovimientoMontoEntranteById: getMovimientoMontoEntranteById,
     addMovimientoMontoEntrante: addMovimientoMontoEntrante,
     getLastID: getLastID,
     getLastRecno: getLastRecno
 }
