import { useEffect, useState } from "react"

import { useDroppable, useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

import Tasks from "./Tasks"

export default function Task({ task, section, tasks, setTasks, spaceLevel, activeId, draggingLevel, setDraggingLevel, isMountTask, isChangeSection }) {

	const TaskMarkup = ({ task, isOver }) => {
		function unindentTask() {
			setTasks(prevTasks => prevTasks.map(el =>
				el.id === task.id
				? { ...el, parent: prevTasks.find(t => t.id === task.parent).parent || null } 
				: el
			));
		}

		function unmountTask() {
			setTasks(prevTasks => prevTasks.map(el => 
				el.id === task.id
				? {
					...el,
					parent: null
				}
				: el
			));
		}

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
						className={`card p-2 m-1 ${isOver && "border border-danger"}`}
						style={{
							gridColumnStart: spaceLevel,
							gridColumnEnd: 21,
						}}
					>
						<div className="d-flex justify-content-between">
							<div className="d-flex flex-column justify-content-center h-100">
								<span className="">{task.title}</span>
							</div>
							{spaceLevel > 1 && (
								<div className="flex-item">
									<button
										className="btn btn-outline-dark me-2"
										onPointerDown={() => unindentTask()}
									>
										<FontAwesomeIcon icon={faAngleLeft} />
									</button>
									<button 
										className="btn btn-outline-dark"
										onPointerDown={() => unmountTask()}
									>
										<FontAwesomeIcon icon={faAngleDoubleLeft} />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				{!(draggingLevel && draggingLevel >= spaceLevel) && 
					<Tasks 
						parent={task} 
						section={section} 
						tasks={tasks} 
						setTasks={setTasks} 
						spaceLevel={spaceLevel + 1}
						activeId={activeId}
						isMountTask={isMountTask}
					/>
				}
			</>
		)
	}

	const SortableTask = ({ task }) => {
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

		useEffect(() => {
			isDragging && setDraggingLevel(spaceLevel);
		}, [isDragging]);

		return (
			<div
				className={isDragging ? "opacity-50" : null}
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				<TaskMarkup task={task} />
			</div>
		)
	}

	const DragAndDropTask = ({ task }) => {
		const { isOver, setNodeRef:setDropRef } = useDroppable({
			id: task.id
		});

		const {
			attributes,
			listeners,
			setNodeRef:setDragRef,
			transform,
			transition,
			isDragging
		} = useDraggable({
			id: task.id
		})

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
		};
		
		useEffect(() => {
			isDragging && setDraggingLevel(spaceLevel);
		}, [isDragging]);

		return (
			<div ref={setDropRef}>
				<div
					ref={setDragRef}
					style={style}
					{...attributes}
					{...listeners}
				>
					<TaskMarkup task={task} isOver={isOver} />
				</div>
			</div>
		)
	}

	const DraggableTask = ({ task }) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition
		} = useDraggable({
			id: task.id
		});

		const style = {
			transform: CSS.Transform.toString(transform),
			transition
		};

		return (
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				<TaskMarkup task={task} />
			</div>
		)
	}

	return (
		<>
			{!isMountTask && !isChangeSection && (
				<SortableTask task={task} />
			)}

			{isMountTask && (
				<DragAndDropTask task={task} />
			)}

			{isChangeSection && (
				<DraggableTask task={task} />
			)}
		</>
	)
}
