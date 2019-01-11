'use strict';

const fieldType = {
    courseType: 'required', 
    courseValue: 'required',
    creditAmount: 'required', 
    prereqs: 'optional',
}

function validateCourseFormat(course){
    for(const field in fieldType){
        const type = fieldType[field];

        if(!type){
            delete course[field];
        }
        else if(type === 'required' && !course[field]){
            return `${field} is required.`;
        }
    }
}

module.exports = {
    validateCourseFormat: validateCourseFormat
};