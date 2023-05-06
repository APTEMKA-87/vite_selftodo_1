import './App.css'
import {TaskType, Todolist} from "./Todolist";
import {useState} from "react";


function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Hello world", isDone: true},
        {id: 5, title: "I am Happy", isDone: false}
    ])

    const removeId = (tId: number) => {
        const filteredTasks = tasks.filter(t => t.id !== tId)
        setTasks(filteredTasks)
        console.log('removeId')
        console.log(tasks)
    }

    return (
        <div className='App'>
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeId={removeId}
            />
        </div>
    )
}

export default App
