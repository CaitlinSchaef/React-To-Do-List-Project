import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'; 
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { TaskContext } from '../main';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem } from 'react-bootstrap';

/*
Data Processing follows CRUD: 
C - create (data) setItem
R - read (that data) getItem
U - update (that data) setItem
D - delete (that data) removeItem
Applied in this app to local storage
*/

//initial State
export const initialState = 
    // Utilizing the Nullish operator to implement local storage on load
    // Setting the initial state to be the local storage if it is storing anything
    JSON.parse(localStorage.getItem("state.tasks")) ??
    // an empty array of 'tasks' we would only need to give it values if we needed something to start out on the page really (or just have an initial value)
    {tasks: [
        // {
            // id: 0,
            // title: '',
            // status: , "complete" || "archived" || "todo"
            // description: '',
        // }s
    ]};

//reducer
export const taskReducer = (state, action) => {
    switch(action.type) {
        //original case for adding task
        case 'addTask':
            return {tasks: [...state.tasks, {id: state.tasks.length + 1, title: action.name, status: "to-do", description: ""}]}
        //case for editing 
        case 'editTask':
          let updatedTask = [...state.tasks]
          // everyItem is every item in the updatedTask array list
          updatedTask = updatedTask.map(arrayItem => {
            //this line is checking if the id of an element matches the one that committed the action 
            if (arrayItem.id === action.task.id) {
                // everyItem.title && everyItem.description // we're returning something no matter what, an edited item, or in an else if a normal item 
              // set arrayItem.title to the value of action.newInformationThatHasComeToLightFromTheTextEnteredByTheUserIntoAnInputWhichWasAJSXElementOnTheScreen
                arrayItem.title = action.newInformation 
                return arrayItem
            } else {
              return arrayItem
            }
          })
          return {
            tasks: updatedTask
          }
          //case to set status
          // case 'changeStatus':
          //   let updatedStatus = [...state.tasks]
          //   updatedStatus = updatedStatus.map(arrayItem => {
          //     if (arrayItem.id === action.task.id) {
          //       arrayItem.status = action.newStatus
          //       return arrayItem
          //     } else {
          //       return arrayItem
          //     }
          //   })
          //delete all case
          case 'deleteAll':
            localStorage.clear("state.tasks")  
            return initialState
    }
}

//making a checkbox function?
// const Checkbox = (props) => {
//   return <input type="checkbox" checked={props.checkBox} 
//           onClick={() => {dispatch({type: 'updateStatus', task: task,  newStatus: updatedStatus})}}
//           />
// }

//The dispatch function returned by useReducer lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the dispatch function

// make a body const
const Body = () => {
    const {state, dispatch} = useContext(TaskContext)

    // on first load 
    // read local storage - if it has anything in it, put it into your local state
    // localStorage.getItem('name', taskName) 
    const [taskName, setTaskName] = useState('')
    //setting a state of editing, set to false to start
    const [showEditInput, setShowEditInput] = useState(false)
    // this works with showEditInput, it is what holds the state of the edited task
    const [editedTask, setEditedTask] = useState('')
    //we're setting checkbox state here, setting it to start as false
    // const [checkBox, setCheckBox] = useState(false)

    // after first load if state.tasks changes
    // set local storage to be equal to state.tasks
    //  localStorage.setItem('name', taskName)
    useEffect(() => {
      localStorage.setItem("state.tasks", JSON.stringify(state));
    }, [state.tasks]);


    return (
      <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
      minBreakpoint="xs"
      >
        <Container>
          <Row className="justify-content-center m-3">
            <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
                <h1>ToDo & Completed</h1>
                {/* task input field and action button */}
                <input
                    placeholder="Task Name"
                    aria-label="Task Name"
                    value={taskName}
                    onChange={event => {setTaskName(event.target.value)}}
                    />
                    {/* <input
                    placeholder="Task Description"
                    aria-label="Task Description"
                    value={state.tasks.description}
                    onChange={event => {setTaskName(event.target.value)}}
                    /> */}
                <br />
                <button onClick={() => {dispatch({type: 'addTask', name: taskName})}}>Add Task</button>
                <br />

                <div className="overflow-scroll" style={{height: "60vh"}}>
                <h3>Tasks:</h3>
                    {state.tasks.map(task => (
                        <div key={task.id}>
                            <ListGroup>
                                {/* <Checkbox value={checkBox} setValue={setCheckBox}></Checkbox> */}
                                <ListGroupItem action variant="info">{task.title}</ListGroupItem>
                                {/* This button needs to bring up a text box or something that we can edit the fields*/}
                                <button size="sm"
                                onClick={() => setShowEditInput(true)}
                                > Edit Task </button>
                                {/* This input field should occur when the edit task button is clicked  */}
                                {showEditInput ? (
                                  <>
                                    <input 
                                      placeholder="Edit Task Name"
                                      aria-label="Edit Task Name"
                                      value={editedTask}
                                      onChange={event => {setEditedTask(event.target.value)}}
                                    />
                                      {/* This button then needs to send the updated task up to the reducer where it will change the info*/}
                                    <button size="sm"
                                      onClick={() => {
                                        setShowEditInput(false)
                                        dispatch({type: 'editTask', task: task, newInformation: editedTask})
                                      }}
                                    >Update Task</button>
                                  </>
                                  ) : null
                                }
                            </ListGroup>
                        </div>
                    ))}
              </div>
              <br />
                <Link to='/'> 
                  <button onClick={() => {dispatch({type: 'deleteAll'})}}>Clear All Tasks</button>
                    <br />
                  <button> Home  </button>
                </Link> <br />
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    )
  }


function ToDoFunc() {

    return (
      <>
     <Body />
      </>
    )
  }
  
  export default ToDoFunc
  