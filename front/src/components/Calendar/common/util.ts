export declare type SchedulerDateTime = Date | number | string;

export interface SchedulerDate {
  startDate: SchedulerDateTime;
  endDate?: SchedulerDateTime;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  rRule?: string | undefined;
  exDate?: string | undefined;
  [propertyName: string]: any;
}

export interface ResourceInstance {
  id: number | string;
  color?: string;
  text?: string;
};

export interface Resource {
  fieldName: string;
  title?: string;
  allowMultiple?: boolean;
  instances: Array<ResourceInstance>;
};