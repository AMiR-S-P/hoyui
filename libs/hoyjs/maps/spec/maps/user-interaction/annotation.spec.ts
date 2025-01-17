/**
 * Annotation spec document
 */
import { Maps, ILoadedEventArgs, ITouches } from '../../../src/index';
import { createElement, remove } from '@hoyui/base';
import { World_Map, usMap, CustomPathData, flightRoutes, intermediatestops1 } from '../data/data.spec';
import { MouseEvents } from '../../../spec/maps/base/events.spec';
import { Zoom, Bubble, Marker, Annotations } from '../../../src/maps/index';
import  {profile , inMB, getMemoryProfile} from '../common.spec';
Maps.Inject(Zoom, Marker, Bubble, Annotations);

let MapData: Object = World_Map;
describe('Zoom feature tesing for Map control', () => {
    beforeAll(() => {
        const isDef = (o: any) => o !== undefined && o !== null;
        if (!isDef(window.performance)) {
            console.log("Unsupported environment, window.performance.memory is unavailable");
            this.skip(); //Skips test (in Chai)
            return;
        }
    });
    describe('Checking tool bar zooming', () => {
        let id: string = 'container';
        let map: Maps;
        let ele: HTMLDivElement;
        let trigger: MouseEvents = new MouseEvents();
        let template: string = '<script id=template type="text/x-template"><div id="tool">80</div></script>' +
            '<script id=template1 type="text/x-template"><div>100</div></script>';
        let annotationDiv: HTMLElement = createElement('div', { id: 'annotation', innerHTML: 'Map' });
        beforeAll(() => {
            ele = <HTMLDivElement>createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
            document.body.appendChild(ele);
            map = new Maps({
                baseLayerIndex: 0,
                layers: [
                    {
                        shapeData: MapData
                    }
                ]
            }, '#' + id);
        });
        afterAll(() => {
            remove(ele);
            map.destroy();
        });

        it('Checking annotation element', (): void => {
            map.loaded = (args: ILoadedEventArgs): void => {
                let element: Element = document.getElementById(map.element.id + '_Annotations_Group');
                expect(element.childElementCount).toBeGreaterThanOrEqual(1);
            };
            map.annotations = [{
                content: '<div><img src="http://js.syncfusion.com/demos/web/Images/map/pin.png" style="height:30px;width:30px;"></img></div>'
            }];
            map.refresh();
        });

        it('Checking annotation without specifying div element', (done: Function): void => {
            map.loaded = (args: ILoadedEventArgs): void => {
                let element: Element = document.getElementById(map.element.id + '_Annotations_Group');
                expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                done();
            };
            map.annotations = [{
                content: '#annotation'
            }];
            map.refresh();
        });

        it('Checking annotation with percentage value', (): void => {
            map.loaded = (args: ILoadedEventArgs): void => {
                let element: Element = document.getElementById(map.element.id + '_Annotations_Group');
                expect(element.childElementCount).toBeGreaterThanOrEqual(1);
            };
            map.annotations = [{
                content: '<div><img src="http://js.syncfusion.com/demos/web/Images/map/pin.png" style="height:30px;width:30px;"></img></div>',
                x: '50%',
                y: '50%'
            }];
            map.refresh();
        });

        it('Checking annotation with near alignment in both orientation', (done: Function): void => {
            map.loaded = (args: ILoadedEventArgs): void => {
                let element: Element = document.getElementById(map.element.id + '_Annotations_Group');
                expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                done();
            };
            map.annotations = [{
                content: '<div><img src="http://js.syncfusion.com/demos/web/Images/map/pin.png" style="height:30px;width:30px;"></img></div>',
                verticalAlignment: 'Near',
                horizontalAlignment: 'Near'
            }];
            map.refresh();
        });

        it('Checking annotation with Center alignment in both orientation', (done: Function): void => {
            map.loaded = (args: ILoadedEventArgs): void => {
                let element: Element = document.getElementById(map.element.id + '_Annotations_Group');
                expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                done();
            };
            map.annotations = [{
                content: '<div><img src="http://js.syncfusion.com/demos/web/Images/map/pin.png" style="height:30px;width:30px;"></img></div>',
                verticalAlignment: 'Center',
                horizontalAlignment: 'Center'
            }];
            map.refresh();
        });

        it('Checking annotation with Far alignment in both orientation', (): void => {
            map.loaded = (args: ILoadedEventArgs): void => {
                let element: Element = document.getElementById(map.element.id + '_Annotations_Group');
                expect(element.childElementCount).toBeGreaterThanOrEqual(1);
            };
            map.annotations = [{
                content: '<div><img src="http://js.syncfusion.com/demos/web/Images/map/pin.png" style="height:30px;width:30px;"></img></div>',
                verticalAlignment: 'Far',
                horizontalAlignment: 'Far'
            }];
            map.refresh();
        });
    });
    it('memory leak', () => {
        profile.sample();
        let average: any = inMB(profile.averageChange)
        //Check average change in memory samples to not be over 10MB
        expect(average).toBeLessThan(10);
        let memory: any = inMB(getMemoryProfile())
        //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
        expect(memory).toBeLessThan(profile.samples[0] + 0.25);
    });
});