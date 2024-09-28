import {
  Component,
  Property,
  NotifyPropertyChanges,
  INotifyPropertyChanged,
  Event,
  Browser,
  detach,
} from '@hoyui/base';
import {
  EmitType,
  getDefaultDateObject,
  getValue,
  cldrData,
  L10n,
  isNullOrUndefined,
  removeClass,
  addClass,
} from '@hoyui/base';
import { DropDownList, ChangeEventArgs } from '@hoyui/dropdowns';
import { NumericTextBox } from '@hoyui/inputs';
import { DatePicker, ChangedEventArgs } from '@hoyui/calendars';
import { Button, RadioButton } from '@hoyui/buttons';
import { EventHandler, MouseEventArgs, classList } from '@hoyui/base';
import { EJ2Instance } from '../schedule/base/interface';
import {
  RecRule,
  extractObjectFromRule,
  generate,
  generateSummary,
  getRecurrenceStringFromDate,
  getCalendarUtil,
} from './date-generator';
import { CalendarUtil, CalendarType } from '../common/calendar-util';
import { capitalizeFirstWord } from '../schedule/base/util';
import {
  RepeatType,
  EndType,
  RecurrenceEditorChangeEventArgs,
} from './recurrence-editor';
import { ComponentModel } from '@hoyui/base';

/**
 * Interface for a class RecurrenceEditor
 */
export interface RecurrenceEditorModel extends ComponentModel {
  /**
   * Sets the recurrence pattern on the editor.
   *
   * @default ['none', 'daily', 'weekly', 'monthly', 'yearly']
   */
  frequencies?: RepeatType[];

  /**
   * Sets the type of recurrence end for the recurrence pattern on the editor.
   *
   * @default ['never', 'until', 'count']
   */
  endTypes?: EndType[];

  /**
   * Sets the first day of the week.
   *
   * @default 0
   */
  firstDayOfWeek?: number;

  /**
   * Sets the start date on recurrence editor.
   *
   * @default new Date()
   * @aspDefaultValue DateTime.Now
   */
  startDate?: Date;

  /**
   * Sets the user specific date format on recurrence editor.
   *
   * @default null
   */
  dateFormat?: string;

  /**
   * Sets the specific calendar type to be applied on recurrence editor.
   *
   * @default 'Gregorian'
   */
  calendarMode?: CalendarType;

  /**
   * Allows styling with custom class names.
   *
   * @default null
   */
  cssClass?: string;

  /**
   * Sets the recurrence rule as its output values.
   *
   * @default null
   */
  value?: string;

  /**
   * Sets the minimum date on recurrence editor.
   *
   * @default new Date(1900, 0, 1)
   * @aspDefaultValue new DateTime(1900, 1, 1)
   */
  minDate?: Date;

  /**
   * Sets the maximum date on recurrence editor.
   *
   * @default new Date(2099, 11, 31)
   * @aspDefaultValue new DateTime(2099, 12, 31)
   */
  maxDate?: Date;

  /**
   * Sets the current repeat type to be set on the recurrence editor.
   *
   * @default 0
   * @aspType int
   */
  selectedType?: number;

  /**
   * Triggers for value changes on every sub-controls rendered within the recurrence editor.
   *
   * @event 'change'
   */
  change?: EmitType<RecurrenceEditorChangeEventArgs>;
}
