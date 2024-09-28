import { Touch, ScrollEventArgs, TouchEventArgs, Component, EventHandler, selectAll, getUniqueID } from '@hoyui/base';import { NotifyPropertyChanges, INotifyPropertyChanged, Property, Browser, detach } from '@hoyui/base';import { classList, SwipeEventArgs, isNullOrUndefined} from '@hoyui/base';
import {ComponentModel} from '@hoyui/base';

/**
 * Interface for a class HScroll
 */
export interface HScrollModel extends ComponentModel{

    /**
     * Specifies the left or right scrolling distance of the horizontal scrollbar moving.
     *
     * @default null
     */
    scrollStep?: number;

}