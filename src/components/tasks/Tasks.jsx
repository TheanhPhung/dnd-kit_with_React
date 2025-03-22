import { useEffect, useState } from "react"

import { DndContext, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

import Task from "./Task"

export default function Tasks({ parent, section, tasks, setTasks, spaceLevel }) {
	const [childTasks, setChildTasks] = useState([
		...(tasks || []).filter(task => task.section === section.id && (parent ? task.parent === parent.id : !task.parent))
	].sort((a, b) => a.order - b.order));

	const [activeId, setActiveId] = useState(null);

	const TasksMarkup = ({childTasks}) => {
		return childTasks.map(task => 
			<Task 
				key={`task-${task.id}`} 
				task={task}
				section={section}
				tasks={tasks}
				setTasks={setTasks}
				spaceLevel={spaceLevel}
				activeLevel={activeLevel}
				setActiveLevel={setActiveLevel}
				activeId={activeId}
			/>
		)
	}

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function moveTask(event) {
		setActiveId(null);

		const { active, over } = event;

		const activeTask = tasks.find(task => task.id === active.id);
		const overTask = tasks.find(task => task.id === over.id);

		setTasks(prevTasks => {
			const oldIndex = childTasks.findIndex(task => task.id === active.id);
			const newIndex = childTasks.findIndex(task => task.id === over.id);

			const newChildTasks = arrayMove(childTasks, oldIndex, newIndex).map((task, index) => ({
				...task,
				order: index
			}));

			return prevTasks.map(task => {
				const updateTask = newChildTasks.find(t => t.id === task.id);
				return updateTask ? updateTask : task;
			})
		})

	}


	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={moveTask}>
			<SortableContext items={childTasks.map(task => task.id)}>
				<TasksMarkup childTasks={childTasks} /> 
			</SortableContext>

			<DragOverlay>
				{activeId && 
					<Task
						task={childTasks.find(task => task.id === activeId)}
						section={section}
						tasks={tasks}
						setTasks={setTasks}
						spaceLevel={spaceLevel}
						activeLevel={activeLevel}
						setActiveLevel={setActiveLevel}
						activeId={activeId}
					/>
				}
			</DragOverlay>
		</DndContext>
	)
}
