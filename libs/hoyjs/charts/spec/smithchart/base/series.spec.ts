import {
  Smithchart,
  SmithchartLegend,
  ISmithchartLoadedEventArgs,
  ISmithchartAnimationCompleteEventArgs,
} from '../../../src/smithchart/index';
import { createElement, remove } from '@hoyui/base';
import { profile, inMB, getMemoryProfile } from '../../common.spec';

Smithchart.Inject(SmithchartLegend);

/**
 * Legend spec
 */
describe('Smithchart Series properties tesing', () => {
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
  describe('Series testing', () => {
    let id: string = 'container';
    let smithchart: Smithchart;
    let ele: HTMLDivElement;
    let spec: Element;
    beforeAll(() => {
      ele = <HTMLDivElement>(
        createElement('div', { id: id, styles: 'height: 512px; width: 512px;' })
      );
      document.body.appendChild(ele);
      smithchart = new Smithchart(
        {
          series: [
            {
              dataSource: [
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0, reactance: 0.05 },
                { resistance: 0.3, reactance: 0.1 },
                { resistance: 0.3, reactance: 0.1 },
                { resistance: 0.3, reactance: 0.1 },
                { resistance: 0.3, reactance: 0.1 },
                { resistance: 0.5, reactance: 0.2 },
                { resistance: 1.0, reactance: 0.4 },
                { resistance: 1.5, reactance: 0.5 },
                { resistance: 2.0, reactance: 0.5 },
                { resistance: 2.5, reactance: 0.4 },
                { resistance: 3.5, reactance: 0.0 },
                { resistance: 4.5, reactance: -0.5 },
                { resistance: 5.0, reactance: -1.0 },
              ],
              fill: 'red',
              resistance: 'resistance',
              reactance: 'reactance',
              marker: {
                visible: true,
                dataLabel: {
                  visible: true,
                  fill: 'red',
                },
                width: 10,
                height: 10,
              },
            },
          ],
        },
        '#' + id
      );
    });
    afterAll(() => {
      remove(ele);
      smithchart.destroy();
    });
    it('Checking with marker fill', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.fill = 'red';
      smithchart.refresh();
    });
    it('Checking with marker shape as circle', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.shape = 'Circle';
      smithchart.refresh();
    });
    it('Checking with marker shape as triangle', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.shape = 'Triangle';
      smithchart.refresh();
    });
    it('Checking with marker shape as diamond', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.shape = 'Diamond';
      smithchart.refresh();
    });
    it('Checking with marker shape as rectangle', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.shape = 'Rectangle';
      smithchart.refresh();
    });
    it('Checking with marker shape as pentagon', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.shape = 'Pentagon';
      smithchart.refresh();
    });
    it('Checking with series without series name', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_Marker0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].name = '';
      smithchart.refresh();
    });
    it('Checking with datalabel fill as Red', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_Series0_Points0_dataLabel_symbol0'
        );
        let color: string = element.getAttribute('fill');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.dataLabel.fill = 'red';
      smithchart.refresh();
    });
    it('Checking with datalabel without fill color', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.series[0].marker.dataLabel.fill = '';
      smithchart.refresh();
    });

    it('Checking with enableAnimation with Impedance Type', (done: Function) => {
      smithchart.animationComplete = (
        args: ISmithchartAnimationCompleteEventArgs
      ) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
        done();
      };
      smithchart.renderType = 'Impedance';
      smithchart.series[0].marker.fill = 'red';
      smithchart.series[0].enableAnimation = true;
      smithchart.series[0].animationDuration = '1ms';
      smithchart.refresh();
      done();
    });
    it('Checking with enableAnimation with Admittance type', (done: Function) => {
      smithchart.animationComplete = (
        args: ISmithchartAnimationCompleteEventArgs
      ) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
        done();
      };
      smithchart.renderType = 'Admittance';
      smithchart.series[0].marker.fill = 'red';
      smithchart.series[0].enableAnimation = true;
      smithchart.series[0].animationDuration = '1ms';
      smithchart.refresh();
      done();
    });
    it('Checking with datalabel template', (done: Function) => {
      smithchart.animationComplete = (
        args: ISmithchartAnimationCompleteEventArgs
      ) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
        done();
      };
      smithchart.series[0].marker.dataLabel.template =
        '<div id="template" ><p>{{:point}}</p></div>';
      smithchart.series[0].marker.fill = 'red';
      smithchart.series[0].enableAnimation = true;
      smithchart.series[0].animationDuration = '1ms';
      smithchart.refresh();
      done();
    });
    it('Checking with smartLabel fill as Red with connector line', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.series[0].enableSmartLabels = true;
      smithchart.series[0].marker.dataLabel.visible = true;
      smithchart.series[0].marker.dataLabel.template = '';
      smithchart.series[0].marker.dataLabel.connectorLine.color = 'red';
      smithchart.refresh();
    });
    it('Checking with smartLabel fill as Red without connector line color', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.series[0].enableSmartLabels = true;
      smithchart.series[0].marker.dataLabel.visible = true;
      smithchart.series[0].marker.dataLabel.connectorLine.color = '';
      smithchart.refresh();
    });
    it('Checking with material theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'Material';
      smithchart.refresh();
    });
    it('Checking with fabric theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'Fabric';
      smithchart.refresh();
    });
    it('Checking with bootstrap theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'Bootstrap';
      smithchart.refresh();
    });
    it('Checking with bootstrap4 theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'Bootstrap4';
      smithchart.refresh();
    });
    it('Checking with highcontrast theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'HighContrastLight';
      smithchart.refresh();
    });
    it('Checking with Dark theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'HighContrast';
      smithchart.refresh();
    });
    it('Checking with Dark theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'HighContrastLight';
      smithchart.refresh();
    });
    it('Checking with Dark theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'FabricDark';
      smithchart.refresh();
    });
    it('Checking with persist data', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.getPersistData();
      smithchart.refresh();
    });
    it('Checking theme with onProperty changed', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        expect(color).toEqual('red');
      };
      smithchart.theme = 'Fabric';
      smithchart.dataBind();
    });
    it('Checking theme with onProperty changed meterial dark theme', () => {
      smithchart.loaded = (args: ISmithchartLoadedEventArgs) => {
        let element: Element = document.getElementById(
          smithchart.element.id + '_series0_points'
        );
        let color: string = element.getAttribute('stroke');
        args.smithchart.setTabIndex(null, null);
        expect(color).toEqual('red');
      };
      smithchart.theme = 'MaterialDark';
      smithchart.dataBind();
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
