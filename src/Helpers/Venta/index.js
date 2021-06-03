import {firebaseDatabase} from '../../Conexion/fire'
import Helper from './Fecha'
import Helper_Usuario from '../Login'

class HelpersVenta {

    static Productos() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Product').orderByChild('Estatus').equalTo('Activo').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Limites() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Niveles').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Clientes() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Clientes').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Clientes_once(CB) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Clientes').orderByChild('CB').equalTo(CB).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Mesa_Productos(id) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + id + '/Productos').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Mesa_Productos_secundaria(id) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + id + '/Cuenta/Productos').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Mesa_Productos_cualquiera(id, id_mesa) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + id + '/Cuenta' + id_mesa + '/Productos').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Descuentos() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Ofertas').orderByChild('Estatus').equalTo('Activado').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static registrar_Producto(key = '', product = [], table = [], cantidad = 1) {
        let promises = [];
        promises.push(
            this.Mesa_Productos(table.Mesa).then(e => {
                    this.Descuentos().then(i => {
                        let usuario = Helper_Usuario.Desencriptar();
                        usuario = JSON.parse(usuario);
                        const data = i.val();
                        // Object.keys(data).map(i => descuentos.push(data[i]));
                        let descuento_producto = Object.keys(data).map(i => {
                            return data[i]
                        }).filter(e => e.Modo === key || e.Modo === product.Categoria);

                        if (descuento_producto.length > 0) descuento_producto = (descuento_producto.filter(e => e.BooleanCa === false) === []) ? descuento_producto : descuento_producto.filter(e => e.BooleanCa !== false);
                        // const descuento_producto = descuentos.filter(e => e.Modo === key || e.Modo === product.Categoria);
                        const productos = e.val();
                        let total_temp = 0;
                        let producto_temp = '';
                        if (productos !== null) Object.keys(productos).map(e => productos[e].Precio * productos[e].Cantidad).forEach(e => total_temp = total_temp + (+e));
                        if (productos !== null) Object.keys(productos).map(e => (productos[e].Producto_ID === key) ? producto_temp = e : null);
                        if (producto_temp !== '') {
                            firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Productos/' + producto_temp).update({
                                'Producto_ID': key,
                                'Precio': product.Precio_Venta,
                                'Ganancia': product.Ganancia,
                                'Precio_Original': product.Precio_Original,
                                'GananciaFinal': product.GananciaFinal,
                                'Usuario_ID': usuario.Usuario,
                                'Cantidad': cantidad + productos[producto_temp].Cantidad,
                                'Total': cantidad + (+productos[producto_temp].Cantidad) * product.Precio_Venta
                            });
                        } else {
                            firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Productos').push({
                                'Producto_ID': key,
                                'Precio': product.Precio_Venta,
                                'Usuario_ID': usuario.Usuario,
                                'Cantidad': cantidad,
                                'Ganancia': product.Ganancia,
                                'Precio_Original': product.Precio_Original,
                                'GananciaFinal': product.GananciaFinal,
                                'Total': cantidad * product.Precio_Venta
                            });
                        }
                        total_temp = total_temp + (+product.Precio_Venta)
                        firebaseDatabase.ref('Mesas/Mesa' + table.Mesa).update({
                            'Total': total_temp
                        })
                        firebaseDatabase.ref('Product/' + key).update({
                            'Cantidad': (+product.Cantidad - (+cantidad))
                        })
                    })
                }
            )
        );
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Registrar_Segundo(key = '', product = [], table = [], cantidad = 1) {
        let promises = [];
        promises.push(
            this.Mesa_Productos_secundaria(table.Mesa).then(e => {
                    this.Descuentos().then(i => {
                        let usuario = Helper_Usuario.Desencriptar();
                        usuario = JSON.parse(usuario);
                        const data = i.val();
                        // Object.keys(data).map(i => descuentos.push(data[i]));
                        let descuento_producto = Object.keys(data).map(i => {
                            return data[i]
                        }).filter(e => e.Modo === key || e.Modo === product.Categoria);

                        if (descuento_producto.length > 0) descuento_producto = (descuento_producto.filter(e => e.BooleanCa === false) === []) ? descuento_producto : descuento_producto.filter(e => e.BooleanCa !== false);
                        // const descuento_producto = descuentos.filter(e => e.Modo === key || e.Modo === product.Categoria);
                        const productos = e.val();
                        let total_temp = 0;
                        let Importe = 0;
                        if (descuento_producto.length > 0) Importe = parseInt(descuento_producto[0].Importe);
                        let producto_temp = '';
                        if (productos !== null) Object.keys(productos).map(e => productos[e].Precio * productos[e].Cantidad).forEach(e => total_temp = total_temp + (+e));
                        if (productos !== null) Object.keys(productos).map(e => (productos[e].Producto_ID === key) ? producto_temp = e : null);
                        if (producto_temp !== '') {
                            firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Cuenta/Productos/' + producto_temp).update({
                                'Producto_ID': key,
                                'Precio': product.Precio_Venta,
                                'Usuario_ID': usuario.Usuario,
                                'Cantidad': cantidad + productos[producto_temp].Cantidad,
                                'Ganancia': product.Ganancia,
                                'Precio_Original': product.Precio_Original,
                                'GananciaFinal': product.GananciaFinal,
                                'Total': cantidad + (+productos[producto_temp].Cantidad) * product.Precio_Venta
                            });
                        } else {
                            firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Cuenta/Productos').push({
                                'Producto_ID': key,
                                'Precio': product.Precio_Venta,
                                'Usuario_ID': usuario.Usuario,
                                'Cantidad': cantidad,
                                'Ganancia': product.Ganancia,
                                'Precio_Original': product.Precio_Original,
                                'GananciaFinal': product.GananciaFinal,
                                'Total': cantidad * (+descuento_producto.length > 0) ? (descuento_producto[0].Tipo !== 'Total') ? Math.round((+product.Precio_Venta) - (+product.Precio_Venta * Importe / 100)) : descuento_producto[0].Importe : product.Precio_Venta
                            });
                        }
                        total_temp = total_temp + (+product.Precio_Venta)
                        firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Cuenta').update({
                            'Total': total_temp
                        })
                        firebaseDatabase.ref('Product/' + key).update({
                            'Cantidad': (+product.Cantidad - (+cantidad))
                        })
                    })
                }
            )
        );
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Registrar_Cualquiera(key = '', product = [], table = [], cantidad = 1, mesa) {
        let promises = [];
        if (mesa > 2) {
            promises.push(
                this.Mesa_Productos_cualquiera(table.Mesa, mesa).then(e => {
                        this.Descuentos().then(i => {
                            let usuario = Helper_Usuario.Desencriptar();
                            usuario = JSON.parse(usuario);
                            const data = i.val();
                            // Object.keys(data).map(i => descuentos.push(data[i]));
                            let descuento_producto = Object.keys(data).map(i => {
                                return data[i]
                            }).filter(e => e.Modo === key || e.Modo === product.Categoria);

                            if (descuento_producto.length > 0) descuento_producto = (descuento_producto.filter(e => e.BooleanCa === false) === []) ? descuento_producto : descuento_producto.filter(e => e.BooleanCa !== false);
                            // const descuento_producto = descuentos.filter(e => e.Modo === key || e.Modo === product.Categoria);
                            const productos = e.val();
                            let total_temp = 0;
                            let Importe = 0;
                            if (descuento_producto.length > 0) Importe = parseInt(descuento_producto[0].Importe);
                            let producto_temp = '';
                            if (productos !== null) Object.keys(productos).map(e => productos[e].Precio * productos[e].Cantidad).forEach(e => total_temp = total_temp + (+e));
                            if (productos !== null) Object.keys(productos).map(e => (productos[e].Producto_ID === key) ? producto_temp = e : null);
                            if (producto_temp !== '') {
                                firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Cuenta' + mesa + '/Productos/' + producto_temp).update({
                                    'Producto_ID': key,
                                    'Precio': product.Precio_Venta,
                                    'Usuario_ID': usuario.Usuario,
                                    'Ganancia': product.Ganancia,
                                    'Precio_Original': product.Precio_Original,
                                    'GananciaFinal': product.GananciaFinal,
                                    'Cantidad': cantidad + productos[producto_temp].Cantidad,
                                    'Total': cantidad + (+productos[producto_temp].Cantidad) * product.Precio_Venta
                                });
                            } else {
                                firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Cuenta' + mesa + '/Productos').push({
                                    'Producto_ID': key,
                                    'Precio': product.Precio_Venta,
                                    'Usuario_ID': usuario.Usuario,
                                    'Cantidad': cantidad,
                                    'Ganancia': product.Ganancia,
                                    'Precio_Original': product.Precio_Original,
                                    'GananciaFinal': product.GananciaFinal,
                                    'Total': (descuento_producto.length > 0) ? (descuento_producto[0].Tipo !== 'Total') ? Math.round((+product.Precio_Venta) - (+product.Precio_Venta * Importe / 100)) : descuento_producto[0].Importe : product.Precio_Venta
                                });
                            }
                            total_temp = total_temp + (+product.Precio_Venta)
                            firebaseDatabase.ref('Mesas/Mesa' + table.Mesa + '/Cuenta' + mesa).update({
                                'Total': total_temp
                            })
                            firebaseDatabase.ref('Product/' + key).update({
                                'Cantidad': (+product.Cantidad - (+cantidad))
                            })
                        })
                    }
                )
            );
        } else {
            return false;
        }
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static pagar(data = [], pago, cambio, cliente = null) {
        let promises = [];
        let usuario = Helper_Usuario.Desencriptar();
        usuario = JSON.parse(usuario);
        promises.push(firebaseDatabase.ref('Ventas').push({
            'Fecha': Helper.Get_Fecha(),
            'Hora': Helper.Get_Hora(),
            'Productos': {...data.Productos},
            'Total': data.Total,
            'Usuario_ID': usuario.Usuario,
            'Mesa': data.Mesa,
            'Pago': pago,
            'Cambio': cambio,
            'Cliente': cliente
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + data.Mesa).update({
            'Productos': null,
            'Total': 0
        }));
        this.Limites().then(e => {
            const b = e.val();
            if (cliente !== undefined && cliente !== null) {
                this.Clientes_once(cliente).then(i => {
                    const d = i.val();
                    let e = '';
                    Object.keys(d).map(u => e = u);
                    if (d[e].Gastado !== undefined) {
                        promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                            'Gastado': d[e].Gastado + (+data.Total)
                        }));
                        Object.keys(b).map(o => {
                            if ((d[e].Gastado + (+data.Total)) >= b[o].Cantidad) {
                                promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                                    'Descuento': b[o].Procentaje
                                }));
                            }
                        })
                    } else {
                        promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                            'Gastado': data.Total
                        }));
                    }
                })
            }
        })
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static pagar_segunda(data = [], pago, cambio, mesa, cliente = null) {
        let promises = [];
        let usuario = Helper_Usuario.Desencriptar();
        usuario = JSON.parse(usuario);
        promises.push(firebaseDatabase.ref('Ventas').push({
            'Fecha': Helper.Get_Fecha(),
            'Hora': Helper.Get_Hora(),
            'Productos': {...data.Productos},
            'Total': data.Total,
            'Usuario_ID': usuario.Usuario,
            'Mesa': mesa,
            'Pago': pago,
            'Cambio': cambio,
            'Cliente': cliente
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa + '/Cuenta').update({
            'Productos': null,
            'Total': 0
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa).update({
            'Segunda_Cuenta': false
        }));
        this.Limites().then(e => {
            const b = e.val();
            this.Clientes_once(cliente).then(i => {
                const d = i.val();
                let e = '';
                Object.keys(d).map(u => e = u);
                if (d[e].Gastado !== undefined) {
                    promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                        'Gastado': d[e].Gastado + (+data.Total)
                    }));
                    Object.keys(b).map(o => {
                        if ((d[e].Gastado + (+data.Total)) >= b[o].Cantidad) {
                            promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                                'Descuento': b[o].Procentaje
                            }));
                        }
                    })
                } else {
                    promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                        'Gastado': data.Total
                    }));
                }
            })
        })
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static pagar_extra(data = [], pago, cambio, mesa, cuenta, cliente = null) {
        let promises = [];
        let usuario = Helper_Usuario.Desencriptar();
        usuario = JSON.parse(usuario);
        promises.push(firebaseDatabase.ref('Ventas').push({
            'Fecha': Helper.Get_Fecha(),
            'Hora': Helper.Get_Hora(),
            'Productos': {...data.Productos},
            'Total': data.Total,
            'Usuario_ID': usuario.Usuario,
            'Mesa': mesa,
            'Pago': pago,
            'Cliente': cliente,
            'Cambio': cambio
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa + '/Cuenta' + cuenta).update({
            'Productos': null,
            'Total': 0
        }));
        this.Limites().then(e => {
            const b = e.val();
            this.Clientes_once(cliente).then(i => {
                const d = i.val();
                let e = '';
                Object.keys(d).map(u => e = u);
                if (d[e].Gastado !== undefined) {
                    promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                        'Gastado': d[e].Gastado + (+data.Total)
                    }));
                    Object.keys(b).map(o => {
                        if ((d[e].Gastado + (+data.Total)) >= b[o].Cantidad) {
                            promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                                'Descuento': b[o].Procentaje
                            }));
                        }
                    })
                } else {
                    promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                        'Gastado': data.Total
                    }));
                }
            })
        })
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static pagar_total(data = [], pago, cambio, mesa, cliente = null, total) {
        let promises = [];
        let productos = [];
        //console.log(total)
        if (data.Productos !== undefined) {
            Object.keys(data.Productos).map(e => {
                productos[e] = data.Productos[e];
            })
            // productos = productos.concat(data.Productos);
        }
        if (data.Cuenta.Productos !== undefined) {
            Object.keys(data.Cuenta.Productos).map(e => {
                productos[e] = data.Cuenta.Productos[e];
            })
            // productos = productos.concat(data.Cuenta.Productos)
        }
        if (data.Cuentas > 2) {
            for (let i = 2; i < data.Cuentas; i++) {
                if (data['Cuenta' + (i + 1)].Productos !== undefined) {
                    Object.keys(data['Cuenta' + (i + 1)].Productos).map(e => {
                        productos[e] = data['Cuenta' + (i + 1)].Productos[e];
                    })
                    // productos = productos.concat(data['Cuenta' + (i + 1)].Productos)
                }
            }
        }
        // console.log(productos)
        let usuario = Helper_Usuario.Desencriptar();
        usuario = JSON.parse(usuario);
        promises.push(firebaseDatabase.ref('Ventas').push({
            'Fecha': Helper.Get_Fecha(),
            'Hora': Helper.Get_Hora(),
            'Productos': {...productos},
            'Total': total,
            'Usuario_ID': usuario.Usuario,
            'Mesa': mesa,
            'Pago': pago,
            'Cambio': cambio,
            'Cliente': cliente
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa).update({
            'Productos': null,
            'Total': 0
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa + '/Cuenta').update({
            'Productos': null,
            'Total': 0
        }));
        for (let i = 2; i < data.Cuentas; i++) {
            promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa + '/Cuenta' + (i + 1)).update({
                'Productos': null,
                'Total': null
            }));
        }
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa).update({
            'Segunda_Cuenta': false
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + mesa).update({
            'Cuentas': 1
        }));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static alta_cuenta(mesa) {
        firebaseDatabase.ref('Mesas/Mesa' + mesa.Mesa + '/Cuenta').update({
            'Total': 0
        })
        firebaseDatabase.ref('Mesas/Mesa' + mesa.Mesa).update({
            'Segunda_Cuenta': true,
            'Cuentas': 2
        })
    }

    static extra_cuenta(mesa) {
        firebaseDatabase.ref('Mesas/Mesa' + mesa.Mesa).once('value', function (e) {
            const data = e.val();
            // console.log(data)
            firebaseDatabase.ref('Mesas/Mesa' + mesa.Mesa + '/Cuenta' + (+data.Cuentas + 1)).update({
                'Total': 0
            })
            firebaseDatabase.ref('Mesas/Mesa' + mesa.Mesa).update({
                'Segunda_Cuenta': true,
                'Cuentas': (+data.Cuentas + 1)
            })
        })
    }

    static delete_product_from_table(key, key_table, segunda, mesa = 0, product_ID, Cantidad_User, Precio, cuenta) {
        if (cuenta === 1) {
            firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Productos/' + key).set({
                Cantidad: null
            })
            firebaseDatabase.ref('Mesas/Mesa' + key_table).once('value', function (e) {
                firebaseDatabase.ref('Mesas/Mesa' + key_table).update({
                    Total: (+e.val().Total) - (+Precio * Cantidad_User)
                })
            })
            firebaseDatabase.ref('Product/' + product_ID).once('value', function (e) {
                firebaseDatabase.ref('Product/' + product_ID).update({
                    Cantidad: +e.val().Cantidad + (+Cantidad_User)
                })
            })
        } else if (cuenta === 2) {
            firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Cuenta/Productos/' + key).set({
                Cantidad: null
            })
            firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Cuenta').once('value', function (e) {
                firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Cuenta').update({
                    Total: (+e.val().Total) - (+Precio * Cantidad_User)
                })
            })
            firebaseDatabase.ref('Product/' + product_ID).once('value', function (e) {
                firebaseDatabase.ref('Product/' + product_ID).update({
                    Cantidad: +e.val().Cantidad + (+Cantidad_User)
                })
            })
        } else if (cuenta > 2) {
            firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Cuenta' + cuenta + '/Productos/' + key).set({
                Cantidad: null
            })
            firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Cuenta' + cuenta).once('value', function (e) {
                firebaseDatabase.ref('Mesas/Mesa' + key_table + '/Cuenta' + cuenta).update({
                    Total: (+e.val().Total) - (+Precio * Cantidad_User)
                })
            })
            firebaseDatabase.ref('Product/' + product_ID).once('value', function (e) {
                // console.log(product_ID)
                firebaseDatabase.ref('Product/' + product_ID).update({
                    Cantidad: +e.val().Cantidad + (+Cantidad_User)
                })
            })
        }
    }

    static number_account_by_table(key_table) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + key_table).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static pagar_directa(productos = [], pago, cambio, pagar, cliente = '') {
        let promises = [];
        let usuario = Helper_Usuario.Desencriptar();
        usuario = JSON.parse(usuario);
        if (cliente !== '') {
            promises.push(firebaseDatabase.ref('Ventas').push({
                'Fecha': Helper.Get_Fecha(),
                'Hora': Helper.Get_Hora(),
                'Productos': {...productos},
                'Total': pagar,
                'Usuario_ID': usuario.Usuario,
                'Mesa': 100,
                'Pago': pago,
                'Cambio': cambio,
                'Cliente_CB': cliente
            }));
        } else {
            promises.push(firebaseDatabase.ref('Ventas').push({
                'Fecha': Helper.Get_Fecha(),
                'Hora': Helper.Get_Hora(),
                'Productos': {...productos},
                'Total': pagar,
                'Usuario_ID': usuario.Usuario,
                'Mesa': 100,
                'Pago': pago,
                'Cambio': cambio
            }));
        }
        Object.keys(productos).map(e => {
            firebaseDatabase.ref('Product/' + productos[e].Producto_ID).once('value', function (i) {
                const d = i.val();
                promises.push(firebaseDatabase.ref('Product/' + productos[e].Producto_ID).update({
                    'Cantidad': +d.Cantidad - (productos[e].Cantidad)
                }))
            })
        })
        this.Limites().then(e => {
            const b = e.val();
            this.Clientes_once(cliente).then(i => {
                const d = i.val();
                let e = '';
                Object.keys(d).map(u => e = u);
                if (d[e].Gastado !== undefined) {
                    promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                        'Gastado': d[e].Gastado + (+pagar)
                    }));
                    Object.keys(b).map(o => {
                        if ((d[e].Gastado + (+pagar)) >= b[o].Cantidad) {
                            promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                                'Descuento': b[o].Procentaje
                            }));
                        }
                    })
                } else {
                    promises.push(firebaseDatabase.ref('Clientes/' + e).update({
                        'Gastado': pagar
                    }));
                }
            })
        })
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static pagar_libre(productos = []) {
        let promises = [];
        let usuario = Helper_Usuario.Desencriptar();
        usuario = JSON.parse(usuario);
        let total = 0;
        Object.keys(productos).map(e => {
            total = (+total + (+productos[e].Precio))
        })
        promises.push(firebaseDatabase.ref('Ventas').push({
            'Fecha': Helper.Get_Fecha(),
            'Hora': Helper.Get_Hora(),
            'Productos': {...productos},
            'Total': total,
            'Usuario_ID': usuario.Usuario,
            'Mesa': 99,
            'Pago': 0,
            'Cambio': 0
        }));
        Object.keys(productos).map(e => {
            //console.log(productos[e].Producto_ID)
            firebaseDatabase.ref('Product/' + productos[e].Producto_ID).once('value', function (i) {
                const d = i.val();
                promises.push(firebaseDatabase.ref('Product/' + productos[e].Producto_ID).update({
                    'Cantidad': +d.Cantidad - (productos[e].Cantidad)
                }))
            })
        })
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static liberar(id) {
        let promises = [];
        let account = 0;
        promises.push(
            this.mesas(id).then(e => {
                const data = e.val();
                let mesas = [];
                if (data.Total == 0) {
                    account++;
                    mesas.push(true)
                } else {
                    mesas.push(false);
                }
                if (data.Segunda_Cuenta === true) {
                    if (data.Cuenta.Total == 0) {
                        account++;
                        mesas.push(true)
                    } else {
                        mesas.push(false);
                    }
                }
                if (data.Cuentas > 2) {
                    for (let i = 2; i < data.Cuentas; i++) {
                        if (data['Cuenta' + (i + 1)].Total == 0) {
                            account++;
                            mesas.push(true)
                        } else {
                            mesas.push(false);
                        }
                    }
                }
                let temp = mesas.find(e => e == false);
                if (temp == undefined) {
                    return this.clean_desk(id, account).then(e => {
                        return true;
                    }).catch(e => {
                        return false;
                    })
                } else {
                    return false;
                }
            })
        );
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static clean_desk(id, account) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + id).update({
            'Productos': null,
            'Segunda_Cuenta': false,
            'Total': 0,
            'Cuentas': 1
        }));
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + id + '/Cuenta').update({
            'Productos': null,
            'Total': 0
        }));
        if (account > 2) {
            console.log('l')
            for (let i = 2; i < account; i++) {
                promises.push(firebaseDatabase.ref('Mesas/Mesa' + id + '/Cuenta' + (i + 1)).update({
                    'Productos': null,
                    'Total': null
                }));
            }
        }
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static mesas(data) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Mesa' + data).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

}

export default HelpersVenta;
