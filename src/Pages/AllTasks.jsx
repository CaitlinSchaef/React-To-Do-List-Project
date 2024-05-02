import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ToDoFunc from './ToDoFunction'



function AllTasks() {

  return (
    <>
    <ToDoFunc />
    </>
  )
}

export default AllTasks
