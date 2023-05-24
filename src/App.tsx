import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Components/Todolist/Todolist';
import InputElement from "./Components/Input/InputElement";
import {Card, Menu, MenuProps} from 'antd';
import {LoginOutlined, MailOutlined} from '@ant-design/icons';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type FilterType = "All" | "Active" | "Completed"

function App() {
    const items: MenuProps['items'] = [
        {
            label: 'LOGIN',
            key: 'Login',
            icon: <LoginOutlined className={'icon'}/>,
        }
    ]
    //filter
    let todoID1 = v1();
    let todoID2 = v1();

    let [todolists, setTodolist] = useState<Array<TodoListType>>([
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({

        [todoID1]: [
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JavaScript', isDone: true},],
        [todoID2]: [
            {id: v1(), title: 'PC', isDone: true},
            {id: v1(), title: 'Playstation', isDone: false},
            {id: v1(), title: 'Weed', isDone: true},
        ]
    })


    let changeTitleTodo = (todoId: string, title: string) => {
        let newArr = todolists.map((t) => {
            if (todoId === t.id) {
                t.title = title;
                return t
            }
            return t
        })
        setTodolist(newArr)
    }
    let removeTodo = (id: string) => {
        let deleted = todolists.filter((r) => r.id !== id);
        setTodolist(deleted)
    }
    let addTodo = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            title,
            filter: 'All'
        }
        setTodolist([todoList, ...todolists])
        setTasks({...tasks, [todoList.id]: []})
    }
    let changeFilter = (todoId: string, value: FilterType) => {
        let newTd = todolists.find((t) => t.id === todoId)
        if (newTd) {
            newTd.filter = value;
            setTodolist([...todolists])
        }
    }

    let changTaskTitle = (todoId: string, taskId: string, title: string) => {
        let change = tasks[todoId].map((t) => {
            if (taskId === t.id) {
                t.title = title
                return t
            }
            return t
        })
        tasks[todoId] = change
        setTasks({...tasks})
    }

    let removeTask = (id: string, todoId: string) => {
        let taskObj = tasks[todoId]
        let newTasks = taskObj.filter((t) => t.id !== id)
        tasks[todoId] = newTasks
        setTasks({...tasks})
    }

    let addTask = (title: string, todoId: string) => {
        let newTask = {id: v1(), title, isDone: false}//create new object(task)
        let task = tasks[todoId];//get need tasks
        let newAlltasks = [newTask, ...task]//connect new and old tasks
        tasks[todoId] = newAlltasks//Rewrite needed tasks
        setTasks({...tasks})//reset tasks
    }
    let changeStatus = (id: string, todoId: string) => {
        let change = tasks[todoId].map((t) => {
            if (id === t.id) {
                t.isDone = !t.isDone;
                return t
            }
            return t
        })
        tasks[todoId] = change
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <Menu
                triggerSubMenuAction={'hover'}
                selectable={false}
                style={{fontSize: '35px', fontWeight: '700', color: '#fff', height: '70px', alignItems: 'center'}}
                mode="horizontal"
                theme={"dark"}
                items={items}/>;
            <InputElement add={addTodo}/>
            <div className={'todos'}>
                {
                    todolists.map((tl) => {
                        let todos = tasks[tl.id];

                        if (tl.filter === 'Completed') {
                            todos = todos.filter((t) => t.isDone === true)
                        }
                        if (tl.filter === 'Active') {
                            todos = todos.filter((t) => t.isDone === false)
                        }
                        return <Card className={'cart'} hoverable={true}>
                            <Todolist
                                changeTitleTodo={changeTitleTodo}
                                changTaskTitle={changTaskTitle}
                                removeTodo={removeTodo}
                                key={tl.id}
                                id={tl.id}
                                filter={tl.filter}
                                changeStatus={changeStatus}
                                addTask={addTask}
                                changeFilter={changeFilter}
                                removeTask={removeTask}
                                tasks={todos}
                                title={tl.title}/>
                        </Card>
                    })
                }
            </div>
        </div>
    );
}
export default App;
