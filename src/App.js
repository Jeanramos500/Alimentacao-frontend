import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';


function App() {

    const [lista, setLista] = useState([]); //Imutabilidade
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
 
    //executa para obeter informações externas.
    useEffect(()=>{
        api.get('/alimentacao').then((response) =>{
            const itens = response.data;
            setLista(itens);
            setLoading(false);
        })
    },[])

    function openModal(){
        setOpen(true);
    }

      function closeModal(){
        setOpen(false);
    }
    
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
        <Button onClick={openModal} variant="contained" color="primary">
            Adicionar
        </Button>
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle id="form-dialog-title">Adicionar</DialogTitle>
             <DialogContent>
                <DialogContentText>
                Digite a Alimentação correta
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Alimento"
                type="email"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={closeModal} color="primary">
                Cancelar
            </Button>
            <Button onClick={closeModal} color="primary">
                Salvar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
        }

export default App;
