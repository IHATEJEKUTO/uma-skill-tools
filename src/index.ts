// Main entry point for browser usage
export { RaceSolver, RaceSolverBuilder } from '../RaceSolver';
export { HorseParameters, Strategy, Aptitude } from '../HorseTypes';
export { CourseData, CourseHelpers, Phase } from '../CourseData';
export { Region, RegionList } from '../Region';
export { PRNG, Rule30CARng } from '../Random';
export { ActivationSamplePolicy, ImmediatePolicy } from '../ActivationSamplePolicy';
export { Conditions } from '../ActivationConditions';
export { getParser } from '../ConditionParser';
export { NoopHpPolicy } from '../HpPolicy';

// Import data files
import courseData from '../data/course_data.json';
import skillData from '../data/skill_data.json';
import skillNames from '../data/skillnames.json';
import trackNames from '../data/tracknames.json';

export { courseData, skillData, skillNames, trackNames };

// Browser-specific setup
declare global {
  var CC_GLOBAL: boolean;
}

// Set CC_GLOBAL for browser
if (typeof window !== 'undefined') {
  (window as any).CC_GLOBAL = false;
}


