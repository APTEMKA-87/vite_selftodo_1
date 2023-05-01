import {PioplesType} from "./App";

type PropsType = {
    pioples: PioplesType[]
    sexFilter: (value: string) => void
}

const Todolist = (props: PropsType) => {
    return (
        <div>

            {props.pioples.map(p => {
                return <ul>
                    <li>{p.name}</li>
                    <li>{p.age}</li>
                    <li>{p.sex}</li>
                </ul>
            })}

            <button onClick={() => {props.sexFilter('Man')
            }}>Man
            </button>
            <button>Woman</button>
            <button>Older 30</button>
        </div>
    );
};

export default Todolist;