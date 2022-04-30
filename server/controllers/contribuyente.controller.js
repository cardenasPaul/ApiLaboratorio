var config = require('./../.././config/dbconfig');
const sql = require('mssql');
const { request } = require('express');

async function devolverContribuyentes(){
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request().query("SELECT * FROM UME");
        return facturas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function buscarContribuyentePorID(idContribuyente){
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request()
        .input('input_parameter',sql.VarChar, idContribuyente)
        .query("SELECT * FROM UME WHERE UMEID = @input_parameter");
        return facturas.recordsets;
    } catch (error) {
        console.log(error);
    }
}
async function buscarContribuyentePorCuit(cuit){
    try {
        let pool = await sql.connect(config);
        let facturas = await pool.request()
        .input('cuit',sql.VarChar, cuit)
        .query("SELECT * FROM UME WHERE UMECU = @cuit");
        return facturas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function agregarContribuyente(contribuyente){
    try {
        /*Para probar con postman usar el body con la opcion json y no texto a la derecha*/
        let pool = await sql.connect(config);
        let insertContrubuyente = await pool.request();
        insertContrubuyente.input('Recno',sql.Int,contribuyente.Recno)
        insertContrubuyente.input('Is_deleted',sql.Char,contribuyente.Is_deleted)
        insertContrubuyente.input('Umeid',sql.NVarChar,contribuyente.Umeid)
        insertContrubuyente.input('Umedm',sql.NVarChar,contribuyente.Umedm)
        insertContrubuyente.input('Umelv',sql.NVarChar,contribuyente.Umelv)
        insertContrubuyente.input('Umeume',sql.NVarChar,contribuyente.Umeume)
        insertContrubuyente.input('Umeum',sql.NVarChar,contribuyente.Umeum)
        insertContrubuyente.input('Umec1',sql.NVarChar,contribuyente.Umec1)
        insertContrubuyente.input('Umec2',sql.NVarChar,contribuyente.Umec2)
        insertContrubuyente.input('Umesq',sql.NVarChar,contribuyente.Umesq)
        insertContrubuyente.input('Umenm',sql.NVarChar,contribuyente.Umenm)
        insertContrubuyente.input('Umedi',sql.NVarChar,contribuyente.Umedi)
        insertContrubuyente.input('Umelo',sql.NVarChar,contribuyente.Umelo)
        insertContrubuyente.input('Umepv',sql.NVarChar,contribuyente.Umepv)
        insertContrubuyente.input('Umecp',sql.NVarChar,contribuyente.Umecp)
        insertContrubuyente.input('Umete',sql.NVarChar,contribuyente.Umete)
        insertContrubuyente.input('Umecu',sql.NVarChar,contribuyente.Umecu)
        insertContrubuyente.input('Umeiv',sql.NVarChar,contribuyente.Umeiv)
        insertContrubuyente.input('Umest',sql.NVarChar,contribuyente.Umest)
        insertContrubuyente.input('Umetsst',sql.NVarChar,contribuyente.Umetsst)
        insertContrubuyente.input('Umesem',sql.Numeric,contribuyente.Umesem)
        insertContrubuyente.input('Umese',sql.Numeric,contribuyente.Umese)
        insertContrubuyente.input('Umesea',sql.Numeric,contribuyente.Umesea)
        insertContrubuyente.input('Umetsa',sql.NVarChar,contribuyente.Umetsa)
        insertContrubuyente.input('Umets',sql.NVarChar,contribuyente.Umets)
        insertContrubuyente.input('Umefv',sql.NVarChar,contribuyente.Umefv)
        insertContrubuyente.input('Umerd',sql.NVarChar,contribuyente.Umerd)
        insertContrubuyente.input('Umeqp',sql.Numeric,contribuyente.Umeqp)
        insertContrubuyente.input('Umees',sql.NVarChar,contribuyente.Umees)
        insertContrubuyente.input('Ie$0',sql.NVarChar,contribuyente.Ie$0)
        insertContrubuyente.input('Ie$1',sql.NVarChar,contribuyente.Ie$1)
        insertContrubuyente.input('Ie$2',sql.NVarChar,contribuyente.Ie$2)
        insertContrubuyente.input('Ie$3',sql.NVarChar,contribuyente.Ie$3)
        insertContrubuyente.input('Ie$4',sql.NVarChar,contribuyente.Ie$4)
        insertContrubuyente.input('Ie$5',sql.NVarChar,contribuyente.Ie$5)
        let sentencia =`INSERT INTO UME 
                            (   Recno,Is_deleted,Umeid,Umedm,Umelv,Umeume,Umeum,Umec1,Umec2,Umesq,Umenm,Umedi,Umelo,Umepv,Umecp,Umete,Umecu,Umeiv,Umest,Umetsst,Umesem,
                                Umese,Umesea,Umetsa,Umets,Umefv,Umerd,Umeqp,Umees,Ie$0,Ie$1,Ie$2,Ie$3,Ie$4,Ie$5) 
                        VALUES (  @Recno,@Is_deleted,@Umeid,@Umedm,@Umelv,@Umeume,@Umeum,@Umec1,@Umec2,@Umesq,@Umenm,@Umedi,@Umelo,@Umepv,@Umecp,@Umete,@Umecu,@Umeiv
                            ,@Umest,@Umetsst,@Umesem,@Umese,@Umesea,@Umetsa,@Umets,@Umefv,@Umerd,@Umeqp,@Umees,@Ie$0,@Ie$1,@Ie$2,@Ie$3,@Ie$4,@Ie$5) `;
        console.log(contribuyente);
        insertContrubuyente.query(sentencia);
        return insertContrubuyente.recordsets;   
    }catch(error){
        console.log("Error en la insercion de datos: " + error);
    }
}



module.exports = {
    getContribuyentes: devolverContribuyentes,
    getContribuyentesById: buscarContribuyentePorID,
    addContribuyente: agregarContribuyente,
    findContribuyente: buscarContribuyentePorCuit
}
