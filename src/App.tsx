import './App.css';
import {Todolist} from './Todolist';
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const addTask = (title: string) => {
        const task = {id: v1(), title, isDone: false}
        const newTask = [task, ...tasks]
        setTasks(newTask)
    }

    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {
            ...el,
            filter: value // присваеваем новый ключ
        } : el))
    }

    return (
        <div className="App">
            {todolists.map(todolist => {
                let tasksForTodolist = tasks;

                if (todolist.filter === "active") {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone);
                }
                return <Todolist
                    key={todolist.id}
                    todolistId={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={todolist.filter}
                />
            })}
        </div>
    );
}

export default App;
