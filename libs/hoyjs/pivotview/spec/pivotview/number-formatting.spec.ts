import { IDataSet } from '../../src/base/engine';
import { pivot_dataset } from '../base/datasource.spec';
import { PivotView } from '../../src/pivotview/base/pivotview';
import { createElement, remove, EmitType, getInstance } from '@hoyui/base';
import { FieldList } from '../../src/common/actions/field-list';
import { CalculatedField } from '../../src/common/calculatedfield/calculated-field';
import { Toolbar } from '../../src/common/popups/toolbar';
import * as util from '../utils.spec';
import { profile, inMB, getMemoryProfile } from '../common.spec';
import { NumberFormatting } from '../../src/common/popups/formatting-dialog';
import { PDFExport } from '../../src/pivotview/actions/pdf-export';
import { ExcelExport } from '../../src/pivotview/actions/excel-export';
import { ConditionalFormatting } from '../../src/common/conditionalformatting/conditional-formatting';
import { PivotChart } from '../../src/pivotchart/index';
import { DropDownList } from '@hoyui/dropdowns';

describe('Numberformatting', () => {
  beforeAll(() => {
    const isDef = (o: any) => o !== undefined && o !== null;
    if (!isDef(window.performance)) {
      console.log(
        'Unsupported environment, window.performance.memory is unavailable'
      );
      pending(); //Skips test (in Chai)
      return;
    }
  });
  describe(' -  Initial Rendering and Basic Operations', () => {
    let pivotGridObj: PivotView;
    let numberFormattingInstance: any;
    let elem: HTMLElement = createElement('div', {
      id: 'PivotGrid',
      styles: 'height:500px; width:100%',
    });
    afterAll(() => {
      if (pivotGridObj) {
        pivotGridObj.destroy();
      }
      remove(elem);
    });
    beforeAll((done: Function) => {
      if (!document.getElementById(elem.id)) {
        document.body.appendChild(elem);
      }
      let dataBound: EmitType<Object> = () => {
        done();
      };
      PivotView.Inject(FieldList, CalculatedField, Toolbar, NumberFormatting);
      pivotGridObj = new PivotView({
        dataSourceSettings: {
          dataSource: pivot_dataset as IDataSet[],
          expandAll: true,
          enableSorting: true,
          allowLabelFilter: true,
          allowValueFilter: true,
          rows: [{ name: 'product', caption: 'Items' }, { name: 'eyeColor' }],
          columns: [
            { name: 'gender', caption: 'Population' },
            { name: 'isActive' },
          ],
          values: [{ name: 'balance' }, { name: 'quantity' }],
          filters: [],
        },
        displayOption: {
          view: 'Both',
        },
        dataBound: dataBound,
        toolbar: ['NumberFormatting', 'FieldList'],
        allowNumberFormatting: true,
        showToolbar: true,
        allowCalculatedField: true,
        showFieldList: true,
      });
      pivotGridObj.appendTo('#PivotGrid');
    });
    beforeEach((done: Function) => {
      setTimeout(() => {
        done();
      }, 1000);
    });
    it('Open number formatting dialog', function (done) {
      (
        document.querySelector('.e-pivot-format-toolbar') as HTMLElement
      ).click();
      (document.querySelector('.e-ok-btn') as HTMLElement).click();
      (
        document.querySelector('.e-pivot-format-toolbar') as HTMLElement
      ).click();
      setTimeout(() => {
        numberFormattingInstance = pivotGridObj.numberFormattingModule;
        const privateMethod = (numberFormattingInstance as any).valueChange;
        const args = { value: 'quality' };
        privateMethod.call(numberFormattingInstance, args);
        (document.querySelector('.e-ok-btn') as HTMLElement).click();
        done();
      }, 1000);
    });
    it('Invoke groupingChange method', (done) => {
      (
        document.querySelector('.e-pivot-format-toolbar') as HTMLElement
      ).click();
      setTimeout(() => {
        const numberFormatting = document.querySelector(
          '#' + pivotGridObj.element.id + '_FormatDialog'
        );
        let element = (numberFormatting as any).querySelector(
          '#' + pivotGridObj.element.id + '_GroupingDrop'
        );
        (
          getInstance(element as HTMLElement, DropDownList) as DropDownList
        ).value = false;
        let element1 = (numberFormatting as any).querySelector(
          '#' + pivotGridObj.element.id + '_DecimalDrop'
        );
        (
          getInstance(element1 as HTMLElement, DropDownList) as DropDownList
        ).value = '2';
        (document.querySelector('.e-ok-btn') as HTMLElement).click();
        done();
      }, 1000);
    });
    it('Invoke formatChange method', function (done) {
      (
        document.querySelector('.e-pivot-format-toolbar') as HTMLElement
      ).click();
      setTimeout(function () {
        var numberFormatting = document.querySelector(
          '#' + pivotGridObj.element.id + '_FormatDialog'
        );
        var element2 = numberFormatting.querySelector(
          '#' + pivotGridObj.element.id + '_FormatDrop'
        );
        (
          getInstance(element2 as HTMLElement, DropDownList) as DropDownList
        ).value = 'Custom';
        done();
      }, 1000);
    });
    it('Invoke custom method', function (done) {
      (
        document.querySelector('.e-pivot-format-toolbar') as HTMLElement
      ).click();
      setTimeout(function () {
        var numberFormatting = document.querySelector(
          '#' + pivotGridObj.element.id + '_FormatDialog'
        );
        var element2 = numberFormatting.querySelector(
          '#' + pivotGridObj.element.id + '_FormatDrop'
        );
        (
          getInstance(element2 as HTMLElement, DropDownList) as DropDownList
        ).value = 'Number';
        done();
      }, 1000);
    });
    it('Ok button click', function (done) {
      (
        document.querySelector('.e-pivot-format-toolbar') as HTMLElement
      ).click();
      setTimeout(function () {
        (document.querySelector('.e-ok-btn') as HTMLElement).click();
        done();
      }, 1000);
    });
    it('memory leak', () => {
      profile.sample();
      let average: any = inMB(profile.averageChange);
      //Check average change in memory samples to not be over 10MB
      let memory: any = inMB(getMemoryProfile());
      //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
      expect(memory).toBeLessThan(profile.samples[0] + 0.25);
    });
  });
});