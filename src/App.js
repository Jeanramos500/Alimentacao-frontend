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
    const [nome, setNome ] = useState('');
    const [quantidade, setQuantidade ] = useState('');
    const [gramas, setGramas] = useState('');
    const [botaoEditar, setBotaoEditar ] = useState(false);
    const [botaoAdicionar, setBotaoAdicionar ] = useState(false);
     const [idAlimento, setIdAlimento ] = useState('');
    
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
        setNome('');
        setQuantidade('');
        setIdAlimento('');
        setGramas('');
        setOpen(true);
        setBotaoAdicionar(true);
        setBotaoEditar(false);
    }

      function closeModal(){
        setOpen(false);
    }
    
    function addAlimentacao(){
        const name =nome
        const quantity = quantidade;
        const grams=gramas;
        api.post('/alimentacao', {nome:name,quantidade:quantity,gramas:grams}).then((response) =>{
        setAlimentacao('');
        setOpen(false);
        
        loadData();
    })
    }

    function openEditar(id,nome,quantidade,gramas){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setNome(nome);
        setQuantidade(quantidade);
        setGramas(gramas);
        setIdAlimento(id);
    }
    function editarAlimento(){
        api.put(`/alimentacao/${idAlimento}`,{nome:nome,quantidade:quantidade,gramas:gramas}).then((response) => {
            setOpen(false);
            setNome('');
            setQuantidade('');
            setGramas('');
            setIdAlimento('');
            loadData();
        });
    }
    //Apagar 
    function deleteAlimento(id){
    api.delete(`/alimentacao/${id}`).then((response)=>{
        loadData();
    })
    }


    return (
    <div style={{marginTop: '80px'}}>
        {loading ? <CircularProgress/> : <div/> }
        <Table>
            <TableHead>
                  <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Quantidade</TableCell>
                        <TableCell>Gramas</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
                {lista.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>{item.gramas}</TableCell>
                    <TableCell>
                        <Button 
                            onClick={() => deleteAlimento(item.id)}
                            variant="outlined" 
                            size="small" 
                            color="secondary">Apagar</Button>
                        <Button style={{marginLeft: '30px'}}
                            color="primary"
                            variant="outlined" 
                            onClick={() => openEditar(item.id,item.nome,item.quantidade,item.gramas)}
                            size="small"> 
                            Editar 
                        </Button>
                    </TableCell>
                </TableRow>
                 ))}
             </TableBody>
        </Table>
        <Button style={{marginTop: '30px'}} onClick={openModal} variant="contained" color="primary">
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
                type="text"
                fullWidth
                value={nome}
                onChange={e=> setNome(e.target.value)}
            />
               <TextField
                margin="dense"
                id="quantidade"
                label="Quantidade"
                type="number"
                fullWidth
                value={quantidade}
                onChange={e=> setQuantidade(e.target.value)}
            />
            <TextField
                margin="dense"
                id="gramas"
                label="Gramas"
                type="float"
                fullWidth
                value={gramas}
                onChange={e=> setGramas(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={closeModal} color="primary">
                Cancelar
            </Button>
            <Button onClick={botaoEditar ? editarAlimento : addAlimentacao } color="primary">
                Salvar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
        }

export default App;
