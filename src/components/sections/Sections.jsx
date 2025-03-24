import { useState, useEffect, useCallback } from "react"

import { DndContext, DragOverlay } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

import Section from "./Section"

export default function Sections({ sections, setSections, tasks, setTasks, isMountTask, isChangeSection }) {

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
				isChangeSection={isChangeSection}
			/>
		)
	}

	const handleDragStart = useCallback((event) => {
		setActiveId(event.active.id);
	}, []);

	const moveSection = useCallback((event) => {
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
	}, []);

	function changeSection(event) {
		const { active, over } = event;
		setTasks(prevTasks => prevTasks.map(el => 
			el.id === event.active.id
			? { ...el, section: event.over.id }
			: el
		));
	}

	return (
		<DndContext 
			onDragStart={isChangeSection ? () => {} : handleDragStart} 
			onDragEnd={isChangeSection ? changeSection : moveSection}
		>
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
						isChangeSection={isChangeSection}
					/>
				</DragOverlay>
			}
		</DndContext>
	)
}
