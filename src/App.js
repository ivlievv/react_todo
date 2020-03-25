import React,{useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./context";
import {object} from "prop-types";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";

function App() {

    const [loading,setLoading] = React.useState(true)
    const [todos,setTodos] = React.useState([]
/*        [
            {id:1, completed:false, title: 'Купить хлеб'},
            {id:2, completed:false, title: 'Купить масло'},
            {id:3, completed:false, title: 'Купить молоко'},

        ]*/
    )




    useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
        .then(response => response.json())
        .then(todos => {
            setTimeout(() =>{
                setTodos(todos)
                setLoading(false)
            },2000)

        })
    },[]);


    function toggleTodo(id) {
        setTodos (
            todos.map(todo => {
            if (todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })
        )
    }


    function removeTodo(id) {

        setTodos(todos.filter(todo => todo.id !== id))

    }

    
    function addTodo(title) {

            setTodos(todos.concat([{
                title,
                id:Date.now(),
                completed:false
            }]))
    }

    
  return (
      <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
            <h1>react tutorial</h1>
            <AddTodo onCreate={addTodo}/>
          {
              loading &&  <Loader/>
          }
          {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}/>) :
              (
                  loading ? null : (<p>No Todo</p>)
              ) }

      </div>
      </Context.Provider>
  )
}

export default App;
