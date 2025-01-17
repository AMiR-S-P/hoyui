/**
 * Diagram spec document
 */
import { createElement } from '@hoyui/base';
import { Diagram } from '../../../src/diagram/diagram';
import { GridlinesModel, SnapSettingsModel } from '../../../src/diagram/diagram/grid-lines-model';
import { Html } from '../../../src';
import { profile, inMB, getMemoryProfile } from '../../../spec/common.spec';
/**
 * Path
 */
describe('Diagram Control', () => {

    describe('GridLines property', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramd' });
            document.body.appendChild(ele);
            diagram = new Diagram({
                mode: 'Canvas',
                width: 1000, height: 1000
            });
            diagram.appendTo('#diagramd');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking Default gridline values in SVG rendering Mode', (done: Function) => {
            done();

        });
    });
    describe('GridLines property', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let horizontalGridlines: GridlinesModel;
        let verticalGridlines: GridlinesModel;
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagrame' });
            document.body.appendChild(ele);
            horizontalGridlines = { lineColor: 'blue', lineDashArray: '2,2' };
            verticalGridlines = { lineColor: 'red', lineDashArray: '2,2' };
            let snapSettings: SnapSettingsModel = { horizontalGridlines: horizontalGridlines, verticalGridlines: verticalGridlines };
            diagram = new Diagram({
                mode: 'Canvas',
                width: 1000, height: 1000, snapSettings: snapSettings
            });
            diagram.appendTo('#diagrame');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking customized gridlines line dash array in SVG rendering Mode', (done: Function) => {
            expect(diagram.snapSettings.horizontalGridlines.lineColor == 'blue' && diagram.snapSettings.horizontalGridlines.lineDashArray == '2,2' &&
                diagram.snapSettings.verticalGridlines.lineColor === 'red' && diagram.snapSettings.verticalGridlines.lineDashArray == '2,2').toBe(true);
            done();
        });
    });

    describe('GridLines property', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let horizontalGridlines: GridlinesModel;
        let verticalGridlines: GridlinesModel
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramf' });
            document.body.appendChild(ele);
            horizontalGridlines = { lineIntervals: [1, 14, 0.5, 14.5] };
            verticalGridlines = { lineIntervals: [1, 14, 0.5, 14.5] };
            let snapSettings: SnapSettingsModel = { horizontalGridlines: horizontalGridlines, verticalGridlines: verticalGridlines };
            diagram = new Diagram({
                mode: 'Canvas',
                width: 1000, height: 1000, snapSettings: snapSettings
            });
            diagram.appendTo('#diagramf');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking customized gridlines line interval in SVG rendering Mode', (done: Function) => {
            expect(diagram.snapSettings.horizontalGridlines.lineIntervals == horizontalGridlines.lineIntervals &&
                diagram.snapSettings.verticalGridlines.lineIntervals == verticalGridlines.lineIntervals).toBe(true);
            done();
        });
    });

    describe('GridLines property', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let horizontalGridlines: GridlinesModel;
        let verticalGridlines: GridlinesModel
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramred' });
            document.body.appendChild(ele);
            horizontalGridlines = { lineIntervals: [1, 14, 0.5, 14.5], lineColor: 'red' };
            verticalGridlines = { lineIntervals: [1, 14, 0.5, 14.5], lineColor: 'red' };
            let snapSettings: SnapSettingsModel = { horizontalGridlines: horizontalGridlines, verticalGridlines: verticalGridlines };
            diagram = new Diagram({
                mode: 'Canvas',
                width: 1000, height: 1000, snapSettings: snapSettings
            });
            diagram.appendTo('#diagramred');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking customized gridlines line color in SVG rendering Mode', (done: Function) => {
            let path: HTMLElement = (document.getElementById('diagramred_pattern') as HTMLElement).firstChild as HTMLElement;
            expect(path.getAttribute('stroke') === 'red').toBe(true);
            done();
        });
        it('memory leak', () => {
            profile.sample();
            let average: any = inMB(profile.averageChange)
            //Check average change in memory samples to not be over 10MB
            expect(average).toBeLessThan(10);
            let memory: any = inMB(getMemoryProfile())
            //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
            expect(memory).toBeLessThan(profile.samples[0] + 0.25);
        })
    });
});