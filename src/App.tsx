import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Components/Todolist/Todolist';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodoListType={
    id:string,
    title:string,
    filter:FilterType
}
export type FilterType="All"|"Active"|"Completed"
function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'JavaScript', isDone: true},
    ])

    //funtions




    //filter


    let [todolists, setTodolist]=useState<Array<TodoListType>>([
        {id:v1(), title:'What to learn', filter:'All'},
        {id:v1(), title:'What to byu', filter:'All'}
    ])

    let removeTask = (id: string) => {
        let newTasks = tasks.filter((t) => t.id !== id)
        setTasks(newTasks)
    }
    let changeFilter=(todoId:string,value:FilterType)=>{
        let newTd=todolists.find((t)=>t.id===todoId)
        if (newTd){
            newTd.filter=value;
            setTodolist([...todolists])
        }
    }
    let addTask=(title:string)=>{
        let newTask={id:v1(), title,isDone:false}
        setTasks([newTask, ...tasks])
    }
    let changeStatus=(id:string)=>{
        let change=tasks.map((t)=>{
            if (id===t.id){
                t.isDone=!t.isDone;
                return t
            } return  t
        })
        setTasks(change)
    }


    return (
        <div className="App">
            {
                todolists.map((tl)=>{
                    let todos=tasks;
                    if (tl.filter==='Completed'){
                        todos=tasks.filter((t)=>t.isDone===true)
                    }
                    if (tl.filter==='Active'){
                        todos=tasks.filter((t)=>t.isDone===false)
                    }


                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        filter={tl.filter}
                        changeStatus={changeStatus}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        tasks={todos}
                        title={tl.title}/>
                })

            }

        </div>
    );
}


export default App;
