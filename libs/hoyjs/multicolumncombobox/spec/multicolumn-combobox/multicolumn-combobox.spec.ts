import { createElement, remove, isNullOrUndefined, EventHandler } from '@hoyui/base';
import { FilteringEventArgs, MultiColumnComboBox, PopupEventArgs, SortOrder, SortType } from '../../src/multicolumn-combobox/multi-column-combo-box';
import { DataManager, Query, ODataAdaptor, ODataV4Adaptor } from '@hoyui/data';
import { getMemoryProfile, inMB, profile } from './common.spec';
import { downArrow, enter } from '@hoyui/grids';

let languageData: { [key: string]: Object }[] = [
    { subject: 'cse', id: 'id2', text: 'PHP' }, { subject: 'eee', id: 'id1', text: 'HTML' }, { subject: 'ece', id: 'id3', text: 'PERL' },
    { subject: 'cse', id: 'list1', text: 'JAVA' }, { subject: 'eee', id: 'list2', text: 'PYTHON' }, { subject: 'ece', id: 'list5', text: 'HTMLCSS' },
    { subject: 'cse', id: 'list6', text: 'JAVASCRIPT' }, { subject: 'eee', id: 'list7', text: 'SQL' }, { subject: 'ece', id: 'list8', text: 'C#' }
];

let filterData: { [key: string]: Object }[] = [
    { subject: 'cse', id: 'id2', text: 'PHP' }, { subject: 'cse', id: 'list1', text: 'JAVA' }, { subject: 'cse', id: 'list6', text: 'JAVASCRIPT' }
];

describe('MultiColumnComboBox control', () => {
    beforeAll(() => {
        const isDef: any = (o: any) => o !== undefined && o !== null;
        if (!isDef(window.performance)) {
            console.log('Unsupported environment, window.performance.memory is unavailable');
            pending(); // skips test (in Chai)
            return;
        }
    });
    describe('Basic rendering', () => {
        let multiColObj: MultiColumnComboBox;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input');
            document.body.appendChild(element);
        });
        afterEach((): void => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it('check root component root class, Element Structure and get module name', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(document.getElementById('e-multicolumncombobox_0').classList.contains('e-control')).toEqual(true);
                expect(document.getElementById('e-multicolumncombobox_0').classList.contains('e-multicolumncombobox')).toEqual(true);
                expect(multiColObj.element.id).toBe('e-multicolumncombobox_0');
                expect(multiColObj.element.classList.contains('e-control')).toEqual(true);
                expect(multiColObj.element.classList.contains('e-multicolumncombobox')).toEqual(true);
                expect(multiColObj.element.parentElement.classList.contains('e-control-wrapper')).toEqual(true);
                expect(multiColObj.element.parentElement.classList.contains('e-multicolumn-list')).toEqual(true);
                expect(multiColObj.element.parentElement.lastElementChild.classList.contains('e-multicolumn-list-icon')).toEqual(true);
                expect(multiColObj.getModuleName()).toBe('multicolumncombobox');
                done();
            }, 1200);
        });
        it('Generic nav Element ID generation', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            const multiColEle: HTMLInputElement = <HTMLInputElement>createElement('input', { });
            document.body.appendChild(multiColEle);
            multiColObj.appendTo(multiColEle);
            expect(multiColEle.getAttribute('id') != element.getAttribute('id')).toEqual(true);
            expect(isNullOrUndefined(multiColEle.id)).toBe(false);
            multiColObj.destroy();
            multiColObj = undefined;
            remove(multiColEle);
        });
        it('Placeholder property with dynamic value', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                placeholder: 'Select a language'
            });
            const multiColEle: HTMLInputElement = <HTMLInputElement>createElement('input', {id: 'multicolumn-combobox'});
            document.body.appendChild(multiColEle);
            multiColObj.appendTo(multiColEle);
            expect(multiColEle.getAttribute('placeholder')).toEqual('Select a language');
            multiColObj.placeholder = 'new placeholder';
            multiColObj.dataBind();
            expect(multiColEle.getAttribute('placeholder')).toEqual('new placeholder');
        });
        it('HtmlAttributes property with dynamic value', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                htmlAttributes: { name: 'name-test', class: 'e-attribute-test', style: 'color:red' }
            });
            const multiColEle: HTMLInputElement = <HTMLInputElement>createElement('input', {id: 'multicolumn-combobox'});
            document.body.appendChild(multiColEle);
            multiColObj.appendTo(multiColEle);
            expect(multiColEle.getAttribute('name')).toEqual('name-test');
            expect((multiColObj as any).inputWrapper.classList.contains('e-attribute-test')).toEqual(true);
            expect((multiColObj as any).inputWrapper.getAttribute('style')).toEqual('color:red');
            multiColObj.htmlAttributes = { placeholder: 'attributes', title: 'html-attributes' };
            multiColObj.dataBind();
            expect(multiColEle.getAttribute('placeholder')).toEqual('attributes');
            expect(multiColEle.getAttribute('title')).toEqual('html-attributes');
            multiColObj.disabled = true;
            multiColObj.dataBind();
            expect(multiColEle.getAttribute('disabled')).toEqual('');
            multiColObj.htmlAttributes = { disabled: 'disabled', readonly: 'readonly' };
            multiColObj.dataBind();
            expect(multiColEle.getAttribute('aria-disabled')).toEqual('true');
        });
        it(' Created event testing ', () => {
            let created: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                created: (): void => {
                    created = true;
                }
            });
            const multiColEle: HTMLInputElement = <HTMLInputElement>createElement('input', {id: 'multicolumn-combobox'});
            document.body.appendChild(multiColEle);
            multiColObj.appendTo(multiColEle);
            expect(created).toBe(true);
        });
        it(' popup open and close testing on mouse click ', (done) => {
            let isPopupOpen: boolean = false;
            let isPopupClose: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                open: (): void => {
                    isPopupOpen = true;
                },
                close: (): void => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(isPopupOpen).toBe(false);
            multiColObj.focusIn();
            expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            expect(isPopupOpen).toBe(true);
            expect(isPopupClose).toBe(false);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            setTimeout(() => {
                expect(isPopupClose).toBe(true);
                done();
            }, 500);
        });
        it(' popup open and close on content select ', (done) => {
            let isPopupOpen: boolean = false;
            let isPopupClose: boolean = false;
            let multiColObj: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                open: (): void => {
                    isPopupOpen = true;
                },
                close: (): void => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            let keyEventArgs: any = {
                preventDefault: (): void => { /** NO Code */ },
                action: null,
                key: null,
                target: null,
                currentTarget: null,
                stopImmediatePropagation: (): void => { /** NO Code */ }
            };
            multiColObj.appendTo(element);
            expect(isPopupOpen).toBe(false);
            multiColObj.focusIn();
            setTimeout(() => {
                keyEventArgs.action = 'altDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(isPopupClose).toBe(false);
                keyEventArgs.action = 'end';
                multiColObj.keyActionHandler(keyEventArgs);
                keyEventArgs.action = 'enter';
                multiColObj.keyActionHandler(keyEventArgs);
                //expect(multiColObj.value).toBe('list8');
                //expect(multiColObj.text).toBe('C#');
                expect(isPopupClose).toBe(true);
                done();
            }, 1200);
        });
    });

    describe('Basic div rendering', () => {
        let multiColObj: MultiColumnComboBox;
        let element: HTMLInputElement;
        let ngElement: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('div');
            document.body.appendChild(element);
            ngElement = <HTMLInputElement>createElement('EJS-MULTICOLUMNCOMBOBOX');
            document.body.appendChild(ngElement);
        });
        afterEach((): void => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
            remove(ngElement);
        });
        it('check ng tag and div is created', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.element.tagName).toBe('DIV');
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(ngElement);
            expect(multiColObj.element.tagName).toBe('EJS-MULTICOLUMNCOMBOBOX');
            done();
        });
    });

    describe('Basic rendering', () => {
        let multiColObj: MultiColumnComboBox;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input');
            document.body.appendChild(element);
        });
        afterEach((): void => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it('- Attributes', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.element.getAttribute("role")).toEqual("combobox");
            expect(multiColObj.element.getAttribute("type")).toEqual("text");
            expect(multiColObj.element.getAttribute("aria-expanded")).toEqual("false");
            expect(multiColObj.element.getAttribute("tabindex")).toEqual("0");
            expect(multiColObj.element.parentElement.getAttribute("spellcheck")).toBe("false");
            expect(multiColObj.element.getAttribute("autocomplete")).toEqual("off");
            expect(multiColObj.element.getAttribute("autocapitalize")).toEqual("off");
            expect(multiColObj.element.getAttribute("aria-owns")).toEqual(null);
            expect(multiColObj.element.getAttribute("aria-controls")).toEqual(null);
            expect(multiColObj.element.getAttribute("aria-activedescendant")).toEqual(null);
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            setTimeout(() => {
                expect(multiColObj.element.getAttribute("aria-owns")).toEqual("e-multicolumncombobox_15_popup");
                expect(multiColObj.element.getAttribute("aria-controls")).toEqual("e-multicolumncombobox_15");
                (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
                setTimeout(() => {
                    expect(multiColObj.element.getAttribute("aria-owns")).toEqual(null);
                    expect(multiColObj.element.getAttribute("aria-activedescendant")).toEqual(null);
                    done();
                }, 500);
            }, 1200);
        });
    });

    // Component Focus
    describe('Component Focus ', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        let element2: HTMLInputElement;
        let keyEventArgs: any = {
            preventDefault: (): void => { /** NO Code */ },
            action: null,
            key: null,
            target: null,
            currentTarget: null,
            stopImmediatePropagation: (): void => { /** NO Code */ }
        };
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
            element2 = <HTMLInputElement>createElement('div', { id: 'domElement' });
            document.body.appendChild(element2);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
            remove(element2);
        });
        it('focus when click on input', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            multiColObj.inputEle.focus();
            multiColObj.focusIn();
            expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
            expect(document.activeElement === multiColObj.inputEle).toBe(true);
        });
        it('Focus when dropdown click', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            setTimeout(() => {
                expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
                done();
            }, 500);
        });
        // it('Focus when document click', (done) => {
        //     multiColObj = new MultiColumnComboBox({
        //         dataSource: languageData,
        //         fields: { text: 'text', value: 'id' },
        //         columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
        //     });
        //     multiColObj.appendTo(element);
        //     let clickEvent: MouseEvent = document.createEvent('MouseEvents');
        //     clickEvent.initEvent('mousedown', true, true);
        //     (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
        //     expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
        //     document.querySelector('#domElement').dispatchEvent(clickEvent);
        //     done();
        // });
        it('Focus when keyboard interaction', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            multiColObj.inputEle.focus();
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
                expect(document.activeElement === multiColObj.inputEle).toBe(true);
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                keyEventArgs.key = 'Enter';
                multiColObj.gridObj.keyPressed(keyEventArgs);
                expect(document.activeElement === multiColObj.inputEle).toBe(true);
                expect(multiColObj.inputEle.value).toBe('PHP');
                const rowCell: HTMLElement = multiColObj.gridEle.querySelector('.e-rowcell')
                keyEventArgs.target = rowCell;
                keyEventArgs.key = '';
                multiColObj.onMouseClick(keyEventArgs);
                expect(multiColObj.inputEle.value).toBe('PHP');
                setTimeout(() => {
                    keyEventArgs.action = 'tab';
                    multiColObj.keyActionHandler(keyEventArgs);
                    expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(false);
                    done();
                }, 1200);
            }, 1300);
        });
    });

    describe('Custom value with initial rendering and dynamic change', () => {
        let multiColObj1: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj1) {
                multiColObj1.destroy();
                multiColObj1 = undefined;
            }
            remove(element);
        });
        it(' value property - custom value - not exist value  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                value: 'abc',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.inputEle.value).toBe('');
            expect(multiColObj1.value).toBe('abc');
            expect(multiColObj1.text).toBe(null);
            expect(multiColObj1.index).toBe(null);
        });
        it(' value property - custom value - exist value  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                value: 'list1',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
        });
        it(' text property - custom value - not exist text  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                text: 'abc',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.text).toBe('abc');
            expect(multiColObj1.value).toBe(null);
            expect(multiColObj1.index).toBe(null);
        });
        it(' text property - custom value - exist text  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                text: 'JAVA',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
        });
        it(' value property - onPropertyChange - custom value - not exist value  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
            });
            multiColObj1.appendTo(element);
            multiColObj1.value = 'abc';
            multiColObj1.dataBind();
            expect(multiColObj1.text).toBe(null);
            expect(multiColObj1.value).toBe('abc');
            expect(multiColObj1.index).toBe(null);
        });
        it(' value property - onPropertyChange - custom value - exist value  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
            });
            multiColObj1.appendTo(element);
            multiColObj1.value = 'list1';
            multiColObj1.dataBind();
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
        });
        it(' text property - onPropertyChange custom value - not exist text  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
            });
            multiColObj1.appendTo(element);
            multiColObj1.text = 'abc';
            multiColObj1.dataBind();
            expect(multiColObj1.text).toBe('abc');
            expect(multiColObj1.value).toBe(null);
            expect(multiColObj1.index).toBe(null);
        });
        it(' text property - onPropertyChange custom value - exist text  ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
            });
            multiColObj1.appendTo(element);
            multiColObj1.text = 'JAVA';
            multiColObj1.dataBind();
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
        });
        it(' value - text - index - property priority check ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                value: 'id1',
                text: 'JAVA',
                index: 3,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.inputEle.value).toBe('HTML');
            expect(multiColObj1.text).toBe('HTML');
            expect(multiColObj1.value).toBe('id1');
            expect(multiColObj1.index).toBe(1);
        });
        it(' text - index - property priority check ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                text: 'JAVA',
                index: 0,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
        });
        it( 'index - property check ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                index: 3,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
        });
        it(' value - text - index - popup open ', () => {
            multiColObj1 = new MultiColumnComboBox({
                dataSource: languageData,
                value: 'list1',
                text: 'JAVA',
                index: 3,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj1.appendTo(element);
            multiColObj1.showPopup();
            expect(multiColObj1.inputEle.value).toBe('JAVA');
            expect(multiColObj1.text).toBe('JAVA');
            expect(multiColObj1.value).toBe('list1');
            expect(multiColObj1.index).toBe(3);
            window.dispatchEvent(new Event('resize'));
        });
    });

    describe('Custom value with initial rendering and dynamic change', () => {
        let multiColObj1: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj1) {
                multiColObj1.destroy();
                multiColObj1 = undefined;
            }
            remove(element);
        });
        it('value property in remote data', (done) => {
            let data: DataManager = new DataManager({
                url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            });
            multiColObj1 = new MultiColumnComboBox({
                dataSource: data,
                fields: { text: 'ContactName', value: 'CustomerID' },
                columns: [{ field: 'ContactName', header: 'ContactName', width: 120 },
                          { field: 'CustomerID', width: 140, header: 'Customer ID' }],
                value: 'EASTC'
            });
            multiColObj1.appendTo(element);
            setTimeout(() => {
                expect(multiColObj1.inputEle.value).toBe('Ann Devon');
                expect(multiColObj1.text).toBe('Ann Devon');
                expect(multiColObj1.value).toBe('EASTC');
                expect(multiColObj1.index).toBe(18);
                done();
            }, 2000);
        });
    });

    describe('Custom value with initial rendering and dynamic change', () => {
        let multiColObj1: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj1) {
                multiColObj1.destroy();
                multiColObj1 = undefined;
            }
            remove(element);
        });
        it('text property in remote data', (done) => {
            let data: DataManager = new DataManager({
                url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            });
            let query: Query = new Query().select(['ContactName', 'CustomerID']).take(10);
            multiColObj1 = new MultiColumnComboBox({
                dataSource: data,
                query: query,
                fields: { text: 'ContactName', value: 'CustomerID' },
                columns: [{ field: 'ContactName', header: 'ContactName', width: 120 },
                          { field: 'CustomerID', width: 140, header: 'Customer ID' }],
                text: 'Ana Trujillo'
            });
            multiColObj1.appendTo(element);
            setTimeout(() => {
                expect(multiColObj1.inputEle.value).toBe('Ana Trujillo');
                expect(multiColObj1.text).toBe('Ana Trujillo');
                expect(multiColObj1.value).toBe('ANATR');
                expect(multiColObj1.index).toBe(1);
                done();
            }, 1200);
        });
    });

    describe('Custom value with initial rendering and dynamic change', () => {
        let multiColObj1: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj1) {
                multiColObj1.destroy();
                multiColObj1 = undefined;
            }
            remove(element);
        });
        it('index property in remote data', (done) => {
            let data: DataManager = new DataManager({
                url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            });
            multiColObj1 = new MultiColumnComboBox({
                dataSource: data,
                fields: { text: 'ContactName', value: 'CustomerID' },
                columns: [{ field: 'ContactName', header: 'ContactName', width: 120 },
                          { field: 'CustomerID', width: 140, header: 'Customer ID' }],
                index: 2
            });
            multiColObj1.appendTo(element);
            setTimeout(() => {
                expect(multiColObj1.inputEle.value).toBe('Antonio Moreno');
                expect(multiColObj1.text).toBe('Antonio Moreno');
                expect(multiColObj1.value).toBe('ANTON');
                expect(multiColObj1.index).toBe(2);
                done();
            }, 1200);
        });
    });

    describe('Properties with initial rendering and dynamic change', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it(' Readonly property ', () => {
            let isPopupOpen: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                readonly: true,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                open: (): void => {
                    isPopupOpen = true;
                },
                close: (): void => {
                    isPopupOpen = false;
                }
            });
            multiColObj.appendTo(element);
            expect(multiColObj.inputEle.readOnly).toBe(true);
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            expect(isPopupOpen).toBe(false)
            multiColObj.readonly = false;
            multiColObj.dataBind();
            expect(multiColObj.inputEle.readOnly).toBe(false);
            multiColObj.focusIn();
            expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            expect(isPopupOpen).toBe(true)
        });
        it(' Disabled property ', () => {
            let isPopupOpen: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                disabled: true,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                open: (): void => {
                    isPopupOpen = true;
                },
                close: (): void => {
                    isPopupOpen = false;
                }
            });
            multiColObj.appendTo(element);
            expect(multiColObj.inputEle.disabled).toBe(true);
            expect(multiColObj.element.getAttribute('aria-disabled')).toBe('true');
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            expect(isPopupOpen).toBe(false)
            multiColObj.disabled = false;
            multiColObj.dataBind();
            expect(multiColObj.inputEle.disabled).toBe(false);
            expect(multiColObj.element.getAttribute('aria-disabled')).toBe('false');
            multiColObj.focusIn();
            expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            expect(isPopupOpen).toBe(true);
            multiColObj.disabled = true;
            multiColObj.dataBind();
            expect(multiColObj.inputEle.disabled).toBe(true);
        });
        it(' CssClass property ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                cssClass: 'e-custom-class',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.inputWrapper.classList.contains('e-custom-class')).toBe(true);
            multiColObj.cssClass = 'e-new-class';
            multiColObj.dataBind();
            expect(multiColObj.inputWrapper.classList.contains('e-custom-class')).toBe(false);
            expect(multiColObj.inputWrapper.classList.contains('e-new-class')).toBe(true);
        });
        it(' Rtl property  ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                enableRtl: true,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.inputWrapper.classList.contains('e-rtl')).toBe(true);
            multiColObj.enableRtl = false;
            multiColObj.dataBind();
            expect(multiColObj.inputWrapper.classList.contains('e-rtl')).toBe(false);
        });
        it(' Persistence property  ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                enablePersistence: true,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.element.id).toBe('multicolumn-combobox_wrapper');
        });
        it(' ShowClearButton property  ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                showClearButton: true,
                value: 'PHP',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.value).toBe('PHP');
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.clearButton.dispatchEvent(clickEvent);
            expect(multiColObj.value).toBe(null);
            multiColObj.showClearButton = false;
            multiColObj.value = 'PHP';
            multiColObj.dataBind();
            expect(multiColObj.inputObj.clearButton).toBe(null);
            multiColObj.showClearButton = true;
            multiColObj.dataBind();
        });
        it(' No Record property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: [],
                noRecordsTemplate: 'Not found anything',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(document.querySelector('.e-no-records').innerHTML).toBe('Not found anything');
                multiColObj.noRecordsTemplate = 'Found Nothing',
                multiColObj.dataBind();
                setTimeout(() => {
                    expect(document.querySelector('.e-no-records').innerHTML).toBe('Found Nothing');
                    done();
                }, 1200);
            }, 1200);
        });
    });

    describe('Additional Properties with initial rendering and dynamic change', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });

        it(' width property  ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                enablePersistence: true,
                fields: { text: 'text', value: 'id' },
                width: 500,
                popupHeight: 400,
                popupWidth: 600,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.element.parentElement.style.width).toBe('500px');
            expect(multiColObj.popupEle.style.width).toBe('600px');
            expect(multiColObj.popupEle.style.maxHeight).toBe('400px');
            multiColObj.width = '600px';
            multiColObj.popupWidth = '500px';
            multiColObj.popupHeight = '500px';
            multiColObj.dataBind();
            expect(multiColObj.element.parentElement.style.width).toBe('600px');
            expect(multiColObj.popupEle.style.width).toBe('500px');
            expect(multiColObj.popupEle.style.maxHeight).toBe('500px');
        });
        it(' Index property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                index: 1,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.text).toBe('HTML');
            setTimeout(() => {
                multiColObj.index = 5;
                multiColObj.dataBind();
                expect(multiColObj.text).toBe('HTMLCSS');
                done();
            }, 1200);
        });
        it(' Float Label property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                floatLabelType: 'Always',
                placeholder: 'Always Float Label',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(document.querySelector('.e-float-text').innerHTML).toBe('Always Float Label');
            multiColObj.floatLabelType = 'Never';
            multiColObj.placeholder = 'Updated placeholder value';
            multiColObj.dataBind();
            setTimeout(() => {
                expect(document.querySelector('.e-float-text')).toBe(null);
                multiColObj.floatLabelType = 'Always';
                multiColObj.showClearButton = true;
                multiColObj.dataBind();
                multiColObj.focusIn();
                multiColObj.disabled = true;
                multiColObj.readOnly = true;
                multiColObj.dataBind();
                multiColObj.focusOut();
                multiColObj.disabled = false;
                multiColObj.readOnly = false;
                multiColObj.dataBind();
                multiColObj.focusOut();
                done();
            }, 1200);
        });
        it(' Fields property  ', function (done) {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                index: 4,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.value).toBe('list2');
            multiColObj.fields = { text: 'id', value: 'text' };
            multiColObj.dataBind();
            setTimeout(function () {
                expect(multiColObj.text).toBe('PYTHON');
                done();
            }, 1200);
        });
        it(' Columns property  ', function (done) {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                index: 4,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            setTimeout(function () {
                expect(multiColObj.columns[0].field).toBe('text');
                multiColObj.columns = [{ field: 'id', header: 'ID' }, { field: 'text', header: 'Language' }];
                multiColObj.dataBind();
                setTimeout(function () {
                    expect(multiColObj.columns[0].field).toBe('id');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' DataSource property  ', function (done) {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                index: 1,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                groupTemplate: '<div class="e-group-temp">Key is: ${key}, Field is: ${field}, Count is: ${count}</div>'
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.dataSource[1].text).toBe('HTML');
            multiColObj.dataSource = [
                { subject: 'eee', id: 'list2', text: 'PYTHON' }, { subject: 'ece', id: 'list5', text: 'HTMLCSS' },
                { subject: 'cse', id: 'list6', text: 'JAVASCRIPT' }, { subject: 'eee', id: 'list7', text: 'SQL' },
                { subject: 'ece', id: 'list8', text: 'C#' }, { subject: 'cse', id: 'id2', text: 'PHP' },
                { subject: 'eee', id: 'id1', text: 'HTML' }, { subject: 'ece', id: 'id3', text: 'PERL' },
                { subject: 'cse', id: 'list1', text: 'JAVA' }
            ];
            multiColObj.dataBind();
            setTimeout(function () {
                expect(multiColObj.gridObj.dataSource[1].text).toBe('HTMLCSS');
                done();
            }, 1200);
        });
        it(' Query property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                query: new Query().select(['text', 'id']).take(3)
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(multiColObj.gridObj.getRows().length).toBe(3);
                multiColObj.query = new Query().select(['text', 'id']).take(6);
                multiColObj.dataBind();
                setTimeout(() => {
                    expect(multiColObj.gridObj.getRows().length).toBe(6);
                    done();
                }, 1200);
            }, 1200);
        });
        it(' Allow sorting property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                allowSorting: true,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.allowSorting).toBe(true);
            setTimeout(() => {
                multiColObj.allowSorting = false;
                multiColObj.dataBind();
                expect(multiColObj.gridObj.allowSorting).toBe(false);
                done();
            }, 1200);
        });
        it(' Sort Type property on property change ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                sortType: SortType.OneColumn,
                fields: { text: 'text', value: 'id' },
                allowSorting: true,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.allowMultiSorting).toBe(false);
            multiColObj.sortType = SortType.MultipleColumns;
            multiColObj.dataBind();
            setTimeout(() => {
                expect(multiColObj.gridObj.allowMultiSorting).toBe(true);
                done();
            }, 1200);
        });
        it(' Sort Type property ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                sortType: SortType.MultipleColumns,
                fields: { text: 'text', value: 'id' },
                allowSorting: true,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.allowMultiSorting).toBe(true);
        });
        it(' Sort Order property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                sortOrder: SortOrder.Ascending,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.sortSettings.columns[0].direction).toBe(SortOrder.Ascending);
            multiColObj.sortOrder = SortOrder.Descending;
            multiColObj.dataBind();
            setTimeout(() => {
                expect(multiColObj.gridObj.sortSettings.columns[0].direction).toBe(SortOrder.Descending);
                done();
            }, 1200);
        });
        it(' Sort Order property Alternate', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                sortOrder: SortOrder.Descending,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.sortSettings.columns[0].direction).toBe(SortOrder.Descending);
            multiColObj.sortOrder = SortOrder.Ascending;
            multiColObj.dataBind();
            setTimeout(() => {
                expect(multiColObj.gridObj.sortSettings.columns[0].direction).toBe(SortOrder.Ascending);
                done();
            }, 1200);
        });
    });

    describe('Additional Properties with initial rendering and dynamic change for enableVirtualization', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it(' Enable Virtualization property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                enableVirtualization: true,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect(multiColObj.gridObj.enableVirtualization).toBe(true);
            multiColObj.enableVirtualization = false;
            multiColObj.dataBind();
            setTimeout(() => {
                expect(multiColObj.gridObj.enableVirtualization).toBe(false);
                done();
            }, 1200);
        });
    });

    describe('Grid properties with initial rendering and dynamic change', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it(' Width and textalign property ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language', width: 120, textAlign: 'Right' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect((multiColObj as any).gridObj.columns[0].width).toBe(120);
            expect((multiColObj as any).gridObj.columns[0].textAlign).toBe('Right');
        });
        it(' format property ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language', format: 'C2' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect((multiColObj as any).gridObj.columns[0].format).toBe('C2');
        });
        it(' displayAsCheckBox property ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: [
                    { id: 101, text: 'PHP' }, { id: 102, text: 'HTML' }, { id: 103, text: 'PERL' },
                    { id: 104, text: 'JAVA' }, { id: 105, text: 'PYTHON' }, { id: 106, text: 'HTMLCSS' }
                ],
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID', displayAsCheckBox: true }],
            });
            multiColObj.appendTo(element);
            expect((multiColObj as any).gridObj.columns[1].displayAsCheckBox).toBe(true);
        });
        it(' allowTextWrap and textWrapMode property', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: [
                    { id: 101, text: 'PHP' }, { id: 102, text: 'HTML' }, { id: 103, text: 'PERL' },
                    { id: 104, text: 'JAVA' }, { id: 105, text: 'PYTHON' }, { id: 106, text: 'HTMLCSS' }
                ],
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Languages known' }, { field: 'id', header: 'ID' }],
                gridSettings: { allowTextWrap: true, textWrapMode: 'Both' }
            });
            multiColObj.appendTo(element);
            expect((multiColObj as any).gridObj.allowTextWrap).toBe(true);
            expect((multiColObj as any).gridObj.textWrapSettings.wrapMode).toBe('Both');
            (multiColObj as any).gridSettings.textWrapMode = 'Content';
            multiColObj.dataBind();
            expect((multiColObj as any).gridObj.textWrapSettings.wrapMode).toBe('Content');
            (multiColObj as any).gridSettings.allowTextWrap = false;
            multiColObj.dataBind();
            expect((multiColObj as any).gridObj.allowTextWrap).toBe(false);
        });
        it(' groupBy property ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            expect((multiColObj as any).gridObj.groupSettings.columns.length).toBe(1);
            expect((multiColObj as any).gridObj.groupSettings.columns[0]).toBe('text');
        });
        it(' Actionbegin event testing ', () => {
            let actionBegin: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                actionBegin: (): void => {
                    actionBegin = true;
                }
            });
            multiColObj.appendTo(element);
            (multiColObj as any).gridObj.trigger('actionBegin', { requestType: 'filtering' });
            expect(actionBegin).toBe(true);
        });
        it(' Actionfailure event testing ', () => {
            let actionFailure: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: [],
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                actionFailure: (): void => {
                    actionFailure = true;
                }
            });
            multiColObj.appendTo(element);
            (multiColObj as any).gridObj.trigger('actionFailure', { requestType: 'filtering' });
            expect(actionFailure).toBe(true);
        });
        it(' ActionComplete event testing ', (done) => {
            let actionComplete: boolean = false;
            let actionCompleteSort: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                actionComplete: (args): void => {
                    actionComplete = true;
                    if (args.requestType === 'sorting') { actionCompleteSort = true; }
                }
            });
            multiColObj.appendTo(element);
            (multiColObj as any).gridObj.trigger('actionComplete', { requestType: 'filtering' });
            expect(actionComplete).toBe(true);
            done();
        });
        it(' Filtering event testing ', () => {
            let filtering: boolean = false;
            let text: string = '';
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs): void => {
                    text = args.text;
                    filtering = true;
                }
            });
            multiColObj.appendTo(element);
            multiColObj.trigger('filtering', { text: 'JAVA' });
            expect(filtering).toBe(true);
            expect(text).toBe('JAVA');
        });
        it(' no Records testing', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: [],
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            expect((multiColObj as any).inputWrapper.classList.contains('e-input-focus')).toBe(true);
            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            (multiColObj as any).inputObj.buttons[0].dispatchEvent(clickEvent);
            multiColObj.gridObj.selectedRowIndex = 0;
            setTimeout(function () {
                let noRecordEle: HTMLElement = multiColObj.popupEle.querySelector('.e-nodata');
                expect(noRecordEle.innerText).toBe('No records found');
                done();
            }, 1200);
        });
        it('format & displayAsCheckBox - property priority check', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: [
                    { OrderID: 101, Freight: 32.38, OrderDate: new Date(8364186e5) }, { OrderID: 102, Freight: 11.61, OrderDate: new Date(836505e6) },
                    { OrderID: 103, Freight: 65.83, OrderDate: new Date(8367642e5) }, { OrderID: 104, Freight: 41.34, OrderDate: new Date(8367642e5) }
                ],
                fields: { text: 'OrderID', value: 'Freight' },
                columns: [
                    { field: 'OrderID', header: 'Order ID' },
                    { field: 'Freight', header: 'Freight', displayAsCheckBox: true },
                    { field: 'OrderDate', header: 'Order Date', format: 'yMd', displayAsCheckBox: true }
                ]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(multiColObj.gridObj.getContent().querySelectorAll('.e-rowcell')[1].classList.contains('e-gridchkbox-cell')).toBe(true);
                expect(multiColObj.gridObj.columns[2].format).toBe('yMd');
                expect(multiColObj.gridObj.getContent().querySelectorAll('.e-rowcell')[2].classList.contains('e-gridchkbox-cell')).toBe(false);
                done();
            }, 1200);
        });
    });

    describe('Grid properties with initial rendering and dynamic change', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it(' ActionComplete event testing ', (done) => {
            let actionComplete: boolean = false;
            let actionCompleteSort: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                actionComplete: (args): void => {
                    actionComplete = true;
                    if (args.requestType === 'sorting') { actionCompleteSort = true; }
                }
            });
            multiColObj.appendTo(element);
            (multiColObj as any).gridObj.trigger('actionComplete', { requestType: 'filtering' });
            expect(actionComplete).toBe(true);
            done();
        });
    });

    describe(' Keyboard interaction ', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        let keyEventArgs: any = {
            preventDefault: (): void => { /** NO Code */ },
            shiftKey: false,
            action: null,
            key: null,
            target: null,
            currentTarget: null,
            altKey: null,
            stopImmediatePropagation: (): void => { /** NO Code */ }
        };
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach((): void => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it(' focus the component ', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            expect(multiColObj.inputWrapper.classList.contains('e-input-focus')).toBe(true);
        });
        it(' key press - alt + down arrow ', (done) => {
            let eventDetails: any;
            let isPopupOpen: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }],
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                }
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(eventDetails.action).toBe('altDown');
                done();
            }, 1200);
        });
        it(' key press - alt + up arrow - without open popup ', () => {
            let isPopupOpen: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }],
                open: () => { isPopupOpen = true; }
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altUp';
            multiColObj.keyActionHandler(keyEventArgs);
            expect(isPopupOpen).toBe(false);
        });
        it(' key press - escape ', (done) => {
            let isPopupClose: boolean = false;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }],
                close: () => {
                    isPopupClose = true;
                }
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupClose).toBe(false);
                keyEventArgs.action = 'escape';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupClose).toBe(true);
                done();
            }, 1200);
        });
        it(' key press - mouse down and mouse up ', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(eventDetails.action).toBe('altDown');
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                multiColObj.gridObj.selectedRowIndex = 1;
                keyEventArgs.action = 'moveUp';
                multiColObj.gridKeyActionHandler(keyEventArgs, true);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                multiColObj.gridObj.selectedRowIndex = 0;
                expect(isPopupClose).toBe(false);
                keyEventArgs.action = 'moveDown';
                multiColObj.gridKeyActionHandler(keyEventArgs, true);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(1);
                expect(isPopupClose).toBe(false);
                keyEventArgs.action = 'escape';
                multiColObj.gridKeyActionHandler(keyEventArgs, true);
                expect(isPopupClose).toBe(true);
                done();
            }, 1200);
        });
        it(' key press - mouse down and enter key ', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(eventDetails.action).toBe('altDown');
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                keyEventArgs.key = 'Enter';
                multiColObj.gridObj.keyPressed(keyEventArgs);
                expect(isPopupClose).toBe(true);
                setTimeout(() => {
                    expect(multiColObj.inputEle.value).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - move down and tab key', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(eventDetails.action).toBe('altDown');
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                keyEventArgs.action = 'tab';
                multiColObj.gridObj.keyPressed(keyEventArgs);
                expect(isPopupClose).toBe(true);
                setTimeout(() => {
                    expect(multiColObj.inputEle.value).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - move down and shiftTab key', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(eventDetails.action).toBe('altDown');
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                keyEventArgs.action = 'shiftTab';
                multiColObj.gridObj.keyPressed(keyEventArgs);
                expect(isPopupClose).toBe(true);
                setTimeout(() => {
                    expect(multiColObj.inputEle.value).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - move down and altUp key', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                expect(eventDetails.action).toBe('altDown');
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                expect(multiColObj.gridObj.selectedRowIndex).toBe(0);
                keyEventArgs.action = 'altUp';
                multiColObj.gridObj.keyPressed(keyEventArgs);
                expect(isPopupClose).toBe(true);
                setTimeout(() => {
                    expect(multiColObj.inputEle.value).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - enter key ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.showPopup();
            setTimeout(() => {
                keyEventArgs.action = 'end';
                multiColObj.keyActionHandler(keyEventArgs);
                keyEventArgs.action = 'enter';
                multiColObj.keyActionHandler(keyEventArgs);
                setTimeout(() => {
                    expect(multiColObj.value).toBe('list7');
                    expect(multiColObj.text).toBe('SQL');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - enter key with home key as branch', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.showPopup();
            setTimeout(() => {
                keyEventArgs.action = 'home';
                multiColObj.keyActionHandler(keyEventArgs);
                keyEventArgs.action = 'enter';
                multiColObj.keyActionHandler(keyEventArgs);
                setTimeout(() => {
                    expect(multiColObj.value).toBe('id2');
                    expect(multiColObj.text).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - shift and tab ', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                keyEventArgs.key = 'Tab';
                keyEventArgs.shiftKey = true;
                multiColObj.gridKeyActionHandler(keyEventArgs, true);
                setTimeout(() => {
                    expect(isPopupClose).toBe(true);
                    expect(multiColObj.text).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - alt key and ArrowUp ', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                keyEventArgs.action = 'moveDown';
                multiColObj.keyActionHandler(keyEventArgs);
                keyEventArgs.key = 'ArrowUp';
                keyEventArgs.altKey = true;
                multiColObj.gridKeyActionHandler(keyEventArgs, true);
                setTimeout(() => {
                    expect(isPopupClose).toBe(true);
                    expect(multiColObj.text).toBe('PHP');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' key press - move down at the end ', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                index: 8,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                expect(isPopupOpen).toBe(true);
                keyEventArgs.action = 'moveDown';
                multiColObj.gridKeyActionHandler(keyEventArgs, true);
                expect(isPopupClose).toBe(true);
                expect(multiColObj.index).toBe(8);
                done();
            }, 1200);
        });
    });

    describe(' Keyboard interaction ', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        var element2: HTMLInputElement;
        let keyEventArgs: any = {
            preventDefault: (): void => { /** NO Code */ },
            shiftKey: false,
            action: null,
            key: null,
            target: null,
            currentTarget: null,
            altKey: null,
            stopImmediatePropagation: (): void => { /** NO Code */ }
        };
        let event = new Event('input', {
            bubbles: true,
            cancelable: true
        });
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
            element2 = <HTMLInputElement>createElement('div', { id: 'domElement' });
            document.body.appendChild(element2);
        });
        afterEach((): void => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
            remove(element2);
        });
        it(' key press - alt key and update input ', (done) => {
            let isPopupClose: boolean = false;
            let isPopupOpen: boolean = false;
            let eventDetails: any;
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                open: (args: PopupEventArgs) => {
                    eventDetails = args.event;
                    isPopupOpen = true;
                },
                close: () => {
                    isPopupClose = true;
                },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            multiColObj.focusIn();
            keyEventArgs.action = 'altDown';
            setTimeout(() => {
                multiColObj.keyActionHandler(keyEventArgs);
                element.value = 'P';
                setTimeout(() => {
                    element.dispatchEvent(event);
                    let clickEvent: MouseEvent = document.createEvent('MouseEvents');
                    clickEvent.initEvent('mousedown', true, true);
                    document.querySelector('#domElement').dispatchEvent(clickEvent);
                    setTimeout(() => {
                        expect(multiColObj.text).toBe('PHP');
                        done();
                    }, 1000);
                }, 1300);
            }, 2500);
        });
    });

   describe('Events', () => {
        let multiColObj2: MultiColumnComboBox;
        let element: HTMLInputElement;
        // Manually dispatch the input event
        let event = new Event('input', {
            bubbles: true,
            cancelable: true
        });
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
            element.dispatchEvent(event);
        });
        afterEach((): void => {
            if (multiColObj2) {
                multiColObj2.destroy();
                multiColObj2 = undefined;
            }
            remove(element);
        });
        it('Filtering Event', (done) => {
            let filtering: Boolean = false;
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                allowFiltering: false,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs) => {
                    filtering = true;
                }
            });
            multiColObj2.appendTo(element);
            element.value = 'a';
            element.dispatchEvent(event);
            expect(filtering).toBe(false);
            setTimeout(() => {
                multiColObj2.allowFiltering = true;
                multiColObj2.dataBind();
                element.value = 'b';
                element.dispatchEvent(event);
                expect(filtering).toBe(true);
                done();
            }, 1200);
        });
        it('Filtering Event filterType property startswith checking', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                allowFiltering: true,
                filterType: 'startswith'
            });
            multiColObj2.appendTo(element);
            element.value = 'j';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(2);
                done();
            }, 1200);
        });
        it('Filtering Event filterType property contains checking', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                allowFiltering: true,
                filterType: 'contains'
            });
            multiColObj2.appendTo(element);
            element.value = '#';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(1);
                done();
            }, 1200);
        });
        it('Filtering Event filterType property default checking', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                allowFiltering: true,
                filterType: 'not'
            });
            multiColObj2.appendTo(element);
            element.value = 'j';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(9);
                done();
            }, 1200);
        });
        it('Filtering Event filterType property endswith checking', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                allowFiltering: true,
                filterType: 'endswith'
            });
            multiColObj2.appendTo(element);
            element.value = 'l';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(3);
                multiColObj2.filterType = 'startswith';
                element.value = 'a';
                multiColObj2.dataBind();
                element.dispatchEvent(event);
                setTimeout(() => {
                    //expect((multiColObj2 as any).gridObj.dataSource.length).toBe(1);
                    done();
                }, 1200);
            }, 1200);
        });
        it('Filtering Event with remote data', (done) => {
            let filtering: Boolean = false;
            let dataSource: DataManager = new DataManager({
                url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            });
            multiColObj2 = new MultiColumnComboBox({
                dataSource: dataSource,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs) => {
                    filtering = true;
                }
            });
            multiColObj2.appendTo(element);
            element.value = 'a';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect(filtering).toBe(true);
                done();
            }, 1200);
        });
        it('Filtering Event with starstwith operator and dynamic query update data', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                allowFiltering: true,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs) => {
                    let query = new Query().select(['subject', 'id', 'text']).search(args.text, ['subject', 'id', 'text'], 'startswith', true);
                    args.updateData(languageData, query);
                }
            });
            multiColObj2.appendTo(element);
            element.value = 'c';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(4);
                done();
            }, 1200);
        });
        it('Filtering Event with endswith operator and dynamic query update data', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                allowFiltering: true,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs) => {
                    let query = new Query().select(['subject', 'id', 'text']).search(args.text, ['subject', 'id', 'text'], 'endswith', true);
                    args.updateData(languageData, query);
                }
            });
            multiColObj2.appendTo(element);
            element.value = '1';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(2);
                done();
            }, 1200);
        });
        it('Filtering Event with contains operator and dynamic query update data', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                allowFiltering: true,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs) => {
                    let query = new Query().select(['subject', 'id', 'text']).search(args.text, ['subject', 'id', 'text'], 'contains', true);
                    args.updateData(languageData, query);
                }
            });
            multiColObj2.appendTo(element);
            element.value = 'c';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(6);
                done();
            }, 1200);
        });
        it('Filtering Event with null query update data', (done) => {
            multiColObj2 = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                allowFiltering: true,
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                filtering: (args: FilteringEventArgs) => {
                    args.updateData(filterData, null);
                }
            });
            multiColObj2.appendTo(element);
            expect((multiColObj2 as any).gridObj.dataSource.length).toBe(9);
            element.value = 'c';
            element.dispatchEvent(event);
            setTimeout(() => {
                expect((multiColObj2 as any).gridObj.dataSource.length).toBe(3);
                done();
            }, 1200);
        });
    });

    describe('Templates', () => {
        let multiColObj: any;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach(() => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });

        it(' Group template property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'subject' },
                groupTemplate: '<div class="e-group-temp">Group Template 1</div>',
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }, { field: 'subject', header: 'Subject' }]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(document.querySelector('.e-group-temp').innerHTML).toBe('Group Template 1');
                multiColObj.groupTemplate = '<div class="e-group-temp">Group Template 2</div>';
                multiColObj.dataBind();
                setTimeout(() => {
                    expect(document.querySelector('.e-group-temp').innerHTML).toBe('Group Template 2');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' Item template property  ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                itemTemplate: "<tr id='e-custom-item-template'><td>Text value</td><td>ID value</td><td>Subject</td></tr>",
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(document.querySelectorAll('#e-custom-item-template')[0].innerHTML).toBe('<td>Text value</td><td>ID value</td><td>Subject</td>');
                multiColObj.itemTemplate = "<tr id='e-custom-item-template-2'><td>ID value</td><td>Text value</td><td>Subject</td></tr>";
                multiColObj.dataBind();
                setTimeout(() => {
                    expect(document.querySelectorAll('#e-custom-item-template-2')[0].innerHTML).toBe('<td>ID value</td><td>Text value</td><td>Subject</td>');
                    done();
                }, 1200);
            }, 1200);
        });
        it(' Action Failure Template property  ', (done) => {
            let data: DataManager = new DataManager({
                url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers/asde',
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            });
            multiColObj = new MultiColumnComboBox({
                dataSource: data,
                actionFailureTemplate: 'Action Failed',
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                expect(multiColObj.popupEle.querySelector('.e-no-records').innerHTML).toBe('Action Failed');
                multiColObj.actionFailureTemplate = 'Failed action',
                multiColObj.dataBind();
                setTimeout(() => {
                    expect(multiColObj.popupEle.querySelector('.e-no-records').innerHTML).toBe('Failed action');
                    done();
                }, 1200);
            }, 1200);
        });
        it (' footer template property', () => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id', groupBy: 'text' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }],
                footerTemplate: '<div class="e-footer-temp">Total count is: ${count}</div>'
            });
            multiColObj.appendTo(element);
            multiColObj.isReact = true;
            const footerEle: HTMLElement = (multiColObj as any).popupObj.element.querySelector('.e-popup-footer');
            expect(footerEle.querySelector('.e-footer-temp').innerHTML).toBe('Total count is: 9');
            multiColObj.footerTemplate = '<div class="e-footer-temp">Total update count is: ${count}</div>';
            multiColObj.dataBind();
            expect(footerEle.querySelector('.e-footer-temp').innerHTML).toBe('Total update count is: 9');
        });
    });

    describe('Methods', () => {
        let multiColObj: MultiColumnComboBox;
        let element: HTMLInputElement;
        beforeEach((): void => {
            element = <HTMLInputElement>createElement('input', { id: 'multicolumn-combobox' });
            document.body.appendChild(element);
        });
        afterEach((): void => {
            if (multiColObj) {
                multiColObj.destroy();
                multiColObj = undefined;
            }
            remove(element);
        });
        it(' Get items method ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            setTimeout(() => {
                const values = multiColObj.getItems();
                expect((values[6].firstChild as any).innerHTML).toBe('JAVASCRIPT');
                done();
            }, 1200);
        });
        it(' Add items method ', (done) => {
            multiColObj = new MultiColumnComboBox({
                dataSource: languageData,
                fields: { text: 'text', value: 'id' },
                columns: [{ field: 'text', header: 'Language' }, { field: 'id', header: 'ID' }]
            });
            multiColObj.appendTo(element);
            multiColObj.addItems({subject: 'eee', id: 'list22', text: 'Physics'});
            setTimeout(() => {
                expect((multiColObj as any).dataSource[0].text).toBe('Physics');
                done();
            }, 1200);
        });
    });
});