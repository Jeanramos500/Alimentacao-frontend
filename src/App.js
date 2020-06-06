import React from 'react';

const lista=[
    {id: 1,name:'Estudar', done: false},
    {id: 2,name:'Comer', done: false},
    {id: 3,name:'Descansar', done: true},
]


function App() {

    return (
    <table>
        {lista.map(item => (
        <tr>
            <td>id</td>
            <td>name</td>
            <td>done</td>
        </tr>
    ))}
    </table>
    );
        }

export default App;
