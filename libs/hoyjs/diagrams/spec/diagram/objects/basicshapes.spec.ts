import { createElement } from '@hoyui/base';
import { Diagram } from '../../../src/diagram/diagram';
import { NodeModel, BasicShapeModel, PathModel } from '../../../src/diagram/objects/node-model';
import { DiagramElement } from '../../../src/diagram/core/elements/diagram-element';
import { profile, inMB, getMemoryProfile } from '../../../spec/common.spec';
import { ConnectorModel } from '../../../src';
/**
 * Node spec
 */
describe('Diagram Control', () => {
    describe('Add diagram nodes or connectors collection dynamically through API method',()=>{
        let diagram: Diagram;
        let ele: HTMLElement;
    
        beforeAll(():void=>{
            ele = createElement('div', { id: 'addDiagramElements' }); 
            document.body.appendChild(ele);
            diagram = new Diagram({
                width: "1200px", height: "500px",
                 });
             diagram.appendTo('#addDiagramElements');
             let nodes: NodeModel[]=[
                {
                    id: 'node1',  offsetX: 100, offsetY: 100,
                   
                },
                {
                    id: 'node2',  offsetX: 300, offsetY: 100,
                    
                },
                {
                    id: 'node3', offsetX: 600, offsetY: 100,
                },
                {
                    id: 'node4',  offsetX: 300, offsetY: 300,
                },
                {
                    id: 'node44', offsetX: 600, offsetY: 300,
                },
             ];
            let connectors: ConnectorModel[] = [
                 {
                    id: 'connector0',  sourceID: 'node1', targetID: 'node2',
               
                },
                {
                    id: 'connector1', sourceID: 'node2', targetID: 'node3',
                   
                },
                {
                    id: 'connector2',  sourceID: 'node3', targetID: 'node4',
                  
                },
                {
                    id: 'connector3', sourceID: 'node4', targetID: 'node44',
                },
             ];
            diagram.addElements(nodes);
            diagram.addElements(connectors);
        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });
        it('Pass a node or connector collection as a parameter in the method and verify nodes are added properly in the diagram',(done:Function)=>{
            expect(diagram.nodes.length).toBe(5);
            expect(diagram.connectors.length).toBe(4);
            done();
        });
        
    });
    describe('Basic Shapes Without Size', () => {
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
            let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle', cornerRadius: 10 };
            let node1: NodeModel = { id: 'node', offsetX: 100, offsetY: 100, width: 50, height: 50, shape: shape };
            let shape2: BasicShapeModel = { type: 'Basic', shape: 'Ellipse' };
            let node2: NodeModel = { id: 'node2', offsetX: 300, offsetY: 100, shape: shape2 };
            let shape3: BasicShapeModel = { type: 'Basic', shape: 'Hexagon' };
            let node3: NodeModel = { id: 'node3', offsetX: 600, offsetY: 100, shape: shape3 };
            let shape4: BasicShapeModel = { type: 'Basic', shape: 'Parallelogram' };
            let node4: NodeModel = { id: 'node4', offsetX: 900, offsetY: 100, shape: shape4 };
            let shape5: BasicShapeModel = { type: 'Basic', shape: 'Triangle' };
            let node5: NodeModel = { id: 'node5', offsetX: 1200, offsetY: 100, shape: shape5 };
            let shape6: BasicShapeModel = { type: 'Basic', shape: 'Plus' };
            let node6: NodeModel = { id: 'node6', offsetX: 100, offsetY: 300, shape: shape6 };
            let shape7: BasicShapeModel = { type: 'Basic', shape: 'Star' };
            let node7: NodeModel = { id: 'node7', offsetX: 300, offsetY: 300, shape: shape7 };
            let shape8: BasicShapeModel = { type: 'Basic', shape: 'Pentagon' };
            let node8: NodeModel = { id: 'node8', offsetX: 600, offsetY: 300, shape: shape8 };
            let shape9: BasicShapeModel = { type: 'Basic', shape: 'Heptagon' };
            let node9: NodeModel = { id: 'node9', offsetX: 900, offsetY: 300, shape: shape9 };
            let shape10: BasicShapeModel = { type: 'Basic', shape: 'Octagon' };
            let node10: NodeModel = { id: 'node10', offsetX: 1200, offsetY: 300, shape: shape10 };
            let shape11: BasicShapeModel = { type: 'Basic', shape: 'Trapezoid' };
            let node11: NodeModel = { id: 'node11', offsetX: 100, offsetY: 600, shape: shape11 };
            let shape12: BasicShapeModel = { type: 'Basic', shape: 'Decagon' };
            let node12: NodeModel = { id: 'node12', offsetX: 300, offsetY: 600, shape: shape12 };
            let shape13: BasicShapeModel = { type: 'Basic', shape: 'RightTriangle' };
            let node13: NodeModel = { id: 'node13', offsetX: 600, offsetY: 600, shape: shape13 };
            let shape14: BasicShapeModel = { type: 'Basic', shape: 'Cylinder' };
            let node14: NodeModel = { id: 'node14', offsetX: 900, offsetY: 600, shape: shape14 };
            let shape15: BasicShapeModel = { type: 'Basic', shape: 'Diamond' };
            let node15: NodeModel = { id: 'node15', offsetX: 1200, offsetY: 600, shape: shape15 };
            diagram = new Diagram({
                width: 1500, height: 1000, nodes: [node1, node2, node3, node4, node5, node6, node7,
                    node8, node9, node10, node11, node12, node13, node14, node15]
            });
            diagram.appendTo('#diagram');
        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('Checking basic shapes without size', (done: Function) => {
            //workaround
            done();
        });
    });

    describe('Basic Shapes Without Size', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        beforeAll((): void => {
            const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
                return;
            }
            ele = createElement('div', { id: 'diagramroundedrect' });
            document.body.appendChild(ele);
            let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle', cornerRadius: 10 };
            let node1: NodeModel = { id: 'node', offsetX: 100, offsetY: 100, width: 50, height: 50, shape: shape };
            let shape1: BasicShapeModel = {
                type: 'Basic', shape: 'Polygon',
                points: [{ x: 200, y: 100 }, { x: 150, y: 150 }, { x: 50, y: 150 }]
            };
            let node2: NodeModel = { id: 'node1', offsetX: 300, offsetY: 100, shape: shape1 };
            diagram = new Diagram({
                width: '1500px', height: '1000px', nodes: [node1, node2],
            });
            diagram.appendTo('#diagramroundedrect');

        });
        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });
        it('Checking rectangle corner radius', (done: Function) => {
            let element = document.getElementById('node_content');
            expect(element.attributes[7].value === '10' && element.attributes[8].value === '10').toBe(true)
            done();

        });
        it('Checking polygon', (done: Function) => {
            let node: NodeModel = diagram.nodes[1];
            let element: DiagramElement = node.wrapper.children[0];
            expect((element as PathModel).data == 'M200 100L150 150L50 150Z').toBe(true);
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