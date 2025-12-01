export interface resResult{
  userInfo: {
    stuName: string,
    avatar: string,
    class: string,
    stuID: string,
    department: string,
    grade: string,
    professional: string,
    roleType: string,
    gender: string,
    age: number,
    idCardType: string,
    idCardNum: string,
    politicalStatus: string,
    birthDate: string,
    nation: string,
    remark: string,
    counselorInfo:counselorInfo
  }
}
export interface counselorInfo{
  counselor_name: string,
  counselor_phone: string
}
export interface resToken{
  token:string,
}
