// 카테고리 관련 타입
interface SettingCategoryState {
  name: string;
  color: string;
  hour: string;
  min: string;
}

interface SearchCategoryState {
  categoryName: string;
}

// 검색 관련 타입
interface SearchState {
  nickname: string;
  email: string;
  imagePath: string;
  desc: string;
  detail: string;
  categories: SearchCategoryState[];
}

declare type SchedulerDateTime = Date | number | string;

interface SchedulerDate {
  startDate: SchedulerDateTime;
  endDate?: SchedulerDateTime;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  rRule?: string | undefined;
  exDate?: string | undefined;
  [propertyName: string]: any;
}

export type {
  SearchState,
  SettingCategoryState,
  SearchCategoryState,
  SchedulerDateTime,
  SchedulerDate,
};
