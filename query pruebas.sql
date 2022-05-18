SELECT * FROM [FV]
SELECT * 
FROM [FV]
WHERE RECNO = (
    SELECT MAX(RECNO) 
  	FROM [FV])
--facturas
SELECT MAX(FVID) + 1 FROM [FV] WHERE FVID = (SELECT MAX(FVID) FROM [FV])
SELECT MAX(RECNO) + 1 FROM [FV] WHERE RECNO = (SELECT MAX(RECNO) FROM [FV])
--item ventas
SELECT RECNO + 1 FROM [IV] WHERE RECNO = (SELECT MAX(RECNO) FROM [IV])
SELECT CONVERT(numeric,IVID)+1 FROM [IV] WHERE IVID = (SELECT MAX(IVID) FROM [IV])
--movimiento moneda entrante
SELECT * from [IV]
SELECT RECNO + 1 FROM [MME] WHERE RECNO = (SELECT MAX(RECNO) FROM [MME])
SELECT CONVERT(numeric,MMEID)+1 FROM [MME] WHERE MMEID = (SELECT MAX(MMEID) FROM [MME])
--transaccion 
BEGIN TRANSACTION;
declare 
	@alicuota float,
	@base_imponible int,
	@nombre_servicio varchar(10),
	@concepto_item varchar(10),
	@concepto_factura varchar(10),
	@id_contribuyente varchar(13),
	@ultimo_recno numeric(10),
	@fecha_sistema varchar(14);
	SET @nombre_servicio = 'WEB'
	SET @fecha_sistema = CAST(CURRENT_TIMESTAMP AS VARCHAR);
	SELECT 	
	@alicuota AS [alicuota],
	@base_imponible AS [base imponible], 
	@nombre_servicio  AS [nombre servicio],
	@concepto_item  AS [concepto item],
	@concepto_factura  AS [concepto factura],
	@id_contribuyente  AS [id contribuyente],
	@ultimo_recno  AS [recno],
	@fecha_sistema  AS [fecha sistema];

COMMIT TRANSACTION;
SELECT [UME].UMEID AS ID FROM [UME] ;
--alta en fv
SELECT [FV].FVID,[FV].FVUME,[FV].FVTS,[FV].FVEF,[FV].FVQP,[FV].FVQM,[FV].recno from [FV];
	INSERT INTO [FV] (
		[FV].recno,[FV].FVID,[FV].FVUME,[FV].FVTS,[FV].FVEF,[FV].FVQP,[FV].FVQM
	) VALUES(
		
	)