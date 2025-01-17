import { Property, ChildProperty } from '@hoyui/base';

/**
 * Interface for a class DayWorkingTime
 */
export interface DayWorkingTimeModel {
  /**
   * Defines start time of working time range.
   *
   * @default null
   */
  from?: number;

  /**
   * Defines end time of working time range.
   *
   * @default null
   */
  to?: number;
}
