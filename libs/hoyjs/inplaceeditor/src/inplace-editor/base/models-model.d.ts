import { ChildProperty, Property } from '@hoyui/base';import { TooltipModel } from '@hoyui/popups';

/**
 * Interface for a class PopupSettings
 */
export interface PopupSettingsModel {

    /**
     * Specifies title for the editor popup.
     *
     * @default ''
     */
    title?: string;

    /**
     * Specifies model for editor popup customization like position, animation,etc.
     *
     * @default null
     */
    model?: TooltipModel;

}