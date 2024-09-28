import { Property, ChildProperty } from '@hoyui/base';
import { Orientation } from '@hoyui/navigations';
import { SubTreeAlignments } from '../enum/enum';

/**
 * Interface for a class LayoutInfo
 */
export interface LayoutInfoModel {
  /**
   * Defines the orientation of the layout
   *
   * @default'Horizontal'
   */
  orientation?: Orientation;

  /**
   * Defines the type for the subtree
   *
   * @default'Center'
   * @blazorDefaultValue 'Center'
   * @isEnumeration true
   */
  type?: SubTreeAlignments;

  /**
   * Defines the offset value
   *
   * @default undefined
   */
  offset?: number;

  /**
   * Defines the routing for the layout
   *
   * @default false
   */
  enableRouting?: boolean;

  /**
   * Defines the children for the layout
   *
   * @default []
   */
  children?: string[];

  /**
   * Defines assistant for the layout
   *
   * @default ''
   * @aspDefaultValueIgnore
   * @isBlazorNullableType true
   */
  assistants?: Orientation;

  /**
   * Defines the level for the layout
   *
   */
  level?: number;

  /**
   * Defines the subtree for the layout
   *
   */
  hasSubTree?: boolean;

  /**
   * Defines the row for the layout
   *
   */
  rows?: number;
}
