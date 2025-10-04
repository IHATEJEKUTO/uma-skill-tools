#!/usr/bin/env ts-node
/**
 * Test Skill Timing Tool
 * 
 * Tests how a skill performs when activated at different positions on the track.
 * This helps answer questions like "when is the optimal time to activate this skill?"
 */

import { Command, Option } from 'commander';
import * as fs from 'fs';
import { RaceSolverBuilder } from '../RaceSolverBuilder';
import { CourseHelpers } from '../CourseData';
import { Strategy } from '../HorseTypes';
import { buildHorseParameters } from './ToolCLI';

const program = new Command();

program
	.description('Test a skill at multiple track positions to find optimal activation timing')
	.argument('<horsefile>', 'path to a JSON file describing the horse\'s parameters')
	.requiredOption('-s, --skill <id>', 'skill ID to test')
	.requiredOption('-c, --course <id>', 'course ID')
	.addOption(new Option('-m, --mood <mood>', 'the uma\'s mood')
		.choices(['-2', '-1', '0', '+1', '+2'])
		.default(2, '+2')
		.argParser(x => parseInt(x,10)))
	.addOption(new Option('-g, --ground <condition>', 'track condition')
		.choices(['good', 'yielding', 'soft', 'heavy'])
		.default('good', 'good'))
	.option('--start <meters>', 'start position (default: 0)', x => parseInt(x,10), 0)
	.option('--end <meters>', 'end position (default: course distance)')
	.option('--step <meters>', 'step size between test positions (default: 100)', x => parseInt(x,10), 100)
	.option('--nsamples <n>', 'number of samples per position (default: 50)', x => parseInt(x,10), 50)
	.option('--no-position-keep', 'disable position keep simulation')
	.parse();

const opts = program.opts();
const horsefile = program.args[0];

// Load horse and course
const course = CourseHelpers.getCourse(opts.course);
const horseDesc = JSON.parse(fs.readFileSync(horsefile, 'utf8'));
const horse = buildHorseParameters(horseDesc, course, opts.mood, opts.ground);

// Determine position range
const startPos = opts.start;
const endPos = opts.end || course.distance;
const step = opts.step;

console.log('=== Skill Timing Test ===');
console.log(`Course: ${course.raceTrackId} (${course.distance}m)`);
console.log(`Skill: ${opts.skill}`);
console.log(`Testing positions: ${startPos}m to ${endPos}m (step: ${step}m)`);
console.log(`Samples per position: ${opts.nsamples}`);
console.log('');

// Test skill at each position
const results: Array<{position: number, avgTime: number, minTime: number, maxTime: number}> = [];

for (let pos = startPos; pos <= endPos && pos < course.distance; pos += step) {
	const times: number[] = [];
	
	const builder = new RaceSolverBuilder(opts.nsamples)
		.horse(horse)
		.course(course)
		.mood(opts.mood)
		.ground(opts.ground);
	
	// Add skills from horse definition normally
	if (horseDesc.skills) {
		horseDesc.skills.forEach((skillId: string) => builder.addSkill(skillId));
	}
	
	// Add test skill at fixed position
	builder.addSkillAtPosition(opts.skill, pos);
	
	// Setup position keep if not nige
	if (horse.strategy != Strategy.Nige && horse.strategy != Strategy.Oonige && opts.positionKeep !== false) {
		builder.useDefaultPacer();
	}
	
	// Run simulations
	for (const race of builder.build()) {
		while (race.pos < course.distance) {
			race.step(1/60);
		}
		times.push(race.accumulatetime.t);
	}
	
	// Calculate statistics
	times.sort((a, b) => a - b);
	const avgTime = times.reduce((a, b) => a + b) / times.length;
	const minTime = times[0];
	const maxTime = times[times.length - 1];
	
	results.push({ position: pos, avgTime, minTime, maxTime });
	
	console.log(`Position ${pos}m: avg=${avgTime.toFixed(3)}s  min=${minTime.toFixed(3)}s  max=${maxTime.toFixed(3)}s`);
}

// Find optimal position
console.log('');
console.log('=== Analysis ===');

const bestAvg = results.reduce((best, curr) => 
	curr.avgTime < best.avgTime ? curr : best
);

const bestMin = results.reduce((best, curr) => 
	curr.minTime < best.minTime ? curr : best
);

console.log(`Best average time: ${bestAvg.avgTime.toFixed(3)}s at ${bestAvg.position}m`);
console.log(`Best minimum time: ${bestMin.minTime.toFixed(3)}s at ${bestMin.position}m`);

// Show improvement from worst to best
const worstAvg = results.reduce((worst, curr) => 
	curr.avgTime > worst.avgTime ? curr : worst
);

const improvement = ((worstAvg.avgTime - bestAvg.avgTime) / worstAvg.avgTime * 100);
console.log(`Improvement from worst (${worstAvg.position}m) to best timing: ${improvement.toFixed(2)}%`);

