import Toolbar from "@/components/Toolbar"
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const formatarValorMonetario = (valor) => {
    valor.toFixed
    var valorFormatado = valor.toFixed(3).replace('.', ',');
    return "R$ " + valorFormatado;
}

export default function Home() {
    console.log("Powered by Luiz Henrique")
    const { data, error } = useSWR('/api/dashboard', fetcher, { refreshInterval: 100 })

    if (error) return <div>Failed to Load</div>

    return (
        <>
            <Toolbar />

            {
                data === undefined ?
                    <h4>Carregando...</h4>
                    :
                    <div className="container">
                        <div className="card">
                            <div className="card-content">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Descrição</th>
                                            <th>KM/L</th>
                                            <th>Preço Médio / L</th>
                                            <th>R$ Ultimo Abastecimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.descricao}</td>
                                                        <td>{parseFloat(item.kml).toFixed(2).replace('.', ',')}</td>
                                                        <td>{formatarValorMonetario(parseFloat(item.pml))}</td>
                                                        <td>{formatarValorMonetario(parseFloat(item.valorUltAbast))}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}