import { Touch, ScrollEventArgs, TouchEventArgs, Component, EventHandler, selectAll, getUniqueID, removeClass } from '@hoyui/base';import { NotifyPropertyChanges, INotifyPropertyChanged, Property, Browser, detach, createElement as buildTag } from '@hoyui/base';import { classList, SwipeEventArgs, isNullOrUndefined } from '@hoyui/base';
import {ComponentModel} from '@hoyui/base';

/**
 * Interface for a class VScroll
 */
export interface VScrollModel extends ComponentModel{

    /**
     * Specifies the up or down scrolling distance of the vertical scrollbar moving.
     *
     * @default null
     */
    scrollStep?: number;

}