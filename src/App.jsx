import { useState, useReducer, useEffect } from "react"
import AddTaskForm from "./components/AddTaskForm"
import Board from "./components/Board"

function initializer(){
  const saved = localStorage.getItem("tasks")
  return saved ? JSON.parse(saved) : []
}

const reduce = (state, action) => {

  switch (action.type) {
    case "ADD_TASK" :{
      const newdate = new Date()
      const time = newdate.getHours().toString().padStart(2, '0') + ":" + newdate.getMinutes().toString().padStart(2, '0') + " " + newdate.getDate() + "/" + (newdate.getMonth() + 1) + "/" + newdate.getFullYear()

      const newtask = {
        id : crypto.randomUUID(),
        title : action.taskTitle,
        status : "todo",
        createdAt: time,
      }
      return ([...state, newtask])
    }

    case "DELETE_TASK" :{
      const newlist = state.filter(item => item.id !== action.id)
      return newlist
    }
    
    case "PREV_MOVE_TASK":{
      return state.map(task => {
        if(task.id !== action.id) return task

        return {...task, status: task.status === "done" ? "doing" : "todo"}
      })
    }

    case "NEXT_MOVE_TASK": {
      return state.map(task => {
        if(task.id !== action.id) return task

        return {...task, status: task.status === "todo" ? "doing" : "done"}
      })
    }

    case "EDIT_TASK" :{
      return state.map(task => {
        if (task.id !== action.id) return task

        return {...task, title : action.newTitle}
      })
    }

    default :
      return state
  }
}

function App() {

  const [taskInput, setTaskInput] =  useState("")
  const [tasks, dispatch] = useReducer(reduce, [], initializer)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <header>Kanban Board App</header>
      <AddTaskForm 
        taskInput={taskInput} setTaskInput={setTaskInput} dispatch={dispatch} 
      ></AddTaskForm>

      <Board
        tasks={tasks} dispatch={dispatch}
      ></Board>

    </>
  )
}

export default App
