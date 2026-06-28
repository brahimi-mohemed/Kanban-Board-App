import Column from "./Column"
import { useState } from "react"


function Board(props){

    const [editingId, setEditingId] = useState(0)

    const todo_list = props.tasks.filter(task => task.status == "todo")
    const doing_list = props.tasks.filter(task => task.status == "doing")
    const done_list = props.tasks.filter(task => task.status == "done")

    return (
    <>
        <div className="board">
            <Column editingId={editingId} setEditingId={setEditingId} header={"To-Do"} tasks={todo_list} dispatch={props.dispatch}></Column>
            <Column editingId={editingId} setEditingId={setEditingId} header={"Doing"} tasks={doing_list} dispatch={props.dispatch}></Column>
            <Column editingId={editingId} setEditingId={setEditingId} header={"Done"} tasks={done_list} dispatch={props.dispatch}></Column>
        </div>
    </>
    )

}


export default Board