import './App.css'
import Todolist from "./Todolist";
import {v1} from "uuid";

function App() {

    const tasks = [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'Java', isDone: false}
    ]

    console.log(tasks[0].id)


    return (
        <>
            <Todolist
            tasks={tasks}
            />
        </>
    )
}

export default App
