import React, {useState,useEffect} from 'react';
import api from './api';

/*const lista=[
    {id: 1,name:'Estudar', done: false},
    {id: 2,name:'Comer', done: false},
    {id: 3,name:'Descansar', done: true},
]*/


function App() {

    const [lista, setLista] = useState([]); //Imutabilidade

    useEffect(()=>{
        api.get('/tarefas').then((response) =>{
            const itens = response.data;
            setLista(itens);
        })
    },[])
    
    return (
    <table>
        {lista.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
                <input type="checkbox" checked={item.done}/>
            </td>
        </tr>
    ))}
    </table>
    );
        }

export default App;
