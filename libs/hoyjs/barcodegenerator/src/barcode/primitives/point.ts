import { Property, ChildProperty } from '@hoyui/base';

/**
 * Defines and processes coordinates
 */
export class Point extends ChildProperty<Point> {
  /**
   * Sets the x-coordinate of a position
   *
   * @default 0
   */
  @Property(0)
  public x: number;

  /**
   * Sets the y-coordinate of a position
   *
   * @default 0
   */
  @Property(0)
  public y: number;
}
