import Layout from "../components/Layout";
import Column from "../components/Column";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Pedidos() {
    cosnt [pedidos, setPedidos] = useState([]);

    const getPedidos = async () => {
        const res = await api.get("/pedidos");
        setPedidos(res.data);
    };

    useEffect(() => {
        getPedidos();
    }, []);

    const cambiarEstado = async (id, estado) => {
        await api.patch(`/pedidos/${id}/estado`, { estado });
        getPedidos();
    };

    const filtrar = (estado) => {
        pedidos.filter(p => p.estado === estado);

    return (
        <Layout>
            <div className="grid grid-cols-3 gap-4">

                <Column titulo="Pendientes" pedidos={filtrar("Pendiente")} onchangeEstado={cambiarEstado} siguiente="EnProduccion"/>
                <Column titulo="En Producción" pedidos={filtrar("EnProduccion")} onchangeEstado={cambiarEstado} siguiente="Entregado"/>
                <Column titulo="Entregado" pedidos={filtrar("Entregado")}/>
 
            </div>
        </Layout>
        );
    }
}