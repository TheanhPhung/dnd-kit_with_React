import { useEffect, useState } from "react"

import { useDndMonitor } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import Tasks from "../tasks/Tasks"

export default function Section({ section, tasks, setTasks, hideTasks, setHideTasks }) {

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: section.id
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	const SectionMarkup = ({ section }) => {
		return (
			<div className={`card p-2 m-3 ${isDragging && "opacity-50"}`}>
				<div className="card-header text-secondary h5 fw-bold">
					{section.title}
				</div>
				<div className="card-body">
					{!hideTasks && 
						<Tasks
							parent={null}
							section={section}
							tasks={tasks}
							setTasks={setTasks}
							spaceLevel={1}
						/>
					}
				</div>
			</div>
		)
	}

	useDndMonitor({
		onDragStart(event) {
			setHideTasks(true);
		},
		onDragEnd(event) {
			setHideTasks(false);
		},
		onDragCancel(event) {
			setHideTasks(false);
		},
	});

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<SectionMarkup section={section} />
		</div>
	)
}
