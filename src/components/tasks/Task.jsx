import { useState, useEffect } from "react"

import Tasks from "./Tasks"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function Task({ task, spaceLevel, isSortingTasks, draggingLevel, setDraggingLevel }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: task.id
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	useEffect(() => {
		console.log("Task: ", task.title, " - Space level: ", spaceLevel, " - Dragging level: ", draggingLevel);
	}, []);

	useEffect(() => {
		if (isDragging) {
			setDraggingLevel(spaceLevel);
		}
	}, []);

	const TaskMarkup = () => {
		return (
			<>
				<div 
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(20, 1fr)"
					}}
				>
					<div 
						className="card p-2 m-1"
						style={{
							gridColumnStart: spaceLevel,
							gridColumnEnd: 21,
						}}
					>
						{task.title}
					</div>
				</div>
				{(!draggingLevel || spaceLevel < draggingLevel) &&
					<Tasks 
						parent={task} 
						spaceLevel={spaceLevel + 1} 
						isSortingTasks={isSortingTasks} 
					/>
				}
			</>
		)
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{TaskMarkup()}
		</div>
	)
}
