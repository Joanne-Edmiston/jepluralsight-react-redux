import * as types from './actionTypes.js';

export function createCourse(course){
    return {type: types.CREATE_COURSE, course};
}