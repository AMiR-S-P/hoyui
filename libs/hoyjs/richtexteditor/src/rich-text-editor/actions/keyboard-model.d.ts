import {
  Property,
  NotifyPropertyChanges,
  INotifyPropertyChanged,
  Event,
} from '@hoyui/base';
import { Base, EmitType } from '@hoyui/base';
import { KeyboardEventsModel } from '@hoyui/base';
import { KeyboardEventArgs } from './keyboard';

/**
 * Interface for a class KeyboardEvents
 */
export interface KeyboardEventsModel {
  /**
   * Specifies key combination and it respective action name.
   *
   * @default null
   */
  keyConfigs?: { [key: string]: string };

  /**
   * Specifies on which event keyboardEvents class should listen for key press. For ex., `keyup`, `keydown` or `keypress`
   *
   * @default 'keyup'
   */
  eventName?: string;

  /**
   * Specifies the listener when keyboard actions is performed.
   *
   * @event 'keyAction'
   */
  keyAction?: EmitType<KeyboardEventArgs>;
}
