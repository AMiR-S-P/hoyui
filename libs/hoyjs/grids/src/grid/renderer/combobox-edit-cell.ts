import { extend } from '@hoyui/base';
import { IEditCell } from '../base/interface';
import { Column } from '../models/column';
import { ComboBox } from '@hoyui/dropdowns';
import { Query, DataManager, DataUtil } from '@hoyui/data';
import { isEditable, getObject } from '../base/util';
import { EditCellBase } from './edit-cell-base';

/**
 * `ComboBoxEditCell` is used to handle ComboBoxEdit cell type editing.
 *
 * @hidden
 */
export class ComboboxEditCell extends EditCellBase implements IEditCell {
  private column: Column;

  public write(args: {
    rowData: Object;
    element: Element;
    column: Column;
    row: HTMLElement;
    requestType: string;
  }): void {
    this.column = args.column;
    const isInlineMode: boolean = this.parent.editSettings.mode !== 'Dialog';
    this.obj = new ComboBox(
      extend(
        {
          dataSource:
            this.parent.dataSource instanceof DataManager
              ? this.parent.dataSource
              : new DataManager(this.parent.dataSource),
          query: new Query().select(args.column.field),
          fields: { value: args.column.field },
          value: getObject(args.column.field, args.rowData),
          enableRtl: this.parent.enableRtl,
          actionComplete: this.finalValue.bind(this),
          placeholder: isInlineMode ? '' : args.column.headerText,
          floatLabelType: isInlineMode ? 'Never' : 'Always',
          enabled: isEditable(args.column, args.requestType, args.element),
          cssClass: this.parent.cssClass ? this.parent.cssClass : null,
        },
        args.column.edit.params
      )
    );
    this.obj.appendTo(args.element as HTMLElement);
  }

  private finalValue(val: { result: Object[] }): void {
    val.result = DataUtil.distinct(
      val.result,
      (this.obj as ComboBox).fields.value,
      true
    );
    if (<DataManager>this.column.dataSource) {
      (<DataManager>this.column.dataSource).dataSource.json = val.result;
    }
  }
}
