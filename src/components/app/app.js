import React, {useEffect, useState,} from 'react';
import Header from "../header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import AddTodo from "../add-todo";

import './app.css'

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [status, setStatus] = useState('all');
    const [searchInputText, setSearchInputText] = useState('');
    useEffect(() => {
       getItems();
    },[]);
    useEffect(() => {
        filterHandler();
        saveItems();
        Array.from(document.getElementsByClassName('statusBtn')).map((btn) => {
            btn.value === status ? btn.classList.add('active') : btn.classList.remove('active');
        });
    },[status,todos,searchInputText]);
    const saveItems = () => {
        localStorage.setItem('todo', JSON.stringify(todos));
        localStorage.setItem('btnStatus', status);
    };
    const getItems = () => {
        setTodos(JSON.parse(localStorage.getItem('todo')));
        setStatus(localStorage.getItem('btnStatus'));
    };
    const filterHandler = () => {
        switch (status) {
            case 'active':
                setFilteredTodos(todos.filter((todo) => todo.isActive));
                break;
            case 'done':
                setFilteredTodos(todos.filter((todo) => todo.isActive));
                break;
            case 'all':
                setFilteredTodos(todos)
        }
        if (status === 'active') {
            setFilteredTodos(todos.filter((todo) => todo.isActive))
        } else if (status === 'done') {
            setFilteredTodos(todos.filter((todo) => !todo.isActive))
        } else {
            setFilteredTodos(todos)
        }
    };
        return (
        <div className='main'>
            <div className='todo-container'>
                <Header todos={todos}/>
                <SearchPanel setStatus={setStatus} setSearchInputText={setSearchInputText}/>
                {filteredTodos.length === 0 ?
                    <div className='text-center mb-3 border p-2'>Here should be todo</div>
                    : <TodoList
                        todos={todos}
                        setTodos={setTodos}
                        filteredTodos={filteredTodos}
                        searchInputText={searchInputText}/>}
                <AddTodo
                    setTodos={setTodos}
                    setInput={setInput}
                    input={input}
                    todos={todos}/>
            </div>
        </div>
    );
}


export default App;