/**
 * Diagram spec document
 */
import { createElement, L10n } from '@hoyui/base';
import { Diagram } from '../../../src/diagram/diagram'; import { BackgroundModel } from '../../../src/diagram/diagram/page-settings-model';
import { DiagramModel, ConnectorModel, NodeModel, ContextMenuSettings } from '../../../src/diagram/index';
import { MouseEvents } from '../interaction/mouseevents.spec';
import { MenuItemModel, MenuEventArgs } from '@hoyui/navigations';
import { profile, inMB, getMemoryProfile } from '../../../spec/common.spec';
;


/**
 * Page Background
 */
describe('Diagram Control', () => {
    describe('Background', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagrama' });
            document.body.appendChild(ele);
            diagram = new Diagram({

                width: '1000px', height: '600px',
            } as DiagramModel);
            diagram.appendTo('#diagrama');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking diagram without background', (done: Function) => {
            diagram.getPersistData();
            done();
        });
    });
    describe('Background', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramb' });
            document.body.appendChild(ele);
            let background: BackgroundModel = { source: 'base/spec/images/bike.jpg' };
            diagram = new Diagram({

                width: '1000px', height: '600px', pageSettings: { background: background }
            } as DiagramModel);
            diagram.appendTo('#diagramb');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking with background image', (done: Function) => {

            done();
        });
    });

    describe('Text element white space and break word property', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramc' });
            document.body.appendChild(ele);
            let background: BackgroundModel = { color: 'red' };
            diagram = new Diagram({

                width: '1000px', height: '600px', pageSettings: { background: background }
            } as DiagramModel);
            diagram.appendTo('#diagramc');
        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking wiht background color', (done: Function) => {

            done();
        });
    });


    describe('Diagram checking localization', () => {
        let node1: NodeModel = {
            id: 'NewIdea', width: 100, height: 100, offsetX: 300, offsetY: 60,
            shape: { type: 'Flow', shape: 'Terminator' },
            annotations: [{
                id: 'label1', content: 'New idea identified', offset: { x: 0.5, y: 0.5 }
            }]
        };

        let node2: NodeModel = {
            id: 'Meeting', width: 150, height: 60, offsetX: 300, offsetY: 155,
            shape: { type: 'Flow', shape: 'Process' },
            annotations: [{
                id: 'label2', content: 'Meeting with board', offset: { x: 0.5, y: 0.5 }

            }]
        };
        let connector1: ConnectorModel = {
            id: 'connector1', type: 'Straight', sourceID: 'NewIdea', targetID: 'Meeting'
        };
        L10n.load({
            'de-DE': {
                'diagram': {
                    Cut: 'Corte',
                    Copy: 'Copia',
                    Paste: 'Pasta',
                    Undo: 'Deshacer',
                    Redo: 'Rehacer',
                    SelectAll: 'Seleccionar todo',
                    Grouping: 'Agrupación',
                    Group: 'Grupo',
                    Ungroup: 'Desagrupar',
                    Order: 'Fin',
                    BringToFront: 'Traer a delante',
                    MoveForward: 'Movimiento adelante',
                    SendToBack: 'Enviar a espalda',
                    SendBackward: 'Enviar hacia atrás'
                },
            }
        });
        let diagram: Diagram;
        let ele: HTMLElement;
        let mouseEvents: MouseEvents = new MouseEvents();

        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramdraw' });
            document.body.appendChild(ele);
            diagram = new Diagram({
                width: '1000px', height: '1000px',
                nodes: [node1, node2],
                connectors: [connector1],
                locale: 'de-DE',
                contextMenuSettings: { show: true },
            });
            diagram.appendTo('#diagramdraw');

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });
        it('check Context Menu - localization', (done: Function) => {
            let diagramCanvas: HTMLElement = document.getElementById(diagram.element.id + 'content');
            mouseEvents.clickEvent(diagramCanvas, 350, 110);
            (diagram.contextMenuModule as any).eventArgs = { target: document.getElementById('diagramdraw_diagramAdorner_svg') };
            let e = {
                event: (diagram.contextMenuModule as any).eventArgs,
                items: diagram.contextMenuModule.contextMenu.items as MenuItemModel[],
            };
            expect((diagram.contextMenuModule as any).element).not.toBe(null);
            expect((diagram.contextMenuModule as any).element.id).toBe(diagram.element.id + '_contextMenu');
            expect(diagram.contextMenuModule.contextMenu.locale).toBe(diagram.locale);
            expect(diagram.contextMenuModule.contextMenu.items[0].text).toBe('Copia');
            (diagram.contextMenuModule as any).contextMenuOpen();
            (diagram.contextMenuModule as any).contextMenuOnClose(e);
            diagram.clearSelection();
            done();
        });
    });

    describe('Diagram checking Context menu template ', () => {
        let node1: NodeModel = {
            id: 'NewIdea', width: 100, height: 100, offsetX: 300, offsetY: 60,
            shape: { type: 'Flow', shape: 'Terminator' },
            annotations: [{
                id: 'label1', content: 'New idea identified', offset: { x: 0.5, y: 0.5 }
            }]
        };

        let node2: NodeModel = {
            id: 'Meeting', width: 150, height: 60, offsetX: 300, offsetY: 155,
            shape: { type: 'Flow', shape: 'Process' },
            annotations: [{
                id: 'label2', content: 'Meeting with board', offset: { x: 0.5, y: 0.5 }

            }]
        };
        let connector1: ConnectorModel = {
            id: 'connector1', type: 'Straight', sourceID: 'NewIdea', targetID: 'Meeting'
        };

        let diagram: Diagram;
        let ele: HTMLElement;
        let mouseEvents: MouseEvents = new MouseEvents();

        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramdraw' });
            document.body.appendChild(ele);
            diagram = new Diagram({
                width: '1000px', height: '1000px',
                nodes: [node1, node2],
                connectors: [connector1],
                contextMenuSettings: {
                    show: true, items: [{
                        text: 'Cut', id: 'Cut', target: '.e-diagramcontent',
                        iconCss: 'e-Cut'
                    },
                    {
                        text: 'Copy', id: 'Copy', target: '.e-diagramcontent',
                        iconCss: 'e-Copy'
                    }],
                    showCustomMenuOnly: true,
                },
                contextMenuBeforeItemRender: (args: MenuEventArgs) => {
                    // To render template in li.
                    let shortCutSpan: HTMLElement = createElement('span');
                    let text: string = args.item.text;
                    let shortCutText: string = text === 'Cut' ? 'Ctrl + S' : (text === 'Copy' ?
                        'Ctrl + U' : 'Ctrl + Shift + I');
                    shortCutSpan.textContent = shortCutText;
                    args.element.appendChild(shortCutSpan);
                    shortCutSpan.setAttribute('class', 'shortcut');
                }
            });
            diagram.appendTo('#diagramdraw');

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
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