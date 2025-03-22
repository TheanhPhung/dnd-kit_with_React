import { useState, useEffect, useMemo } from "react"

import { DndContext, DragOverlay } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

import Task from "./Task"

export default function Tasks({ section, parent, spaceLevel, tasks, setTasks }) {
	const [childTasks, setChildTasks] = useState([]);

	const [activeId, setActiveId] = useState(null);
	const [draggingLevel, setDraggingLevel] = useState(null);
	
	const TasksMarkup = ({ childTasks }) => {
		return (
			childTasks.map(task => 
				<Task 
					key={`task-${task.id}`} 
					task={task} 
					tasks={tasks}
					setTasks={setTasks}
					spaceLevel={spaceLevel}
					draggingLevel={draggingLevel}
					setDraggingLevel={setDraggingLevel}
				/>
			)
		)
	}

	useEffect(() => {
		return setChildTasks(tasks.map(task => {
			if (!task.parent && task.section === section.id) return task;
			return null;
		}))
	}, []);

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function handleDragEnd(event) {
		setActiveId(null);

		const { active, over } = event;

		if (!over || !over.id || active.id === over.id) return;

		setChildTasks(prevTasks => {
			const oldIndex = prevTasks.findIndex(task => task.id === active.id);
			const newIndex = prevTasks.findIndex(task => task.id === over.id);

			const newTasks = arrayMove(prevTasks, oldIndex, newIndex);

			return newTasks.map((task, index) => ({
				...task,
				order: index
			}))
		});
	}


	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<SortableContext items={childTasks.map(task => task.id)}>
				<TasksMarkup childTasks={childTasks} />
			</SortableContext>

			<DragOverlay>
				{activeId ? (
					<Task 
						task={childTasks.find(task => task.id === activeId)}
						spaceLevel={spaceLevel}
						isSortingTasks={true}
						draggingLevel={draggingLevel}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	) 
}
