import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { RaceTrack } from './RaceTrack';
import { DraggableSkill, DraggableSkillGroup } from './DraggableSkill';
import { CourseHelpers } from '../uma-skill-tools/CourseData';
import { HorseState } from './HorseDefTypes';

interface SkillPositionEditorProps {
    horse: HorseState;
    courseId: string;
    onHorseChange: (horse: HorseState) => void;
    width?: number;
    height?: number;
}

export function SkillPositionEditor({ 
    horse, 
    courseId, 
    onHorseChange, 
    width = 800, 
    height = 200 
}: SkillPositionEditorProps) {
    const course = CourseHelpers.getCourse(courseId);

    const handleSkillPositionChange = useCallback((skillId: string, newPosition: number) => {
        const updatedHorse = horse.set(
            'forcedSkillPositions',
            horse.forcedSkillPositions.set(skillId, newPosition)
        );
        onHorseChange(updatedHorse);
    }, [horse, onHorseChange]);

    const handleMouseMove = useCallback((positionRatio: number) => {
        // Optional: Show position feedback in UI
        console.log(`Mouse at: ${Math.round(positionRatio * course.distance)}m`);
    }, [course.distance]);

    // Convert skills to the format expected by DraggableSkill
    const skills = horse.skills.toArray().map(skillId => {
        const skillName = skillId.split('-')[0]; // Extract skill name from ID
        const position = horse.forcedSkillPositions.get(skillId) || getDefaultSkillPosition(skillId, course);
        
        return {
            id: skillId,
            name: skillName,
            position: position
        };
    });

    return (
        <div class="skill-position-editor">
            <h3>Skill Position Editor</h3>
            <p>Drag skills to change their activation positions</p>
            
            <RaceTrack 
                courseid={courseId}
                width={width}
                height={height}
                mouseMove={handleMouseMove}
            >
                {/* Add draggable skills as children */}
                <DraggableSkillGroup
                    skills={skills}
                    course={course}
                    onPositionChange={handleSkillPositionChange}
                    xOffset={0}
                />
            </RaceTrack>
            
            {/* Display current positions */}
            <div class="skill-positions">
                <h4>Current Skill Positions:</h4>
                {skills.map(skill => (
                    <div key={skill.id} class="skill-position-item">
                        <span class="skill-name">{skill.name}</span>
                        <span class="skill-position">{Math.round(skill.position)}m</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helper function to get default skill position
function getDefaultSkillPosition(skillId: string, course: any): number {
    // You can implement logic here to determine default positions
    // For now, just return a random position in the middle section
    return course.distance * 0.3 + Math.random() * course.distance * 0.4;
}



