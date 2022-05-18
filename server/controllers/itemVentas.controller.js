var config = require('./../.././config/dbconfig');
const sql = require('mssql');
const { request } = require('express');

async function getLastRecno() {
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request().query("SELECT RECNO + 1 as id FROM [IV] WHERE RECNO = (SELECT MAX(RECNO) FROM [IV]);");
        return facturas.recordset[0].id;
    } catch (error) {
        console.log(error);
    }
}
async function getLastID() {
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request().query("SELECT CONVERT(numeric,IVID)+1 as id FROM [IV] WHERE IVID = (SELECT MAX(IVID) FROM [IV]);");
        return facturas.recordset[0].id;
    } catch (error) {
        console.log(error);
    }
}
async function getItemVentas(){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request().query("SELECT * FROM IV");
        return item.recordsets;
    } catch (error) {
        console.log(error);
    }
}
async function getItemVentasById(idItem){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
        .input('input_parameter',sql.VarChar, idItem)
        .query("SELECT * FROM IV where IVID = @input_parameter");
        return item.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}
async function addItemVentas(item){
    try {
        let pool = await sql.connect(config);
        let insertItem = await pool.request()
        insertItem.input('Recno',sql.Int,item.Recno);
        insertItem.input('Is_deleted',sql.Char,item.Is_deleted);
        insertItem.input('Ivid',sql.NVarChar,item.Ivid);
        insertItem.input('Ivups',sql.NVarChar,item.Ivups);
        insertItem.input('Ivpr',sql.NVarChar,item.Ivpr);
        insertItem.input('Iviv',sql.NVarChar,item.Iviv);
        insertItem.input('Ivfv',sql.NVarChar,item.Ivfv);
        insertItem.input('Ivume',sql.NVarChar,item.Ivume);
        insertItem.input('Ivts',sql.NVarChar,item.Ivts);
        insertItem.input('Ivrf',sql.NVarChar,item.Ivrf);
        insertItem.input('Ivqp',sql.Numeric,item.Ivqp);
        insertItem.input('Ivqmc',sql.Numeric,item.Ivqmc);
        insertItem.input('Ivqmv',sql.Numeric,item.Ivqmv);
        insertItem.input('Ivqmex',sql.Numeric,item.Ivqmex);
        insertItem.input('Ivqmgr',sql.Numeric,item.Ivqmgr);
        insertItem.input('Ivqmii',sql.Numeric,item.Ivqmii);
        insertItem.input('Ivqmig',sql.Numeric,item.Ivqmig);
        insertItem.input('Ivqmigs',sql.Numeric,item.Ivqmigs);
        insertItem.input('Ivqmis',sql.Numeric,item.Ivqmis);
        insertItem.input('Ivqmiss',sql.Numeric,item.Ivqmiss);
        insertItem.input('Ivqmoi',sql.Numeric,item.Ivqmoi);
        insertItem.input('Ivqm',sql.Numeric,item.Ivqm);
        insertItem.input('Ivlts',sql.NVarChar,item.Ivlts);
        insertItem.input('Ivlt',sql.NVarChar,item.Ivlt);
        insertItem.input('Ivdmr',sql.NVarChar,item.Ivdmr);
        insertItem.input('Ivty',sql.NVarChar,item.Ivty);
        insertItem.input('Ie$0',sql.NVarChar,item.Ie$0);
        insertItem.input('Ie$1',sql.NVarChar,item.Ie$1);

        let sentencia =`INSERT INTO IV 
                            (        Recno,Is_deleted,Ivid,Ivups,Ivpr,Iviv,Ivfv,Ivume,Ivts,Ivrf,Ivqp,Ivqmc,Ivqmv,Ivqmex,Ivqmgr,Ivqmii,Ivqmig,Ivqmigs,Ivqmis,
                                Ivqmiss,Ivqmoi,Ivqm,Ivlts,Ivlt,Ivdmr,Ivty,Ie$0,Ie$1) 
                        VALUES (     @Recno,@Is_deleted,@Ivid,@Ivups,@Ivpr,@Iviv,@Ivfv,@Ivume,@Ivts,@Ivrf,@Ivqp,@Ivqmc,@Ivqmv,@Ivqmex,@Ivqmgr,@Ivqmii,@Ivqmig
                            ,@Ivqmigs,@Ivqmis,@Ivqmiss,@Ivqmoi,@Ivqm,@Ivlts,@Ivlt,@Ivdmr,@Ivty,@Ie$0,@Ie$1)`;
        console.log(sentencia);
        insertItem.query(sentencia);
        return insertItem.recordsets;                
    } catch (error) {
        console.log("Error en la insercion de datos: " + error);
    }
}



module.exports = {
    getItemVentas: getItemVentas,
    getItemVentasById: getItemVentasById,
    addItemVentas: addItemVentas,
    getLastID: getLastID,
    getLastRecno: getLastRecno
}
