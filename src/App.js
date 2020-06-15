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
    const [alimentacao, setAlimentacao]= useState('');
    const [ nome, setNome ] = useState('');
 
    //executa para obeter informações externas.
    useEffect(()=>{
            loadData();
            setLoading(false);
    },[])

    function loadData(){
    api.get('/alimentacao').then((response) =>{
            const itens = response.data;
            setLista(itens);
        });
    }

    function openModal(){
        setOpen(true);
    }

      function closeModal(){
        setOpen(false);
    }
    
    function addAlimentacao(){
        const name =nome;
        api.post('/alimentacao', {nome:name}).then((response) =>{
        setAlimentacao('');
        setOpen(false);
        
        loadData();
    })
    }

    //Apagar 
    function deleteAlimento(id){
    api.delete(`/alimentacao/${id}`).then((response)=>{
        loadData();
    })
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
                    <TableCell>
                        <Button variant="outlined" size="small"  onClick={() => deleteAlimento(item.id)}>Apagar</Button>
                    </TableCell>
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
                id="nome"
                label="Alimento"
                type="email"
                fullWidth
                value={alimentacao}
                onChange={e=> setAlimentacao(e.target.value)}
            />
               <TextField
                autoFocus
                margin="dense"
                id="quantidade"
                label="Quantidade"
                type="number"
                fullWidth
                value={alimentacao}
                onChange={e=> setAlimentacao(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={closeModal} color="primary">
                Cancelar
            </Button>
            <Button onClick={addAlimentacao} color="primary">
                Salvar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
        }

export default App;
