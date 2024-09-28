import { Property, ChildProperty } from '@hoyui/base';import { ITreeData } from '..';

/**
 * Interface for a class RowDropSettings
 */
export interface RowDropSettingsModel {

    /**
     * Defines the ID of droppable component on which row drop should occur.
     *
     * @default null
     */
    targetID?: string;

}