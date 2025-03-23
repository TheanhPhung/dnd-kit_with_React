import { useState, useEffect } from "react"

import { DndContext, DragOverlay } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

import Section from "./Section"

export default function Sections({ sections, setSections, tasks, setTasks, isMountTask }) {

	const [hideTasks, setHideTasks] = useState(false);
	const [activeId, setActiveId] = useState(null);

	const SectionsMarkup = ({ sections }) => {
		return sections.map(section => 
			<Section 
				key={`section-${section.id}`} 
				section={section} 
				tasks={tasks}
				setTasks={setTasks}
				hideTasks={hideTasks}
				setHideTasks={setHideTasks}
				isMountTask={isMountTask}
			/>
		)
	}

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function moveSection(event) {
		setActiveId(null);

		const { active, over } = event;

		if (active.id !== over.id) {
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
	}

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={moveSection}>
			<SortableContext items={sections.map(section => section.id)}>
				<SectionsMarkup sections={sections} />
			</SortableContext>

			{activeId &&
				<DragOverlay>
					<Section
						section={sections.find(section => section.id === activeId)}
						tasks={tasks}
						setTasks={setTasks}
						hideTasks={hideTasks}
						setHideTasks={setHideTasks}
						isMountTask={isMountTask}
					/>
				</DragOverlay>
			}
		</DndContext>
	)
}
