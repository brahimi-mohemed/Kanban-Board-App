import { useState } from "react"

function AddTaskForm(props){

    const [error, setError] = useState("")
    const {taskInput, setTaskInput, dispatch} = props

    const handleInputChange = (e) => {
        setError("")
        setTaskInput(e.target.value)
    }

    const handleBtnClick = () => {
        if(taskInput.trim() === ""){
            setError("Task Title Cannot Be Empty")
            return
        }
        setTaskInput("")
        dispatch({type : "ADD_TASK", taskTitle : taskInput.trim()})
    }

    return(
        <div className="add_task_container">
            <label>Enter Task Name</label>
            <input 
                onChange={handleInputChange} 
                type="text"
                onKeyDown={(e) => {if (e.key === "Enter") handleBtnClick()}}
                value={taskInput} />
            <button onClick={handleBtnClick} className="add_task_btn">add Task</button>
            {error && <p className="error_txt">{error} </p>}
        </div>
    )

}

export default AddTaskForm