var config = require('./../.././config/dbconfig');
const sql = require('mssql');
const { request } = require('express');

async function getFacturas(){
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request().query("SELECT * FROM FV");
        return facturas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getFacturasById(idFactura){
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request()
        .input('input_parameter',sql.Int, idFactura)
        .query("SELECT * FROM FV where FvId = @input_parameter");
        return facturas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addFactura(factura){
    try {
        let pool = await sql.connect(config);
        let insertFactura = await pool.request()
        insertFactura.input('Recno',sql.Int, factura.Recno)        
        insertFactura.input('Is_Deleted',sql.Char, factura.Is_Deleted)
        insertFactura.input('Fvid',sql.NVarChar, factura.Fvid)
        insertFactura.input('Fvume',sql.NVarChar, factura.Fvume)
        insertFactura.input('Fves',sql.NVarChar, factura.Fves)
        insertFactura.input('Fvts',sql.NVarChar, factura.Fvts)
        insertFactura.input('Fvef',sql.NVarChar, factura.Fvef)
        insertFactura.input('Fvrf',sql.NVarChar, factura.Fvrf)
        insertFactura.input('Fvqp',sql.Numeric, factura.Fvqp)
        insertFactura.input('Fvqmc',sql.Numeric, factura.Fvqmc)
        insertFactura.input('Fvqmv',sql.Numeric, factura.Fvqmv)
        insertFactura.input('Fvqmex',sql.Numeric, factura.Fvqmex)
        insertFactura.input('Fvqmgr',sql.Numeric, factura.Fvqmgr)
        insertFactura.input('Fvqmii',sql.Numeric, factura.Fvqmii)
        insertFactura.input('Fvqmig',sql.Numeric, factura.Fvqmig)
        insertFactura.input('Fvqmigs',sql.Numeric, factura.Fvqmigs)
        insertFactura.input('Fvqmis',sql.Numeric, factura.Fvqmis)
        insertFactura.input('Fvqmiss',sql.Numeric, factura.Fvqmiss)
        insertFactura.input('Fvqmoi',sql.Numeric, factura.Fvqmoi)
        insertFactura.input('Fvqm',sql.Numeric, factura.Fvqm)
        insertFactura.input('Fvsqm',sql.Numeric, factura.Fvsqm)
        insertFactura.input('Fvsqp',sql.Numeric, factura.Fvsqp)
        insertFactura.input('Fvmp',sql.Numeric, factura.Fvmp)
        insertFactura.input('Fvmps',sql.Numeric, factura.Fvmps)
        insertFactura.input('Fviv',sql.Numeric, factura.Fviv)
        insertFactura.input('Fvmme',sql.Numeric, factura.Fvmme)
        insertFactura.input('Fvmm',sql.Numeric, factura.Fvmm)
        insertFactura.input('Fvlt',sql.NVarChar, factura.Fvlt)
        insertFactura.input('Fvty',sql.NVarChar, factura.Fvty)
        insertFactura.input('Ie$0',sql.NVarChar, factura.Ie$0)
        insertFactura.input('Fvaf',sql.NVarChar, factura.Fvaf)
        insertFactura.input('Fvafid',sql.NVarChar, factura.Fvafid)
        insertFactura.input('Fvcae',sql.NVarChar, factura.Fvcae)
        insertFactura.input('Fvcaefv',sql.NVarChar, factura.Fvcaefv)
        insertFactura.input('Fvca',sql.NVarChar, factura.Fvca)
        let sentencia =`INSERT INTO FV 
                            (Recno,Is_Deleted,Fvid,Fvume,Fves,Fvts,Fvef,Fvrf,Fvqp,Fvqmc,Fvqmv,Fvqmex,Fvqmgr,Fvqmii,Fvqmig,
                            Fvqmigs,Fvqmis,Fvqmiss,Fvqmoi,Fvqm,Fvsqm,Fvsqp,Fvmp,Fvmps,Fviv,Fvmme,Fvmm,Fvlt,Fvty,Ie$0,Fvaf,Fvafid,Fvcae,Fvcaefv, Fvca) 
                        VALUES (@Recno,@Is_Deleted,@Fvid,@Fvume,@Fves,@Fvts,@Fvef,@Fvrf,@Fvqp,@Fvqmc,@Fvqmv,@Fvqmex,@Fvqmgr,@Fvqmii,@Fvqmig,
                                @Fvqmigs,@Fvqmis,@Fvqmiss,@Fvqmoi,@Fvqm,@Fvsqm,@Fvsqp,@Fvmp,@Fvmps,@Fviv,@Fvmme,@Fvmm,@Fvlt,@Fvty,@Ie$0,@Fvaf,@Fvafid,@Fvcae,@Fvcaefv,@Fvca)`;
        console.log(sentencia);
        insertFactura.query(sentencia);
        return insertFactura.recordsets;                
    } catch (error) {
        console.log("Error en la insercion de datos: " + error);
    }
}



module.exports = {
    getFacturas: getFacturas,
    getFacturasById: getFacturasById,
    addFactura: addFactura
}