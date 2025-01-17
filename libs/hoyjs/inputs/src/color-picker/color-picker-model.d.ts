import { BaseEventArgs, Component, EmitType, Event, INotifyPropertyChanged, NotifyPropertyChanges, Property } from '@hoyui/base';import { Browser, closest, detach, EventHandler, getInstance, select, selectAll, formatUnit } from '@hoyui/base';import { addClass, attributes, classList, isNullOrUndefined, L10n } from '@hoyui/base';import { remove, removeClass, rippleEffect } from '@hoyui/base';import { SplitButton, BeforeOpenCloseMenuEventArgs, getModel } from '@hoyui/splitbuttons';import { Deferred } from '@hoyui/splitbuttons';import { Tooltip, TooltipEventArgs, getZindexPartial, Popup, isCollide } from '@hoyui/popups';import { Input } from './../input/index';import { NumericTextBox, NumericTextBoxModel, ChangeEventArgs } from './../numerictextbox/index';import { Slider, SliderChangeEventArgs } from './../slider/slider';
import {ColorPickerMode,ColorPickerEventArgs,PaletteTileEventArgs,BeforeOpenCloseEventArgs,OpenEventArgs,ModeSwitchEventArgs} from "./color-picker";
import {ComponentModel} from '@hoyui/base';

/**
 * Interface for a class ColorPicker
 */
export interface ColorPickerModel extends ComponentModel{

    /**
     * It is used to set the color value for ColorPicker. It should be specified as Hex code.
     *
     * @default '#008000ff'
     */
    value?: string;

    /**
     * This property sets the CSS classes to root element of the ColorPicker
     *  which helps to customize the UI styles.
     *
     * @default ''
     */
    cssClass?: string;

    /**
     * It is used to enable / disable ColorPicker component. If it is disabled the ColorPicker popup won’t open.
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * It is used to render the ColorPicker with the specified mode.
     *
     * @default 'Picker'
     */
    mode?: ColorPickerMode;

    /**
     * It is used to show / hide the mode switcher button of ColorPicker component.
     *
     * @default true
     */
    modeSwitcher?: boolean;

    /**
     * It is used to load custom colors to palette.
     *
     * @default null
     */
    presetColors?: { [key: string]: string[] };

    /**
     * It is used to show / hide the control buttons (apply / cancel) of  ColorPicker component.
     *
     * @default true
     */
    showButtons?: boolean;

    /**
     * It is used to render the ColorPicker palette with specified columns.
     *
     * @default 10
     */
    columns?: number;

    /**
     * It is used to render the ColorPicker component as inline.
     *
     * @default false
     */
    inline?: boolean;

    /**
     * It is used to enable / disable the no color option of ColorPicker component.
     *
     * @default false
     */
    noColor?: boolean;

    /**
     * To enable or disable persisting component's state between page reloads and it is extended from component class.
     *
     * @default false
     */
    enablePersistence?: boolean;

    /**
     * It is used to enable / disable the opacity option of ColorPicker component.
     *
     * @default true
     */
    enableOpacity?: boolean;

    /**
     * Specifies the popup element creation on open.
     *
     * @default false
     */
    createPopupOnClick?: boolean;

    /**
     * Specifies to show the recent color options in the color picker in the palate mode.
     * It accepts boolean value to configure recent colors. The default value is false.
     * If this property value is false, then the recent color user interface is not rendered in color picker component.
     * This recent color option is rendered only in the palette mode.
     *
     * @default false
     */
    showRecentColors?: boolean;

    /**
     * Triggers while selecting the color in picker / palette, when showButtons property is enabled.
     *
     * @event select
     * @blazorProperty 'Selected'
     */
    select?: EmitType<ColorPickerEventArgs>;

    /**
     * Triggers while changing the colors. It will be triggered based on the showButtons property.
     * If the property is false, the event will be triggered while selecting the colors.
     * If the property is true, the event will be triggered while apply the selected color.
     *
     * @event change
     * @blazorProperty 'ValueChange'
     */
    change?: EmitType<ColorPickerEventArgs>;

    /**
     * Trigger while rendering each palette tile.
     *
     * @event beforeTileRender
     * @blazorProperty 'OnTileRender'
     */
    beforeTileRender?: EmitType<PaletteTileEventArgs>;

    /**
     * Triggers before opening the ColorPicker popup.
     *
     * @event beforeOpen
     * @blazorProperty 'OnOpen'
     */
    beforeOpen?: EmitType<BeforeOpenCloseEventArgs>;

    /**
     * Triggers while opening the ColorPicker popup.
     *
     * @event open
     * @blazorProperty 'Opened'
     */
    open?: EmitType<OpenEventArgs>;

    /**
     * Triggers before closing the ColorPicker popup.
     *
     * @event beforeClose
     * @blazorProperty 'OnClose'
     */
    beforeClose?: EmitType<BeforeOpenCloseEventArgs>;

    /**
     * Triggers before Switching between ColorPicker mode.
     *
     * @event beforeModeSwitch
     * @blazorProperty 'OnModeSwitch'
     */
    beforeModeSwitch?: EmitType<ModeSwitchEventArgs>;

    /**
     * Triggers after Switching between ColorPicker mode.
     *
     * @event onModeSwitch
     * @blazorProperty 'ModeSwitched'
     */
    onModeSwitch?: EmitType<ModeSwitchEventArgs>;

    /**
     * Triggers once the component rendering is completed.
     *
     * @event created
     * @blazorProperty 'Created'
     */
    created?: EmitType<Event>;

}