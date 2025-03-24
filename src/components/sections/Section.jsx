import { useEffect, useState } from "react"

import { DndContext, useDndMonitor, useDroppable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import Tasks from "../tasks/Tasks"

export default function Section({ section, tasks, setTasks, hideTasks, setHideTasks, isMountTask, isChangeSection }) {
	const SectionMarkup = ({ section, isDragging, isOver }) => {
		return (
			<div className={`card p-2 m-3 ${isDragging && "opacity-50"} ${isOver && "border border-danger"}`}>
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
							isMountTask={isMountTask}
							isChangeSection={isChangeSection}
						/>
					}
				</div>
			</div>
		)
	}

	const SortableSectionMarkup = ({ section }) => {
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
				<SectionMarkup 
					section={section} 
					isDragging={isDragging}
					isOver={false}
				/>
			</div>
		)
	}

	const DroppableSectionMarkup = ({ section }) => {
		const { isOver, setNodeRef } = useDroppable({
			id: section.id
		});

		return (
			<div ref={setNodeRef}>
				<SectionMarkup
					section={section}
					isDragging={false}
					isOver={isOver}
				/>
			</div>
		)
	}

	return (
		<>
			{!isChangeSection && <SortableSectionMarkup section={section} />}
			{isChangeSection && <DroppableSectionMarkup section={section} />}
		</>
	)
	
}
