import React, { useEffect, useState } from 'react'
import { TextField, IconButton, Checkbox } from '@material-ui/core'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { api } from '../services/api'

interface TodoItem {
    id: number
    texto: string
    status: string
}

let count = 1

export const ToDoList: React.FC = () => {
    
    const [list, setList] = useState<TodoItem[]>([{ id: 0, texto: '', status: '' }])
    
    const [checkedState, setCheckedState] = useState(
        new Array(list.length).fill(false)
    );

    useEffect(() => {
        getAllItems();
    }, [])

    async function getAllItems() {
        const { data } = await api.get('items');
        data.map((data: TodoItem, index: number) => {
            checkedState[index] = data.status === 'I' ? true : false;
            // const textoItem = document.getElementsByClassName("MuiInputBase-input MuiInput-input");
            // if (checkedState[index]){
            //     TextField
            // }
        })
        setList(item => [...data]);
    }

    async function createNewItem(request: TodoItem) {
        await api.post('items', request);
    }

    async function updateItem(request: TodoItem, id: number) {
        await api.put(`items/${id}`, request);
    }

    async function deleteItem(id: number) {
        await api.delete(`items/${id}`);
    }

    async function statusItem(request: TodoItem, status: string) {
        request.status = status;
        await api.put(`items/status/${request.id}`, request);
        getAllItems()
    }

    const handleChange = (texto: string, id: TodoItem['id'], status: TodoItem['status']) => {
        const newItem = { id: id, texto: texto, status: status }
        updateItem(newItem, id)
        setList(prev => prev.map(item => item.id === id ? { ...item, texto } : item))
    }

    const handleDelete = (id: TodoItem['id']) => {
        deleteItem(id);
        setList(prev => prev.filter(item => item.id !== id))
    }

    const handleAdd = (index: number) => {
        const newItem = { id: count++, texto: '', status: 'A' }
        createNewItem(newItem)
        setList(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)])
        getAllItems()
    }

    const statusChange = (event: React.ChangeEvent<HTMLInputElement>, item: TodoItem, index: number) => {
        checkedState[index] = event.target.checked
        setCheckedState(checkedState);
        if (checkedState[index]) {
            statusItem(item, 'I');
        } else {
            statusItem(item, 'A');
        }
    }

    return (
        <div>
            <h2>
                Lista de tarefas set/2021
            </h2>
            {list.map((item, index) => (
                <div key={item.id}>
                    <FormControlLabel
                        control={<Checkbox checked={checkedState[index]} onChange={e => statusChange(e, item, index)} />}
                        label="" />
                    <TextField className={(item.status === "I" ? "lineThrough" : "")}
                        value={item.texto}
                        onChange={e => handleChange(e.currentTarget.value, item.id, item.status)}
                    />
                    <IconButton onClick={() => handleAdd(index)}>
                        <AddIcon />
                    </IconButton>
                    {list.length > 1 && (
                        <IconButton onClick={() => handleDelete(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}
        </div>
    )
}
