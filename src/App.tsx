import './App.css'
import Todolist from "./Todolist";
import {v1} from "uuid";
import {useState} from "react";

function App() {


    const [tasks, SetTasks] = useState([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'Java', isDone: false}
    ])

    const addTask = () => {
        console.log('din')
    }

    const removeTask = () => {
        console.log('don')
    }

    return (
        <>
            <Todolist
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
            />
        </>
    )
}

export default App
