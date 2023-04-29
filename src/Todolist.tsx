import React from 'react';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tasks: TasksType[]
}

const Todolist = (props: PropsType) => {
    return (
        <>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(el => <li>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>)}
                </ul>
            </div>
        </>
    );
};

export default Todolist;