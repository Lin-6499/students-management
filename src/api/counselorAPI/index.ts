import type {
  reqDifficulty,
  reqRecords,
  reviewDifficultyData,
  scheduleData
} from "@/api/type/resType.ts";
import request from "@/utils/request.ts";
import {anchorEmits} from "element-plus";

enum API{
  SCHEDULE_URL = '/counselor/info/getSchedule',
  DIFFICULTYLIST_URL = '/counselor/info/getDifficultyList',
  RECORDSLIST_URL = '/counselor/info/getRecords',
  REVIEWDIFFICULT_URL = '/counselor/apply/reviewDifficulty',
  REVIEWRECORDS_URL = '/counselor/info/reviewRecords',
}

const requestSchedule = (data:scheduleData):any=> request.get(API.SCHEDULE_URL,{
  params:data
})
const requestDifficultyList = (data:reqDifficulty):any=> request.get(API.DIFFICULTYLIST_URL,{
  params:data
})
const requestRecordsList = (data:reqRecords):any => request.get(API.RECORDSLIST_URL,{
  params:data
})
const requestReviewDifficult = (data:reviewDifficultyData):any => request.post(API.REVIEWDIFFICULT_URL,data)
const requestReviewRecords = (data:any):any => request.post(API.REVIEWRECORDS_URL,data)
export const counselorAPI = {requestSchedule,requestDifficultyList,requestReviewDifficult,requestRecordsList,requestReviewRecords};
