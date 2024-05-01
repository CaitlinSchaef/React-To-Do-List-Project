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



//initial State
export const initialState = {
    tasks: [
        // {
            // id: 0,
            // title: '',
            // status: , "complete" || "archived" || "todo"
            // description: '',
        // }s
    ]
}

//reducer
export const taskReducer = (state, action) => {
    switch(action.type) {
        case 'addTask':
            return {tasks: [...state.tasks, {id: state.tasks.length + 1, title: action.name, status: "to-do", description: ""}]}
        }
}

//The dispatch function returned by useReducer lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the dispatch function

// make a body const
const Body = () => {
    const {state, dispatch} = useContext(TaskContext)
    const [taskName, setTaskName] = useState('')
    useEffect (() => {
        
        // on first load 
        // read local storage - if it has anything in it, put it into your local state
        // localStorage.getItem('name', taskName) 

        // after first load if state.tasks changes
        // set local storage to be equal to state.tasks
        //  localStorage.setItem('name', taskName)
        
    }, [state.tasks])
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
                    value={taskName}
                    onChange={event => {setTaskName(event.target.value)}}
                    />
                <br />
                <button onClick={() => {dispatch({type: 'addTask', name: taskName})}}>Add Task</button>
                <br />

                <div className="overflow-scroll" style={{height: "60vh"}}>
                <h3>Tasks:</h3>
                    {state.tasks.map(task => (
                        <div key={task.id}>
                            <ListGroup>
                                <ListGroupItem action variant="info">{task.title}</ListGroupItem>
                            </ListGroup>
                        </div>
                    ))}
              </div>
              <br />
                <Link to='/'> 
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
  