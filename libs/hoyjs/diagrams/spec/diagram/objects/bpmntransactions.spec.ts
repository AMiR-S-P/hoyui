import { createElement } from '@hoyui/base';
import { Diagram } from '../../../src/diagram/diagram';
import { Node } from '../../../src/diagram/objects/node';
import { NodeModel, BpmnShapeModel, BpmnSubProcessModel, BpmnActivityModel } from '../../../src/diagram/objects/node-model';
import { ShapeStyleModel, ShadowModel } from '../../../src/diagram/core/appearance-model';
import { PathElement } from '../../../src/diagram/core/elements/path-element';
import { NodeConstraints } from '../../../src/diagram/enum/enum';
import { BpmnDiagrams } from '../../../src/diagram/objects/bpmn';
import { Canvas, Connector, BpmnShape } from '../../../src/diagram/index';
import { MouseEvents } from '../interaction/mouseevents.spec';
import  {profile , inMB, getMemoryProfile} from '../../../spec/common.spec';
Diagram.Inject(BpmnDiagrams);

/**
 * BPMN shapes -  Message, DataSource, Group
 */
describe('Diagram Control', () => {

    describe('BPMN Transaction Subprocess', () => {
        let diagram: Diagram;
        let ele: HTMLElement;

        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
                if (!isDef(window.performance)) {
                    console.log("Unsupported environment, window.performance.memory is unavailable");
                    this.skip(); //Skips test (in Chai)
                    return;
                }
            ele = createElement('div', { id: 'diagram' });
            document.body.appendChild(ele);
            let shadow: ShadowModel = { distance: 10, opacity: 0.5 };
            let node: NodeModel = {
                id: 'node', width: 100, height: 100, offsetX: 100, offsetY: 100,
                style: { fill: 'red', strokeColor: 'blue', strokeWidth: 5, } as ShapeStyleModel,
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: { type: 'Transaction' }
                    }
                }
            };

            diagram = new Diagram({
                width: 1000, height: 500, nodes: [node]
            });
            diagram.appendTo('#diagram');
        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('BPMN shapes -  Transaction Rendering', (done: Function) => {
            let node: NodeModel = diagram.nodes[0];
            expect(((node.wrapper.children[0] as Canvas).children[0] as Canvas).children.length).toBe(7);
            expect((((node.wrapper.children[0] as Canvas).children[0] as Canvas).children[2] as Canvas).children.length).toBe(3);
            done();
        });

        it('Creating connections to transaction sub-process', (done: Function) => {
            diagram.add({
                id: 'success', offsetX: 300, offsetY: 200, width: 100, height: 100,
                shape: { type: 'Bpmn', shape: 'Event', event: { trigger: 'Message', event: 'Intermediate' } }
            });

            diagram.add({ id: 'connector', sourceID: 'node', targetID: 'success' });

            let connector = diagram.nameTable['connector'];

            expect((connector as Connector).sourceWrapper.id == 'node_boundary').toBe(true);

            connector.sourcePortID = 'success';
            diagram.dataBind();
            expect((connector as Connector).sourceWrapper.id == 'node_success_0_event').toBe(true);
            done();
        });

        it('Connecting to transaction events interactively', (done: Function) => {

            let events: MouseEvents = new MouseEvents();
            diagram.add({ id: 'connector1', sourcePoint: { x: 300, y: 300 }, targetPoint: { x: 500, y: 500 } });

            let diagramCanvas: HTMLElement = document.getElementById(diagram.element.id + 'content');

            events.clickEvent(diagramCanvas, 308, 308);

            events.mouseDownEvent(diagramCanvas, 300, 300);

            events.mouseMoveEvent(diagramCanvas, 300, 250);

            events.mouseMoveEvent(diagramCanvas, 130, 150);

            events.mouseUpEvent(diagramCanvas, 130, 150);

            let connector = diagram.nameTable['connector1'];

            expect(connector.sourcePortID != 'cancel').toBe(true);

            done();
        });

        it('Creating the visibility of the sub-event', (done: Function) => {

            diagram.add({ id: 'connector3', sourceID: 'node', sourcePortID: 'failure' });
            (diagram.nodes[0].shape as BpmnShape).activity.subProcess.transaction.success.visible = false;
            (diagram.nodes[0].shape as BpmnShape).activity.subProcess.transaction.failure.visible = false;
            (diagram.nodes[0].shape as BpmnShape).activity.subProcess.transaction.cancel.visible = false;
            diagram.nodes[0].style.strokeColor = 'red';
            diagram.nodes[0].style.opacity = 0.5;
            diagram.dataBind();
            let connector: Connector = diagram.connectors[0] as Connector;
            expect(connector.sourceWrapper.id == 'node_boundary').toBe(true);
            connector = diagram.connectors[1] as Connector;
            done();
        });

        it('Changing the position of the sub-event', (done: Function) => {
            let node = diagram.nodes[0];
            (diagram.nodes[0].shape as BpmnShape).activity.subProcess.transaction.success.offset = { x: 0, y: 0.5 };

            diagram.dataBind();

            expect((((node.wrapper.children[0] as Canvas).children[0] as Canvas).children[2] as Canvas).children[0].offsetX).toBe(50);
            expect((((node.wrapper.children[0] as Canvas).children[0] as Canvas).children[2] as Canvas).children[0].offsetY).toBe(100);
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
    describe('Fill color of BPMN Transaction Subprocess is not applied', () => {
        let diagram: Diagram;
        let ele: HTMLElement;

        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
                if (!isDef(window.performance)) {
                    console.log("Unsupported environment, window.performance.memory is unavailable");
                    this.skip(); //Skips test (in Chai)
                    return;
                }
            ele = createElement('div', { id: 'diagramSubProcess' });
            document.body.appendChild(ele);
            let node: NodeModel = {
                id: 'node', width: 100, height: 100, offsetX: 100, offsetY: 100,
                style: { fill: 'green' } as ShapeStyleModel,
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: { type: 'Transaction',collapsed:true }
                    }
                }
            };

            diagram = new Diagram({
                width: 1000, height: 500, nodes: [node]
            });
            diagram.appendTo('#diagramSubProcess');
        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

       it('Checking the fill color of the transaction subprocess', (done: Function) => {
            let node: NodeModel = diagram.nodes[0];
            expect((node.wrapper.children[0] as Canvas).children[0].style.fill === 'green' && (node.wrapper.children[0] as Canvas).children[1].style.fill === 'transparent').toBe(false);
            done();
        });
        it('Changing the fill color of the transaction subprocess', (done: Function) => {
            diagram.nodes[0].style.fill = 'red';
            diagram.dataBind();
            let node: NodeModel = diagram.nodes[0];
            expect(((node.wrapper.children[0] as Canvas).children[0] as Canvas).children[0].style.fill === 'red' && ((node.wrapper.children[0] as Canvas).children[0] as Canvas).children[1].style.fill === 'transparent').toBe(true);
            done();
        });
        it('Checking the opacity of the transaction subprocess', (done: Function) => {
            diagram.nodes[0].style.opacity = 0.5;
            diagram.dataBind();
            let node: NodeModel = diagram.nodes[0];
            expect(node.style.opacity === 0.5 && ((node.wrapper.children[0] as Canvas).children[0] as Canvas).children[0].style.opacity === 0.5).toBe(true);
            done();
        });
    });
    describe('858761-Default Tooltip is not positioned properly after drag and drop the child of subprocess in diagram.', () => {
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
            ele = createElement('div', { id: 'diagramSub-process' });
            document.body.appendChild(ele);
            let nodea: NodeModel = {
                id: 'nodea', width: 400, height: 400, maxHeight: 600, maxWidth: 600, minWidth: 300, minHeight: 300,
                constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
                offsetX: 300, offsetY: 200,
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: {
                            collapsed: false, type: 'Event',
                            processes: ['start']
                        } as BpmnSubProcessModel
                    } as BpmnActivityModel,
                },
            };

            let start: NodeModel = {
                id: 'start', shape: { type: 'Bpmn', shape: 'Event' }, width: 100, height: 100,
                margin: { left: 10, top: 50 }
            };
            diagram = new Diagram({
                width: 1200, height: 1200, nodes: [nodea, start],
            });

            diagram.appendTo('#diagramSub-process');
        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('drag and drop the process child from subProcess to diagram ', (done: Function) => {
            let diagramCanvas: HTMLElement = document.getElementById(diagram.element.id + 'content');
            let node = diagram.nameTable['start'].wrapper;
            mouseEvents.mouseDownEvent(diagramCanvas,node.bounds.center.x, node.bounds.center.y);
            mouseEvents.mouseMoveEvent(diagramCanvas,node.bounds.center.x - 50, node.bounds.center.y);
            mouseEvents.mouseMoveEvent(diagramCanvas,node.bounds.center.x - 100, node.bounds.center.y);
            mouseEvents.mouseUpEvent(diagramCanvas,node.bounds.center.x -100, node.bounds.center.y);
            let start = document.getElementById('start_groupElement');
            expect(start.parentElement.id === 'diagramSub-process_diagramLayer').toBe(true);
            done()
        });
    });

    describe('880814-Adding element to bpmn expanded subprocess located in swimlane throws an exception', () => {
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
            ele = createElement('div', { id: 'diagramSub-Swim' });
            document.body.appendChild(ele);
            let nodes: NodeModel[] = [
                {
                    id: 'Start',
                    height: 50, width: 50,
                    margin: { left: 30, top: 30 },
                    shape: {
                        type: 'Bpmn',
                        shape: 'Event',
                        event: { event: 'Start' },
                    },
                },
                {
                    id: 'swimlane',
                    shape: {
                        type: 'SwimLane',
                        header: {
                            annotation: { content: 'ONLINE PURCHASE STATUS', style: { fill: '#111111' } },
                            height: 50, style: { fontSize: 11 },
                            orientation: 'Horizontal',
                        },
                        lanes: [
                            {
                                id: 'stackCanvas1',
                                header: {
                                    annotation: { content: 'CUSTOMER' }, width: 50,
                                    style: { fontSize: 11 }
                                },
                                height: 200,
                                children:[
                                    {
                                        id: 'subProcess',
                                        width: 300,
                                        height: 100,
                                        constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
                                        margin: { left: 60, top: 20 },
                                        shape: {
                                            shape: 'Activity',
                                            type: 'Bpmn',
                                            activity: {
                                                activity: 'SubProcess',
                                                subProcess: {
                                                    collapsed: false,
                                                    processes: ['Start']
                                                },
                                            },
                                        },
                                    },
                                ]
                            },
                        ],
                        phases: [
                            {
                                id: 'phase1', offset: 170,
                                header: { content: { content: 'Phase' } }
                            },
                        ],
                        phaseSize: 20,
                    },
                    offsetX: 520, offsetY: 270,
                    height: 100,
                    width: 750
                },
            ];
            diagram = new Diagram({
                width: 1200, height: 1200, nodes: nodes,
            });

            diagram.appendTo('#diagramSub-Swim');
        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('drag and drop the process child from subProcess to diagram ', (done: Function) => {
            let diagramCanvas: HTMLElement = document.getElementById(diagram.element.id + 'content');
            let node = diagram.nameTable['subProcess'].wrapper;
            let obj = diagram.nameTable['subProcess'];
            mouseEvents.mouseDownEvent(diagramCanvas,node.bounds.center.x, node.bounds.center.y);
            mouseEvents.mouseMoveEvent(diagramCanvas,node.bounds.center.x + 150, node.bounds.center.y);
            mouseEvents.mouseMoveEvent(diagramCanvas,node.bounds.center.x + 300, node.bounds.center.y);
            mouseEvents.mouseMoveEvent(diagramCanvas,node.bounds.center.x  + 600, node.bounds.center.y);
            mouseEvents.mouseMoveEvent(diagramCanvas,node.bounds.center.x  + 700, node.bounds.center.y);
            mouseEvents.mouseUpEvent(diagramCanvas,node.bounds.center.x  + 700, node.bounds.center.y);
            expect(obj.id === 'subProcess' && (obj.shape as BpmnShape).activity.subProcess.processes.length > 0).toBe(true);
            done()
        });

        it('Adding subProcess inside the subProcess', (done: Function) => {
            let subProcess1 =   {
                id: 'subProcess1', maxHeight: 600, maxWidth: 600, minWidth: 300, minHeight: 300,
                offsetX: 200, offsetY: 200,
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: {
                            collapsed: false,
                            processes:['subProcess2']
                        }
                    },
                },
            };
            let start = {id:'start',width:50,height:40,shape:{type:'Bpmn',shape:'Event'}};
            let subProcess2 = {
                id: 'subProcess2', maxHeight: 300, maxWidth: 300, minWidth: 100, minHeight: 100,
                offsetX: 200, offsetY: 200,
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: {
                            collapsed: false,
                            processes:['start']
                        }
                    },
                },
            };
            diagram.add(start as NodeModel);
            diagram.add(subProcess2 as NodeModel);
            diagram.add(subProcess1 as NodeModel);
            let sub = diagram.nameTable['subProcess1'];
            expect(sub.shape && sub.shape.activity && sub.shape.activity.subProcess.processes[0] === 'subProcess2').toBe(true);
            done()
        });
    });
});