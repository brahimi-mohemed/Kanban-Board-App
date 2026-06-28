import { useState, useRef, useEffect} from "react"


function Card(props){

    const {task, dispatch, isEditing, setEditingId} = props
    const editInput = useRef(null)
    const [error, setError] = useState("")


    const prevbtn = 
        <button className="prev_btn" 
            onClick={()=> dispatch({type: "PREV_MOVE_TASK", id : task.id})}>
            ◀
        </button>

    const nextbtn = 
        <button className="next_btn" 
            onClick={()=> dispatch({type: "NEXT_MOVE_TASK", id : task.id})}>
            ▶
        </button>

    const submitEdit = () => {
        if(editInput.current.value.trim() == ""){
            setError("Title Cannot Be Empty")
            return
        }
        dispatch({type :"EDIT_TASK", id :task.id, newTitle :editInput.current.value})
        setEditingId(0)
    }
    
    const handleEdit = () => {
        setEditingId(task.id)
    }
    
    const handleCancel = () => {
        setError("")
        setEditingId(0)
    }
    
    useEffect(() => {
        if (isEditing) {
            editInput.current.focus()
        }
    }, [isEditing])

    return (
        <div className="card">
            {   
                !isEditing?

                <h2 className="task_title">{task.title}</h2>
            :
                <>
                <input onChange={() => setError("")} ref={editInput}  defaultValue={task.title} onKeyDown={(e) => e.key === "Enter" && submitEdit()}/>
                {error && <p className="card_error_txt">{error} </p>}
                </>

            }
                <p className="task_date">{task.createdAt}</p>
            {

                !isEditing? 
            
                <div className="add_controls">
                    {task.status == "todo" && nextbtn}
                    {task.status == "doing" && <>{prevbtn}{nextbtn}</>}
                    {task.status == "done" && prevbtn}
                    <button onClick={handleEdit} className="edit_btn">Edit</button>
                    <button onClick={() => dispatch({type: "DELETE_TASK", id :task.id})} className="del_btn">Delete</button>
                </div>
            :
                <div className="edit_controls">
                    <button onClick={submitEdit} className="save_btn">Save</button>
                    <button onClick={handleCancel} className="cancel_btn">Cancel</button>
                </div>
            }
        </div>
    )
}

export default Card