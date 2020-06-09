import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {

    const [lista, setLista] = useState([]); //Imutabilidade
    const [loading, setLoading] = useState(true);

 
    //executa para obeter informações externas.
    useEffect(()=>{
        api.get('/alimentacao').then((response) =>{
            const itens = response.data;
            setLista(itens);
            setLoading(false);
        })
    },[])
    
    return (
    <div style={{marginTop: '80px'}}>
{ loading ? <CircularProgress/> : <div/> }
        <Table>
            <TableBody>
                {lista.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>{item.gramas}</TableCell>
                </TableRow>
                 ))}
             </TableBody>
        </Table>
        <Link to="/create">Adicionar</Link><Button variant="contained" color="primary">
            Primary
        </Button>
    </div>
    );
        }

export default App;
