import { SheetModel } from './index';
import { ChildProperty, Property, Complex } from '@hoyui/base';
import {
  FormatModel,
  Format,
  ValidationModel,
  isInMultipleRange,
} from '../common/index';

/**
 * Interface for a class Column
 */
export interface ColumnModel {
  /**
   * Specifies index of the column. Based on the index, column properties are applied.
   *
   * @default 0
   * @asptype int
   */
  index?: number;

  /**
   * Specifies width of the column.
   *
   * @default 64
   * @asptype int
   */
  width?: number;

  /**
   * specifies custom width of the column.
   *
   * @default false
   */
  customWidth?: boolean;

  /**
   * To hide/show the column in spreadsheet.
   *
   * @default false
   */
  hidden?: boolean;

  /**
   * Specifies format of the column.
   *
   * @default {}
   */
  format?: FormatModel;

  /**
   * To lock/unlock the column in the protected sheet.
   *
   * @default true
   */
  isLocked?: boolean;

  /**
   * Specifies the validation of the column.
   *
   * @default ''
   */
  validation?: ValidationModel;

  /**
   * Represents whether a column in the sheet is read-only or not. If set to true, it prevents editing the specified cell in the sheet.
   *
   * @default false
   */
  isReadOnly?: boolean;
}
