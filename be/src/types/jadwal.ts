export interface CreateJadwal {
  activity: string;
  description: string;
  date: Date;
  start_time: string;
  end_time: string;
  is_active: boolean;
}
export interface Jadwal {
  id: string;
  activity: string;
  description: string;
  date: Date;
  start_time: string;
  end_time: string;
  is_active: boolean;
}
export interface UpdateJadwal {
  id: string;
  activity: string;
  description: string;
  date: Date;
  start_time: string;
  end_time: string;
  is_active: boolean;
}
