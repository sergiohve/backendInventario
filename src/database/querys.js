export default {
  getAllUnidades: "SELECT * FROM Unidades",
  addNewUnidades:
    "INSERT INTO Unidades(nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano) VALUES (@nombreUnidad, @tipoMaquina, @modelo, @marca, @serialMaquina, @modeloMotor, @serialMotor, @arregloPlacas, @plantaUbicacion, @condicion, @ano)",
  registerUser:
    "INSERT INTO Usuarios(email, password, name, accessToken, rol) VALUES (@email, @password, @name, @accessToken, @rol)",
  getUnidadesById: "SELECT * FROM Unidades Where Id = @Id",
  deleteUnidades: "DELETE FROM [webstore].[dbo].[Unidades] WHERE Id = @Id",
  updateUnidadesById:
    "UPDATE Unidades SET NombreUnidad = @nombreUnidad, TipoMaquina = @tipoMaquina, Modelo = @modelo, Marca=@marca, SerialMaquina=@serialMaquina, ModeloMotor= @modeloMotor, SerialMotor=@serialMotor, ArregloPlacas=@arregloPlacas, PlantaUbicacion= @plantaUbicacion, Condicion=@condicion, Ano=@ano WHERE Id = @Id",
  getAllEquipos: "SELECT * FROM ListadoEquipos",
  addNewEquipo:
    "INSERT INTO ListadoEquipos(nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano, fechaReparacion, serialUnidad, tallerReparacion, nombreMecanico, ubicacionTaller, nombreConductor, nombrePieza, marcaPieza, serialPieza, descripCambioAceite, marcaAceite) VALUES (@nombreUnidad, @tipoMaquina, @modelo, @marca, @serialMaquina, @modeloMotor, @serialMotor, @arregloPlacas, @plantaUbicacion, @condicion, @ano, @fechaReparacion, @serialUnidad, @tallerReparacion, @nombreMecanico, @ubicacionTaller, @nombreConductor, @nombrePieza, @marcaPieza, @serialPieza, @descripCambioAceite, @marcaAceite)",
  getEquipoById: "SELECT * FROM ListadoEquipos Where Id = @Id",
  deleteEquipo: "DELETE FROM [webstore].[dbo].[ListadoEquipos] WHERE Id = @Id",
  updateEquipoById:
    "UPDATE ListadoEquipos SET TipoMaquina = @tipoMaquina, Modelo = @modelo, Marca=@marca, SerialMaquina=@serialMaquina, ModeloMotor= @modeloMotor, SerialMotor=@serialMotor, ArregloPlacas=@arregloPlacas, PlantaUbicacion= @plantaUbicacion, Condicion=@condicion, Ano=@ano, FechaReparacion=@fechaReparacion, SerialUnidad=@serialUnidad, TallerReparacion=@tallerReparacion, NombreMecanico=@nombreMecanico, UbicacionTaller=@ubicacionTaller, NombreConductor=@nombreConductor, NombrePieza=@nombrePieza, MarcaPieza=@marcaPieza, SerialPieza=@serialPieza, DescripCambioAceite=@descripCambioAceite, MarcaAceite=@marcaAceite WHERE Id=@Id",

  // Productos
  getAllProductos: `
    SELECT 
      p.id, 
      p.nombreProducto, 
      p.cantidad,
      (SELECT TOP 1 precioCompra FROM Compras WHERE nombreProducto = p.nombreProducto ORDER BY fechaCompra DESC) AS precioCompra,
      (SELECT TOP 1 precioVenta FROM Ventas WHERE nombreProducto = p.nombreProducto ORDER BY fechaVenta DESC) AS precioVenta,
      (
        (SELECT TOP 1 precioVenta FROM Ventas WHERE nombreProducto = p.nombreProducto ORDER BY fechaVenta DESC) - 
        (SELECT TOP 1 precioCompra FROM Compras WHERE nombreProducto = p.nombreProducto ORDER BY fechaCompra DESC)
      ) AS ganancia,
      ISNULL((SELECT SUM(cantidad) FROM Ventas WHERE nombreProducto = p.nombreProducto), 0) AS unidadesVendidas 
    FROM Productos p
  `,
  addNewProducto:
    "INSERT INTO Productos(nombreProducto, precio, cantidad) VALUES (@nombreProducto, @precio, @cantidad)",
  getProductoById: "SELECT * FROM Productos Where Id = @Id",
  deleteProducto: "DELETE FROM [webstore].[dbo].[Productos] WHERE Id = @Id",
  updateProductoById:
    "UPDATE Productos SET NombreProducto = @nombreProducto, Precio = @precio, Cantidad=@cantidad WHERE Id=@Id",
  getProductByName:
    "SELECT * FROM Productos WHERE nombreProducto = @nombreProducto",
  getProductByNameExceptId:
    "SELECT * FROM Productos WHERE nombreProducto = @nombreProducto AND id != @id",
  updateProductoCantidad:
    "UPDATE Productos SET cantidad = cantidad - @cantidadVendida WHERE nombreProducto = @nombreProducto",

  // Ventas
  getAllVentas:
    "SELECT id, nombreProducto, precioVenta, cantidad, FORMAT(fechaVenta, 'yyyy-MM-dd HH:mm:ss') as fechaVenta FROM Ventas",
  addNewVenta:
    "INSERT INTO Ventas(nombreProducto, precioVenta, cantidad, fechaVenta) VALUES (@nombreProducto, @precioVenta, @cantidad, @fechaVenta)",
  getVentaById: "SELECT * FROM Ventas Where Id = @Id",
  deleteVenta: "DELETE FROM [webstore].[dbo].[Ventas] WHERE Id = @Id",
  updateVentaById:
    "UPDATE Ventas SET NombreProducto = @nombreProducto, PrecioVenta = @precioVenta, Cantidad=@cantidad, fechaVenta = @fechaVenta WHERE Id=@Id",
  updateProductoCantidadVentaCancelada:
    "UPDATE Productos SET cantidad = cantidad + @cantidadVendida WHERE nombreProducto = @nombreProducto",
  // Usuarios
  registerUser:
    "INSERT INTO Usuarios(email, password, name, accessToken) VALUES (@email, @password, @name, @accessToken)",
  updateUserAccessToken:
    "UPDATE Usuarios SET accessToken = @accessToken WHERE email = @email",
  // Compras
  getAllCompras: `
    SELECT 
      c.id, 
      c.nombreProducto, 
      c.precioCompra, 
      c.cantidad, 
      p.nombreProveedor, 
      FORMAT(c.fechaCompra, 'yyyy-MM-dd HH:mm:ss') as fechaCompra,
      (c.cantidad * c.precioCompra) AS totalCompra 
    FROM Compras c
    JOIN Proveedores p ON c.idProveedor = p.idProveedor
  `,
  addNewCompra:
    "INSERT INTO Compras(nombreProducto, precioCompra, cantidad, fechaCompra, idProveedor) VALUES (@nombreProducto, @precioCompra, @cantidad, @fechaCompra, @idProveedor)",
  getCompraById: `
    SELECT 
      c.id, 
      c.nombreProducto, 
      c.precioCompra, 
      c.cantidad, 
      p.nombreProveedor, 
      FORMAT(c.fechaCompra, 'yyyy-MM-dd HH:mm:ss') as fechaCompra,
      (c.cantidad * c.precioCompra) AS totalCompra
    FROM Compras c
    JOIN Proveedores p ON c.idProveedor = p.idProveedor
    WHERE c.id = @Id
  `,
  deleteCompra: "DELETE FROM [webstore].[dbo].[Compras] WHERE Id = @Id",
  updateCompraById:
    "UPDATE Compras SET NombreProducto = @nombreProducto, PrecioCompra = @precioCompra, Cantidad=@cantidad,IdProveedor=@idProveedor, fechaCompra = @fechaCompra WHERE Id=@Id",
  updateProductoCantidadCompra:
    "UPDATE Productos SET cantidad = cantidad + @cantidadComprada WHERE nombreProducto = @nombreProducto",
  updateProductoCantidadCompraCancelada:
    "UPDATE Productos SET cantidad = cantidad - @cantidadComprada WHERE nombreProducto = @nombreProducto",

  // Proveedor
  getAllProveedores: "SELECT * FROM Proveedores",
  addNewProveedor:
    "INSERT INTO Proveedores(nombreProveedor) VALUES (@nombreProveedor)",
  getProveedorById: "SELECT * FROM Proveedores Where IdProveedor = @Id",
  deleteProveedor:
    "DELETE FROM [webstore].[dbo].[Proveedores] WHERE IdProveedor = @idProveedor",
  updateProveedorById:
    "UPDATE Proveedores SET NombreProveedor = @nombreProveedor WHERE IdProveedor=@Id",
  getProveedorByName:
    "SELECT * FROM Proveedores WHERE nombreProveedor = @nombreProveedor",
  getProveedorByNameExceptId:
    "SELECT * FROM Proveedores WHERE nombreProveedor = @nombreProveedor AND IdProveedor != @id",

  // Deudores
  getAllDeudores: "SELECT * FROM Deudores",
  addNewDeudor:
    "INSERT INTO Deudores(nombreDeudor, cantidad) VALUES (@nombreDeudor, @cantidad)",
  getDeudorById: "SELECT * FROM Deudores Where IdDeudor = @Id",
  deleteDeudor:
    "DELETE FROM [webstore].[dbo].[Deudores] WHERE IdDeudor = @idDeudor",
  updateDeudorById:
    "UPDATE Deudores SET NombreDeudor = @nombreDeudor, Cantidad = @cantidad WHERE IdDeudor=@Id",
  getDeudorByName: "SELECT * FROM Deudores WHERE nombreDeudor = @nombreDeudor",
  getDeudorByNameExceptId:
    "SELECT * FROM Deudores WHERE nombreDeudor = @nombreDeudor AND IdDeudor != @id",

  // Deudas
  getAllDeudas: "SELECT * FROM Deudas",
  addNewDeudas:
    "INSERT INTO Deudas(nombreDeudas, cantidad) VALUES (@nombreDeudas, @cantidad)",
  getDeudasById: "SELECT * FROM Deudas Where IdDeuda = @Id",
  deleteDeudas:
    "DELETE FROM [webstore].[dbo].[Deudas] WHERE IdDeuda = @idDeuda",
  updateDeudasById:
    "UPDATE Deudas SET NombreDeudas = @nombreDeudas, Cantidad = @cantidad WHERE IdDeuda=@Id",
  getDeudasByName: "SELECT * FROM Deudas WHERE nombreDeudas = @nombreDeudas",
  getDeudasByNameExceptId:
    "SELECT * FROM Deudas WHERE nombreDeudas = @nombreDeudas AND IdDeuda != @id",
  //Graficas
  getAllVentasGraficas: `
  SELECT 
    v.id, 
    v.nombreProducto, 
    v.precioVenta, 
    v.cantidad, 
    FORMAT(v.fechaVenta, 'yyyy-MM-dd HH:mm:ss') as fechaVenta,
    (SELECT TOP 1 c.precioCompra FROM Compras c WHERE c.nombreProducto = v.nombreProducto ORDER BY c.fechaCompra DESC) AS precioCompra
  FROM Ventas v
`,
  getAllComprasGraficas: `
       SELECT 
         c.id, 
         c.nombreProducto, 
         c.precioCompra, 
         c.cantidad, 
         p.nombreProveedor, 
         FORMAT(c.fechaCompra, 'yyyy-MM-dd HH:mm:ss') as fechaCompra,
         (c.cantidad * c.precioCompra) AS totalCompra 
       FROM Compras c
       JOIN Proveedores p ON c.idProveedor = p.idProveedor
     `,
  getAllProductosGraficas: `
       SELECT 
         p.id, 
         p.nombreProducto, 
         p.cantidad,
         (SELECT TOP 1 precioCompra FROM Compras WHERE nombreProducto = p.nombreProducto ORDER BY fechaCompra DESC) AS precioCompra,
         (SELECT TOP 1 precioVenta FROM Ventas WHERE nombreProducto = p.nombreProducto ORDER BY fechaVenta DESC) AS precioVenta,
         (
           (SELECT TOP 1 precioVenta FROM Ventas WHERE nombreProducto = p.nombreProducto ORDER BY fechaVenta DESC) - 
           (SELECT TOP 1 precioCompra FROM Compras WHERE nombreProducto = p.nombreProducto ORDER BY fechaCompra DESC)
         ) AS ganancia,
         ISNULL((SELECT SUM(cantidad) FROM Ventas WHERE nombreProducto = p.nombreProducto), 0) AS unidadesVendidas 
       FROM Productos p
     `,
  getAllDeudoresGraficas: "SELECT * FROM Deudores",
  getAllDeudasGraficas: "SELECT * FROM Deudas",
};
