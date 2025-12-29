export type ScheduleType = {
  id: string;
  activity: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
};
export type ScheduleTypeAdd = {
  activity: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  is_active: number;
};
export type ScheduleTypeEdit = {
  id: string;
  activity: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  is_active: number;
};
