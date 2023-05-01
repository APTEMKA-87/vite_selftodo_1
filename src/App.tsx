import './App.css'
import Todolist from "./Todolist";
import {useState} from "react";


type SexType = 'man' | 'woman'

export type PioplesType = {
    name: string
    age: number
    sex: SexType
}

function App() {

    const pioples: PioplesType[] = [
        {name: 'Bob', age: 20, sex: 'man'},
        {name: 'Jim', age: 30, sex: 'man'},
        {name: 'Jo', age: 40, sex: 'man'},
        {name: 'Marta', age: 20, sex: 'woman'},
        {name: 'Lisa', age: 30, sex: 'woman'},
        {name: 'Anna', age: 40, sex: 'woman'},
        {name: 'Helen', age: 50, sex: 'woman'},
    ]

    const [filter, setFilter] = useState('')

    let filteredPioples = pioples

    if (filter === 'Man') {
        filteredPioples = pioples.filter(p => p.sex === 'man')
    }

    const sexFilter = (value: string) => {
        setFilter(value)
    }

    return (
        <div className='App'>
            <Todolist
                pioples={filteredPioples}
                sexFilter={sexFilter}
            />
        </div>
    )
}

export default App
