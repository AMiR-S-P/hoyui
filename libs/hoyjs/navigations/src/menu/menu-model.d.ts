import { attributes, NotifyPropertyChanges, INotifyPropertyChanged, Property } from '@hoyui/base';import { Browser, Complex, getUniqueID, SanitizeHtmlHelper } from '@hoyui/base';import { MenuBase, FieldSettings } from '../common/menu-base';import { MenuItemModel, FieldSettingsModel } from '../common/menu-base-model';
import {Orientation} from "./menu";
import {MenuBaseModel} from "../common/menu-base-model";

/**
 * Interface for a class Menu
 */
export interface MenuModel extends MenuBaseModel{

    /**
     * Specified the orientation of Menu whether it can be horizontal or vertical.
     *
     * @default 'Horizontal'
     */
    orientation?: Orientation;

    /**
     * Specifies target element to open/close Menu while click in Hamburger mode.
     *
     * @default ''
     */
    target?: string;

    /**
     * Specifies the template for Menu item.
     *
     * @default null
     * @aspType string
     */
    template?: string | Function;

    /**
     * Specifies whether to enable / disable the scrollable option in Menu.
     *
     * @default false
     */
    enableScrolling?: boolean;

    /**
     * Specifies whether to enable / disable the hamburger mode in Menu.
     *
     * @default false
     */
    hamburgerMode?: boolean;

    /**
     * Specifies the title text for hamburger mode in Menu.
     *
     * @default 'Menu'
     */
    title?: string;

    /**
     * Specifies whether to enable the rendering of untrusted HTML values in the Menu component.
     * If 'enableHtmlSanitizer' set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default true
     */
    enableHtmlSanitizer?: boolean;

    /**
     * Specifies mapping fields from the dataSource.
     *
     * @default { itemId: "id", text: "text", parentId: "parentId", iconCss: "iconCss", url: "url", separator: "separator",
     * children: "items" }
     */
    // eslint:disable-next-line
    fields?: FieldSettingsModel;

}