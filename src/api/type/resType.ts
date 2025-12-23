export interface StuInfoData{
  userInfo:userStuInfo,
  counselorInfo: counselorInfo
}
export interface CslInfoData{
  userInfO:userCslInfo
}
export interface userCslInfo{

}
export interface reqDifficulty{
  user_id:string
}
export interface reqRecords{
  user_id:string
}

export interface userStuInfo{
  id: number,
  user_id: number,
  username: string,
  real_name: string,
  phone: string,
  avatar: string,
  role_type: string,
  class_name: string,
  department: string,
  professional: string,
  enrollment_year: number,
  earned_credits: string,
  is_difficult: number,
  is_top_up: number,
  schooling_length: number,
  training_level: string,
  academic_status: string,
  current_status: string,
  is_at_school: number,
  registration_status: string,
  counselor_id: number,
  age: number,
  gender: string,
  id_card_type: string,
  id_card_no: string,
  political_status: string,
  birth_date: string,
  nation: string,
  remark: string,

}
export interface counselorInfo{
  counselor_name: string,
  counselor_phone: string
}
export interface loginResData{
  token:string
}
export interface loginReqData{
  username:string,
  password:string
}
export interface scheduleData{
  weekTime:number,
  semester:string
}

export interface reviewDifficultyData{
  status:number,
  review_at:string,
  student_id:string
}
