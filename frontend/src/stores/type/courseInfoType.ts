export interface scheduleType{
  period: string ,
  Monday: string,
  Tuesday: string,
  Wednesday: string,
  Thursday: string,
  Friday: string,
  Saturday: string,
  Sunday: string
}
export interface grade {
  semester: string,
  course_name: string,
  course_credits: string,
  score: string,
  nature: string,
  earned_credit: string
}
export interface getGradesResult {
  grades: grade[],
}
export interface course {
  course_name: string,
}
export interface getCourseResult {
  courseList:course[]
}
