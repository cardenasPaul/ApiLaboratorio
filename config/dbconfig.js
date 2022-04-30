const config ={
    user: 'lab2022',
    password: 'lab2022',
    server: 'localhost',
    database:'PCBD700LaMarca',
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        encrypt:false,
        instancename:'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;