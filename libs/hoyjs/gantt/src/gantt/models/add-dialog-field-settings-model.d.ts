import { Property, ChildProperty } from '@hoyui/base';
import { DialogFieldType } from '../base/enum';
import { TreeGridModel } from '@hoyui/treegrid';
import { GridModel } from '@hoyui/grids';
import { RichTextEditorModel } from '@hoyui/richtexteditor';

/**
 * Interface for a class AddDialogFieldSettings
 */
export interface AddDialogFieldSettingsModel {
  /**
   * Defines types of tab which contains editor for columns.
   * * `General` - Defines tab container type as general.
   * * `Dependency` - Defines tab as dependency editor.
   * * `Resources` - Defines tab as resources editor.
   * * `Notes` - Defines tab as notes editor.
   * * `Custom` - Defines tab as custom column editor.
   *
   * @default null
   */
  type?: DialogFieldType;

  /**
   * Defines header text of tab item.
   *
   * @default null
   */
  headerText?: string;

  /**
   * Defines edited column fields placed inside the tab.
   *
   * @default null
   */
  fields?: string[];

  /**
   * Defines the properties of Grid or RTE or TreeGrid controls in Gantt edit dialog.
   *
   * @default null
   */
  additionalParams?: TreeGridModel | GridModel | RichTextEditorModel;
}
