import Card from "./Card"


function Column(props){

    const {editingId, setEditingId} = props 

    return (
        <><div className="column">
            <h1>{props.header} </h1>

            {props.tasks.length === 0 ? (
                <p className="msg_txt">no tasks yet</p>
            ):
            props.tasks.map(task => 
                <Card key={task.id} task={task} isEditing={task.id === editingId ? true : false} setEditingId={setEditingId} dispatch={props.dispatch}></Card>
            )}
        </div>
        </>
    )

}


export default Column