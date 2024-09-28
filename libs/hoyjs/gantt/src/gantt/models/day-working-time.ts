import { Property, ChildProperty } from '@hoyui/base';

/**
 * Defines working time of day in project.
 */

export class DayWorkingTime extends ChildProperty<DayWorkingTime> {
  /**
   * Defines start time of working time range.
   *
   * @default null
   */
  @Property(null)
  public from: number;
  /**
   * Defines end time of working time range.
   *
   * @default null
   */
  @Property(null)
  public to: number;
}
