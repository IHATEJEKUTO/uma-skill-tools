import { RaceSolverBuilder } from '../RaceSolverBuilder';
import { Strategy } from '../HorseTypes';
import { NoopHpPolicy } from '../HpPolicy';

/**
 * Example: Force a skill to activate at a specific position
 * 
 * This demonstrates how to make a skill proc at an exact distance (e.g., 2000m)
 * instead of relying on its normal activation conditions and randomness.
 */

// Define a horse
const horse = {
	speed: 1200,
	stamina: 1000,
	power: 1000,
	guts: 800,
	wisdom: 1000,
	strategy: Strategy.Senkou,
	distanceAptitude: 'A',
	surfaceAptitude: 'A',
	strategyAptitude: 'A',
	skills: []
};

// Build the race with a skill forced to activate at 2000m
const builder = new RaceSolverBuilder(10)
	.horse(horse)
	.course(10105)  // Tokyo 2400m
	.mood(2)        // Perfect condition
	.ground('good');

// Add a normal skill (will activate based on its conditions)
builder.addSkill('200031');  // Some skill with normal activation

// Add a skill that MUST activate at exactly 2000m
builder.addSkillAtPosition('200041', 2000);  // This skill will proc at 2000m

// Add another skill at a different position
builder.addSkillAtPosition('200051', 1500);  // This skill will proc at 1500m

// Run the simulation
const races = builder.build();
let raceCount = 0;

for (const race of races) {
	console.log(`\n=== Race ${++raceCount} ===`);
	
	// Track when skills activate
	race.onSkillActivate = (solver, skillId) => {
		console.log(`Skill ${skillId} activated at ${solver.pos.toFixed(2)}m`);
	};
	
	// Run the race
	while (race.pos < race.course.distance) {
		race.step(1/60);
	}
	
	console.log(`Finished in ${race.accumulatetime.t.toFixed(3)} seconds`);
}

console.log('\n=== Summary ===');
console.log('Skills with fixed positions will activate at exactly the specified distance.');
console.log('This is useful for:');
console.log('  - Testing skill effects at specific race points');
console.log('  - Reproducing specific race scenarios');
console.log('  - Analyzing skill timing impact');

