/**
 * Specifies the chart print spec.
 */
import { createElement, remove } from '@hoyui/base';
import { AccumulationChart } from '../../../src/accumulation-chart/accumulation';
import { AccumulationLegend } from '../../../src/accumulation-chart/renderer/legend';
import { AccumulationDataLabel } from '../../../src/accumulation-chart/renderer/dataLabel';
import { AccumulationAnnotation } from '../../../src/accumulation-chart/annotation/annotation';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { IPrintEventArgs } from '../../../src/chart/model/chart-interface';
import { PdfPageOrientation } from '@hoyui/pdf-export';
import { Export } from '../../../src/chart/print-export/export';
import { profile, inMB, getMemoryProfile } from '../../common.spec';
import { ILoadEventArgs } from '../../../src';
AccumulationChart.Inject(
  AccumulationAnnotation,
  AccumulationDataLabel,
  AccumulationLegend,
  Export
);
/* eslint-disable */
describe('Chart Control', () => {
  beforeAll(() => {
    const isDef = (o: any) => o !== undefined && o !== null;
    if (!isDef(window.performance)) {
      console.log(
        'Unsupported environment, window.performance.memory is unavailable'
      );
      this.skip(); //Skips test (in Chai)
      return;
    }
  });
  describe('Print Utils for Chart', () => {
    let chartObj: AccumulationChart;
    let element: Element;
    let chartElement: Element;
    chartElement = createElement('div', { id: 'container' });
    (<any>window).open = () => {
      return {
        document: { write: () => {}, close: () => {} },
        close: () => {},
        print: () => {},
        focus: () => {},
        moveTo: () => {},
        resizeTo: () => {},
      };
    };
    beforeAll(() => {
      let template: Element = createElement('div', {
        id: 'template',
        styles: 'display: none;border: 2px solid red',
      });
      document.body.appendChild(template);
      template.innerHTML =
        "<div id='templateWrap' style='background-color:#4472c4;border-radius: 3px;'>" +
        "<img src='../base/spec/img/img1.jpg' style='border-radius: 0px;width: 24px;height: 24px;padding: 2px;' />" +
        "<div style='color:white;float: right;padding: 2px;line-height: 20px; text-align: center; font-family:Roboto; font-style: medium; fontp-size:14px;'><span>Print</span></div></div>";
      document.body.appendChild(chartElement);
      chartObj = new AccumulationChart({
        series: [
          {
            animation: { enable: false },
            name: 'ChartSeries',
            dataSource: [
              { x: 1000, y: 70 },
              { x: 2000, y: -40 },
              { x: 3000, y: 70 },
              { x: 4000, y: 60 },
              { x: 5000, y: -50 },
              { x: 6000, y: -40 },
              { x: 7000, y: 40 },
              { x: 8000, y: 70 },
            ],
            xName: 'x',
            yName: 'y',
          },
        ],
        width: '800',
        title: 'Chart TS Title',
        legendSettings: { visible: true },
        annotations: [
          {
            content: '#template',
            region: 'Series',
            x: '50%',
            y: '50%',
          },
        ],
        loaded: (args: Object): void => {
          chartObj.print();
        },
      });
      chartObj.appendTo('#container');
    });

    afterAll((): void => {
      chartObj.destroy();
      chartElement.remove();
      remove(document.getElementById('template'));
      remove(document.getElementById('template1'));
    });

    it('Checking annotation content', (done: Function) => {
      chartObj.beforePrint = (args: IPrintEventArgs): void => {
        expect(
          args.htmlContent.outerHTML.indexOf(
            '<div id="container_Annotation_0"'
          ) > -1
        ).toBe(true);
        done();
      };
      chartObj.refresh();
    });

    it('Checking data label content', (done: Function) => {
      chartObj.beforePrint = (args: IPrintEventArgs): void => {
        expect(
          args.htmlContent.outerHTML.indexOf(
            '<div id="container_Series_0_DataLabel_0"'
          ) > -1
        ).toBe(true);
        done();
      };
      chartObj.series[0].dataLabel.visible = true;
      chartObj.series[0].dataLabel.template = '#template';
      chartObj.refresh();
    });

    it('Checking legend content', (done: Function) => {
      chartObj.beforePrint = (args: IPrintEventArgs): void => {
        expect(
          args.htmlContent.outerHTML.indexOf(
            '<g id="container_chart_legend_g">'
          ) > -1
        ).toBe(true);
        expect(
          args.htmlContent.outerHTML.indexOf(
            '<g id="container_chart_legend_collections"'
          ) > -1
        ).toBe(true);
        done();
      };
      chartObj.refresh();
    });

    it('Checking argument cancel', (done: Function) => {
      chartObj.beforePrint = (args: IPrintEventArgs): void => {
        args.cancel = true;
        expect(
          args.htmlContent.outerHTML.indexOf(
            '<div id="container_Annotation_0"'
          ) > -1
        ).toBe(true);
        done();
      };
      chartObj.refresh();
    });

    it('Checking annotation style', (done: Function) => {
      chartObj.beforePrint = (args: IPrintEventArgs): void => {
        expect(
          args.htmlContent.outerHTML.indexOf(
            'style="background-color:#4472c4;border-radius: 3px;"'
          ) > -1
        ).toBe(true);
        done();
      };
      chartObj.refresh();
    });
    it('Checking accumulation export', (done: Function) => {
      chartObj.loaded = (args: ILoadEventArgs): void => {
        expect(document.getElementById('container') !== null).toBe(true);
        done();
      };
      chartObj.afterExport = (args: IPrintEventArgs): void => {
        args.cancel = true;
      };
      chartObj.export('JPEG', 'chart');
      chartObj.refresh();
    });
  });
  it('memory leak', () => {
    profile.sample();
    let average: any = inMB(profile.averageChange);
    //Check average change in memory samples to not be over 10MB
    expect(average).toBeLessThan(10);
    let memory: any = inMB(getMemoryProfile());
    //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
    expect(memory).toBeLessThan(profile.samples[0] + 0.25);
  });
});
