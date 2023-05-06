import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Components/Todolist/Todolist';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterType="All"|"Active"|"Completed"
function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'JavaScript', isDone: true},
    ])

    let [filter, setFilter]=useState<FilterType>('All')
    //funtions

    let removeTask = (id: string) => {
        let newTasks = tasks.filter((t) => t.id !== id)
        setTasks(newTasks)
    }
    let changeFilter=(value:FilterType)=>{
        setFilter(value)
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


    //filter
    let todos=tasks;
    if (filter==='Completed'){
        todos=tasks.filter((t)=>t.isDone===true)
    }
    if (filter==='Active'){
        todos=tasks.filter((t)=>t.isDone===false)
    }

    return (
        <div className="App">
            <Todolist
                changeStatus={changeStatus}
                addTask={addTask}
                changeFilter={changeFilter}
                removeTask={removeTask}
                tasks={todos}
                title={'What to learn'}/>
        </div>
    );
}


export default App;
