import { useState } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import Tasks from "../tasks/Tasks"

export default function Seciton({ section, tasks, setTasks, hideTasks, isOpacity }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: section.id
	})

	const style={
		transform: CSS.Transform.toString(transform),
		transition,
	}

	const SectionMarkup = () => {
		return (
			<div className={`card m-3 ${isOpacity && "opacity-25"}`}>
				<div className="card-header">
					{section.title}
				</div>
				{!hideTasks &&
					<div className="card-body">
						<Tasks 
							parent={section} 
							spaceLevel={1} 
						/>
					</div>
				}
			</div>
		)
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{SectionMarkup()}
		</div>
	) 
} 
