import { useState, useEffect } from 'react'
import './App.css'

import { DndContext } from "@dnd-kit/core"
import Sections from "./components/sections/Sections"

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", order: 0, parent: null, section: 1 },
    { id: 2, title: "Task 2", order: 1, parent: null, section: 1 },
    { id: 3, title: "Task 3", order: 2, parent: null, section: 1 },
    { id: 4, title: "Task 4", order: 8, parent: null, section: 1 },
    { id: 5, title: "Task 5", order: 5, parent: null, section: 1 },
    { id: 6, title: "Task 6", order: 0, parent: 2, section: null },
    { id: 7, title: "Task 7", order: 1, parent: 2, section: null },
    { id: 8, title: "Task 8", order: 0, parent: 4, section: null },
    { id: 9, title: "Task 9", order: 0, parent: 8, section: null },
    { id: 10, title: "Task 10", order: 1, parent: 8, section: null },
    { id: 11, title: "Task 11", order: 0, parent: null, section: 2 },
    { id: 12, title: "Task 12", order: 0, parent: 11, section: null },
    { id: 13, title: "Task 13", order: 0, parent: 12, section: null }
  ]);

  const [sections, setSections] = useState([
    { id: 1, title: "Section A", order: 0 },
    { id: 2, title: "Section B", order: 3 },
    { id: 3, title: "Section C", order: 2 },
  ]);  

  const [isMountTask, setIsMountTask] = useState(false);
  const [isChangeSection, setIsChangeSection] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Shift") {
        setIsMountTask(true);
        setIsChangeSection(false);
      }

      if (event.key === "Control") {
        console.log("Control key!");
        setIsMountTask(false);
        setIsChangeSection(true);
      }
    }

    function handleKeyUp(event) {
      if (event.key === "Shift") {
        setIsMountTask(false);
      }

      if (event.key === "Control") {
        setIsChangeSection(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return (() => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    })
  }, []);

  useEffect(() => {
    if (isMountTask) {
      console.log("Mounting task");
    } else if (isChangeSection) {
      console.log("Changing section");
    } else {
      console.log("Sorting");
    }
  }, [isMountTask, isChangeSection])

  return (
      <Sections 
        sections={sections} 
        setSections={setSections}
        tasks={tasks}
        setTasks={setTasks}
        isMountTask={isMountTask}
        isChangeSection={isChangeSection}
      />
  )
}

export default App
