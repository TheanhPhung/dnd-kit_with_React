import { useState, useEffect } from "react"

import { DndContext, DragOverlay } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

import Section from "./Section"

export default function Sections({ sections, setSections, tasks, setTasks }) {

	const [activeId, setActiveId] = useState(null);
	const [hideTasks, setHideTasks] = useState(false);

	useEffect(() => {
		setSections(prevSections => 
			prevSections.sort((a, b) => a.order - b.order)
		)
	}, [])

	const SectionsMarkup = () => {
		return sections.map(section => 
			<Section 
				key={`section-${section.id}`} 
				section={section} 
				tasks={tasks}
				setTasks={setTasks}
				hideTasks={hideTasks}
			/>
		)
	}

	function handleDragStart(event) {
		setActiveId(event.active.id);
		setHideTasks(true);
	}

	function handleDragEnd(event) {
		setActiveId(null);
		setHideTasks(false);

		const { active, over } = event;

		if (!over || !over.id || active.id === over.id) return;
		
		setSections(prevSections => {
			const oldIndex = prevSections.findIndex(section => section.id === active.id);
			const newIndex = prevSections.findIndex(section => section.id === over.id);

			const newSections = arrayMove(prevSections, oldIndex, newIndex);

			return newSections.map((section, index) => ({
				...section,
				order: index
			}))
		})
	}

	return (
		<DndContext 
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={sections.map(section => section.id)}>
				{SectionsMarkup()}
			</SortableContext>

			<DragOverlay>
				{activeId ? (
					<Section 
						section={sections.find(section => section.id === activeId)}
						tasks={tasks}
						setTasks={setTasks}
						hideTasks={hideTasks}
						isOpacity={true}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	)
}
