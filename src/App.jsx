import { useState, useEffect } from 'react'
import './App.css'

import Sections from "./components/sections/Sections"

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", order: 0, children: [] },
    { id: 2, title: "Task 2", order: 1, children: [
      { id: 8, title: "Task 8", order: 0, children: [
        { id: 9, title: "Task 9", order: 0, children: [] },
        { id: 10, title: "Task 10", order: 1, children: [] }
      ]}
    ] },
    { id: 3, title: "Task 3", order: 2, children: [] },
    { id: 4, title: "Task 4", order: 5, children: [
      { id: 6, title: "Task 6", order: 0, children: [] },
      { id: 7, title: "Task 7", order: 1, children: [] }
    ] },
    { id: 5, title: "Task 5", order: 4, children: [] }
  ]);

  const [sections, setSections] = useState([
    { id: 1, title: "Section A", order: 0, children: tasks },
    { id: 2, title: "Section B", order: 3, children: [] },
    { id: 3, title: "Section C", order: 2, children: [] },
  ]);  

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

{/*  useEffect(() => {*/}
      {/*function handleKeyDown(event) {*/}
          {/*if (event.key === "Shift") {*/}
              {/*setIsSortingSections(false);*/}
              {/*setIsSortingTasks(true);*/}
          {/*}*/}
      {/*}*/}

      {/*function handleKeyUp(event) {*/}
          {/*if (event.key === "Shift") {*/}
              {/*setIsSortingSections(true);*/}
              {/*setIsSortingTasks(false);*/}
          {/*}*/}
      {/*}*/}

      {/*window.addEventListener("keydown", handleKeyDown);*/}
      {/*window.addEventListener("keyup", handleKeyUp);*/}

      {/*return () => {*/}
          {/*window.removeEventListener("keydown", handleKeyDown);*/}
          {/*window.removeEventListener("keyup", handleKeyUp);*/}
      {/*}*/}
  {/*}, []);*/}


  return (
    <>
      <Sections 
        sections={sections} 
        setSections={setSections}
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  )
}

export default App
