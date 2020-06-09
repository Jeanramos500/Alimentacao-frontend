import React, {useState,useEffect} from 'react';
import api from './api';

function App() {

    const [lista, setLista] = useState([]); //Imutabilidade

    useEffect(()=>{
        api.get('/alimentacao').then((response) =>{
            const itens = response.data;
            setLista(itens);
        })
    },[])
    
    return (
    <table>
        {lista.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.quantidade}</td>
            <td>{item.gramas}</td>
        </tr>
    ))}
    </table>
    );
        }

export default App;
