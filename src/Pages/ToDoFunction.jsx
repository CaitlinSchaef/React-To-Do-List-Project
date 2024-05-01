import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'; 
import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { TaskContext } from '../main';



//initial State
export const initialState = {
    tasks: [
        // id: "",
        // title: ,
        // status: , (like todo or complete or archived)
        // description: ,
    ]
}

//reducer
export const taskReducer = (state, action) => {
    switch(action.type) {
        case 'addTask':
            return {tasks: [...state.tasks, {id: state.tasks.length + 1, title: action.name, status: "need to complete", description: ""}]}
    }
}

// make a body const
const Body = () => {
    const {state, dispatch} = useContext(TaskContext)
    const [taskName, setTaskName] = useState('')
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
                    onChange={event => setTaskName(event.target.value)}
                />
                <br />
                <button onClick={() => dispatch({type: 'addTask', name: taskName})}>Add Task</button>
                <br />

                <div className="overflow-scroll" style={{height: "60vh"}}>
                <h3>Tasks:</h3>
                    {state.tasks.map(task => (
                        <div key={task.id}>
                            <div>
                                {task.title}
                            </div>
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
  