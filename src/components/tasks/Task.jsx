import { useEffect, useState } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import Tasks from "./Tasks"

export default function Task({ task, section, tasks, setTasks, spaceLevel, activeLevel, setActiveLevel, activeId }) {

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	const TaskMarkup = ({ task }) => {
		return (
			<>
				<div
					className={`${spaceLevel=== 1 && "mt-2"}`}
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(20, 1fr)",
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
				<Tasks 
					parent={task} 
					section={section} 
					tasks={tasks} 
					setTasks={setTasks} 
					spaceLevel={spaceLevel + 1}
					activeLevel={activeLevel}
					setActiveLevel={setActiveLevel}
					activeId={activeId}
				/>
			</>
		)
	}

	return (
		<div
			className={isDragging ? "opacity-50" : null}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{activeLevel && spaceLevel > activeLevel ? null :
				<TaskMarkup task={task} />
			}
		</div>
	)
}
