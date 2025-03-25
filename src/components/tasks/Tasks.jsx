import { useEffect, useState, useMemo } from "react"

import { DndContext, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import Task from "./Task"

export default function Tasks({ parent, section, tasks, setTasks, spaceLevel, isMountTask, isChangeSection }) {

	const childTasks = useMemo(() => {
		return (tasks || [])
			.filter(task => 
				(section ? task.section === section.id : task.section === null) &&
				(parent ? task.parent === parent.id : task.parent === null)
			)
			.sort((a, b) => a.order - b.order);
	}, [tasks, section, parent]);	
	
	const [activeId, setActiveId] = useState(null);
	const [draggingLevel, setDraggingLevel] = useState(null);

	const TasksMarkup = ({childTasks}) => {
		return childTasks.map(task => 
			<Task 
				key={`task-${task.id}`} 
				task={task}
				section={section}
				tasks={tasks}
				setTasks={setTasks}
				spaceLevel={spaceLevel}
				activeId={activeId}
				draggingLevel={draggingLevel}
				setDraggingLevel={setDraggingLevel}
				isMountTask={isMountTask}
				isChangeSection={isChangeSection}
			/>
		)
	}

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function moveTask(event) {
		setActiveId(null);

		const { active, over } = event;

		if (active.id !== over.id) {
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
	}

	function mountTask(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setTasks(prevTasks => {
				const dragTask = prevTasks.find(task => task.id === active.id);
				const dropTask = prevTasks.find(task => task.id === over.id);

				dragTask.parent = dropTask.id;
				return prevTasks;
			})
		}
	}

	return (
		<>
			{!isMountTask && !isChangeSection && (
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
								activeId={activeId}
								draggingLevel={draggingLevel}
								setDraggingLevel={setDraggingLevel}
								isMountTask={isMountTask}
								isChangeSection={isChangeSection}
							/>
						}
					</DragOverlay>
				</DndContext>
			)}

			{isMountTask && (
				<DndContext onDragStart={() => {}} onDragEnd={mountTask}>
					<TasksMarkup childTasks={childTasks} />
				</DndContext>
			)}

			{isChangeSection && <TasksMarkup childTasks={childTasks} />}
		</>
	)
}
