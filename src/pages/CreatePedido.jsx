import { useState, useEffect } from "react";
import api from "../api/axios";

export default function CreatePedido() {
    const [productos, setProductos] = useState([]);
    const [detalle, setDetalle] = useState([]);
    const [form, setForm] = useState({
        clienteNombre: "",
        tipo: "",
        direccion: "",
        telefono: ""
    });

    useEffect(() => {
        api.get("/productos").then(res => setProductos(res.data));
    }, []);

    const agregarProducto = (producto) => {
        setDetalle([...detalle, 
            { 
                productoId: producto.id, 
                productoNombre: producto.nombre,
                cantidad: 1,precio: producto.precio
            }
        ]);
    };

    const createPedido = async () => {
        const payload = { 
            clienteNombre: form.clienteNombre,
            tipo: form.tipo,
            direccion: form.direccion,
            telefono: form.telefono,
            detalles: detalle.map(d => ({
                productoId: d.productoId,
                cantidad: d.cantidad,
                precio: d.precio
            }))
        };

        await api.post("/pedidos", payload);
        alert("Pedido creado!");
    };

    return (
        <div className="bg-white p-6 rounded-xñ1 shadow-lg">
            
            <h2 className="text-xl font-bold mb-4">Nuevo Pedido</h2>

            <input className="border p-2 w-full mb-3"
            placeholder="Cliente"
            onChange={e => setForm({...form, clienteNombre: e.target.value})}
            />

            <Select
                className="border p-2 w-full mb-3"
                onChange={e => setForm({...form, tipo: e.target.value})}
            >
                <option value="ParaMesa">Para la Mesa</option>
                <option value="ParaLlevar">Para Llevar</option>
                <option value="Delivery">Delivery</option>
            </Select>

                <input className="border p-2 w-full mb-3"
                placeholder="Dirección"
                onChange={e => setForm({...form, direccion: e.target.value})}
                />

                <input className="border p-2 w-full mb-3"
                placeholder="Teléfono"
                onChange={e => setForm({...form, telefono: e.target.value})}
                />

                {/* PRODUCTOS */}
                <h3 className="font-bold mt-4">Productos</h3>

                <div className="grid grid-cols-3 gap-3">
                    {productos.map(p => (
                        <button
                            key={p.id}
                            onClick={() => agregarProducto(p)}
                            className="bg-blue-500 text-white p-2 rounded-lg"
                        >
                            {p.nombre} - Bs {p.precio}
                        </button>
                    ))}
                </div>

                {/* DETALLE */}
                <div className="mt-4">
                    {detalle.map((d, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{d.productoNombre} x {d.cantidad}</span>
                            <span>Bs {d.precio * d.cantidad}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={createPedido}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Crear Pedido
                </button>
            
        </div>
    );
}