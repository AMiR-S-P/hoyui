import { createElement, detach } from '@hoyui/base';
import { TableSelection } from '../../../src/editor-manager/plugin/table-selection';

// Test case for the Table cell selection public methods
// 1. getBlockNodes method - return the block nodes collection after the wraping of inline nodes.
// 2. getTextNodes method - return the text nodes collection.

describe('Table Cell Selection ', () => {
  describe('Block nodes collection testing ', () => {
    const editableElement: HTMLElement = createElement('div', {
      id: 'editorRoot',
      className: 'e-richtexteditor',
    });
    beforeEach(() => {
      editableElement.innerHTML = `<table class="e-rte-table" style="width: 100%; min-width: 0px;">
            <tbody>
                <tr>
                    <td style="width: 50%;">Text node</td>
                    <td style="width: 50%;"></td>
                </tr>
                <tr>
                    <td style="width: 50%;"><br></td>
                    <td style="width: 50%;"></td>
                </tr>
                <tr>
                    <td style="width: 50%;">Span&nbsp;<br><strong>Bold </strong><br><em>Italic <br></em></td>
                    <td style="width: 50%;"><p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%;"><br></td>
                    <td style="width: 50%;">
                        <ol>
                            <li>List 1</li>
                            <li>List 2</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                <td style="width: 50%;"><table class="e-rte-table" style="width: 100%; min-width: 0px;"><tbody><tr><td style="width: 50%;"><br></td><td style="width: 50%;"><br></td></tr><tr><td style="width: 50%;"><br></td><td style="width: 50%;"><br></td></tr></tbody></table><p><br></p></td>
                <td><div>The Rich Text Editor</div></td>
                </tr>
            </tbody>
        </table>`;
      editableElement.contentEditable = 'true';
      document.body.appendChild(editableElement);
    });
    afterEach(() => {
      detach(document.getElementById('editorRoot') as HTMLElement);
    });

    it('CASE 1 TD with Text Node', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[0].classList.add('e-cell-select');
      tdCollection[1].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(2);
      expect(blockNodes[0].tagName === 'P').toBe(true);
      expect(blockNodes[0].textContent === 'Text node').toBe(true);
      expect(blockNodes[1].tagName === 'P').toBe(true);
      expect(blockNodes[1].textContent === '').toBe(true);
    });

    it('CASE 2 TD with BR Node', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[2].classList.add('e-cell-select');
      tdCollection[3].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(2);
      expect(blockNodes[0].tagName === 'P').toBe(true);
      expect(blockNodes[0].textContent === '').toBe(true);
      expect(blockNodes[1].tagName === 'P').toBe(true);
      expect(blockNodes[1].textContent === '').toBe(true);
    });

    it('CASE 3 TD with Inline nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[4].classList.add('e-cell-select');
      tdCollection[5].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(6);
      expect(blockNodes[0].tagName === 'P').toBe(true);
      expect(blockNodes[0].textContent === 'Span ').toBe(true);
      expect(blockNodes[1].tagName === 'P').toBe(true);
      expect(blockNodes[1].textContent === 'Bold ').toBe(true);
      expect(blockNodes[2].tagName === 'P').toBe(true);
      expect(blockNodes[2].textContent === 'Italic ').toBe(true);
      tdCollection[4].innerHTML =
        '<p>Span&nbsp;<br></p><p><strong>Bold </strong><br></p><p><em>Italic <br></em></p>';
    });

    it('CASE 4 TD with Block nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[4].classList.add('e-cell-select');
      tdCollection[5].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(6);
      expect(blockNodes[3].tagName === 'P').toBe(true);
      expect(blockNodes[3].textContent === 'Paragraph 1').toBe(true);
      expect(blockNodes[4].tagName === 'P').toBe(true);
      expect(blockNodes[4].textContent === 'Paragraph 2').toBe(true);
      expect(blockNodes[5].tagName === 'P').toBe(true);
      expect(blockNodes[5].textContent === 'Paragraph 3').toBe(true);
      tdCollection[5].innerHTML =
        '<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>';
    });

    it('CASE 5 TD with List nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[6].classList.add('e-cell-select');
      tdCollection[7].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(3);
      expect(blockNodes[0].tagName === 'P').toBe(true);
      expect(blockNodes[0].textContent === '').toBe(true);
      expect(blockNodes[1].tagName === 'LI').toBe(true);
      expect(blockNodes[1].textContent === 'List 1').toBe(true);
      expect(blockNodes[2].tagName === 'LI').toBe(true);
      expect(blockNodes[2].textContent === 'List 2').toBe(true);
      tdCollection[6].innerHTML = '<ol><li>List 1</li><li>List 2</li></ol>';
    });

    it('CASE 6 TD with Table nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[8].classList.add('e-cell-select');
      tdCollection[13].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(6);
      expect(blockNodes[0].tagName === 'P').toBe(true);
      expect(blockNodes[1].tagName === 'P').toBe(true);
      expect(blockNodes[2].tagName === 'P').toBe(true);
      expect(blockNodes[3].tagName === 'P').toBe(true);
      expect(blockNodes[4].tagName === 'P').toBe(true);
      expect(blockNodes[5].tagName === 'DIV').toBe(true);
    });
  });

  describe('Text nodes collection testing ', () => {
    const editableElement: HTMLElement = createElement('div', {
      id: 'editorRoot',
      className: 'e-richtexteditor',
    });
    beforeEach(() => {
      editableElement.innerHTML = `<table class="e-rte-table" style="width: 100%; min-width: 0px;">
            <tbody>
                <tr>
                    <td style="width: 50%;">Text node</td><td style="width: 50%;"></td>
                </tr>
                <tr><td style="width: 50%;"><br></td>
                    <td style="width: 50%;"></td>
                </tr>
                <tr>
                    <td style="width: 50%;">Span&nbsp;<br><strong>Bold </strong><br><em>Italic <br></em></td>
                    <td style="width: 50%;"><p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p></td>
                </tr>
                <tr>
                    <td style="width: 50%;"><br></td>
                    <td style="width: 50%;"><ol><li>List 1</li><li>List 2</li></ol></td>
                </tr>
                <tr>
                <td style="width: 50%;"><table class="e-rte-table" style="width: 100%; min-width: 0px;"><tbody><tr><td style="width: 50%;"><br></td><td style="width: 50%;"><br></td></tr><tr><td style="width: 50%;"><br></td><td style="width: 50%;"><br></td></tr></tbody></table><p><br></p></td>
                <td><div>The Rich Text Editor</div></td>
                </tr>
            </tbody>
        </table>`;
      editableElement.contentEditable = 'true';
      document.body.appendChild(editableElement);
    });

    afterEach(() => {
      detach(document.getElementById('editorRoot') as HTMLElement);
    });

    it('CASE 1 TD with Text Node', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[0].classList.add('e-cell-select');
      tdCollection[1].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(textNodes.length).toBe(2);
      expect(textNodes[0].textContent === 'Text node').toBe(true);
      expect(textNodes[1].textContent.charCodeAt(0) === 8203).toBe(true);
    });

    it('CASE 2 TD with BR Node', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[2].classList.add('e-cell-select');
      tdCollection[3].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(textNodes.length).toBe(2);
      expect(textNodes[0].textContent.charCodeAt(0) === 8203).toBe(true);
      expect(textNodes[1].textContent.charCodeAt(0) === 8203).toBe(true);
    });

    it('CASE 3 TD with Inline nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[4].classList.add('e-cell-select');
      tdCollection[5].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(textNodes.length).toBe(6);
      expect(textNodes[0].textContent === 'Span ').toBe(true);
      expect(textNodes[1].textContent === 'Bold ').toBe(true);
      expect(textNodes[2].textContent === 'Italic ').toBe(true);
    });

    it('CASE 4 TD with Block nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[4].classList.add('e-cell-select');
      tdCollection[5].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(textNodes.length).toBe(6);
      expect(textNodes[3].textContent === 'Paragraph 1').toBe(true);
      expect(textNodes[4].textContent === 'Paragraph 2').toBe(true);
      expect(textNodes[5].textContent === 'Paragraph 3').toBe(true);
      tdCollection[5].innerHTML =
        '<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>';
    });

    it('CASE 5 TD with List nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[6].classList.add('e-cell-select');
      tdCollection[7].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(textNodes.length).toBe(3);
      expect(textNodes[0].textContent.charCodeAt(0) === 8203).toBe(true);
      expect(textNodes[1].textContent === 'List 1').toBe(true);
      expect(textNodes[2].textContent === 'List 2').toBe(true);
      tdCollection[6].innerHTML = '<ol><li>List 1</li><li>List 2</li></ol>';
    });

    it('CASE 6 TD with Table nodes', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[8].classList.add('e-cell-select');
      tdCollection[13].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(textNodes.length).toBe(5);
      expect(textNodes[0].textContent.charCodeAt(0) === 8203).toBe(true);
      expect(textNodes[1].textContent.charCodeAt(0) === 8203).toBe(true);
      expect(textNodes[2].textContent.charCodeAt(0) === 8203).toBe(true);
      expect(textNodes[3].textContent.charCodeAt(0) === 8203).toBe(true);
      expect(textNodes[4].textContent === 'The Rich Text Editor').toBe(true);
    });
  });

  describe('Combination of Block and Text nodes collection testing ', () => {
    const editableElement: HTMLElement = createElement('div', {
      id: 'editorRoot',
      className: 'e-richtexteditor',
    });
    beforeAll(() => {
      editableElement.innerHTML = `<table class="e-rte-table" style="width: 32.0806%; min-width: 0px; height: 51px;"><tbody><tr style="height: 49.0196%;"><td style="width: 41.0112%;" class="e-cell-select">The Rich Text Editor is a WYSIWYG ("what you see is what you get") editor useful to create and edit content and return the valid&nbsp;<a href="https://ej2.syncfusion.com/home/" target="_blank" aria-label="Open in new window" style="box-sizing: border-box;">HTML markup</a>&nbsp;or&nbsp;<a href="https://ej2.syncfusion.com/home/" target="_blank" aria-label="Open in new window" style="box-sizing: border-box;">markdown</a>&nbsp;of the content<br><br><p style="box-sizing: border-box;"><b style="box-sizing: border-box;">Links</b></p><ol style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px;"><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">You can insert a hyperlink with its corresponding dialog</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">Attach a hyperlink to the displayed text.</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">Customize the quick toolbar based on the hyperlink</p></li></ol></td><td style="width: 58.8015%;" class=""><p style="box-sizing: border-box;"><b style="box-sizing: border-box;">Toolbar</b></p><ol style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px;"><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">The Toolbar contains commands to align the text, insert a link, insert an image, insert list, undo/redo operations, HTML view, etc</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">The Toolbar is fully customizable</p></li></ol><p style="box-sizing: border-box;"><b style="box-sizing: border-box;">Image.</b></p><ol style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px;"><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">Allows you to insert images from an online source as well as the local computer</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">You can upload an image</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">Provides an option to customize the quick toolbar for an image</p></li></ol></td></tr><tr style="height: 49.0196%;"><td style="width: 41.0019%;"><p style="box-sizing: border-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">Users can create resizable Rich Text Editor by setting the enableResize property to true, which is used to change the size of the Rich Text Editor dynamically.</p><p style="box-sizing: border-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><span style="box-sizing: border-box; font-weight: 700;">Injecting Module</span></p><p style="box-sizing: border-box; margin-bottom: 10px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">The above features built as modules have to be included in your application. For example, to use image and link, inject the specific module using&nbsp;<code style="box-sizing: border-box; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; font-size: 12.6px; padding: 2px 4px; color: rgb(199, 37, 78); background-color: rgb(249, 242, 244); border-radius: 4px;">RichTextEditor.Inject (Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize, PasteCleanup)</code>.</p></td><td style="width: 58.8015%;" class=""><p style="box-sizing: border-box;">Rich Text Editor is a WYSIWYG editing control that will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format.</p><p style="box-sizing: border-box;"><b style="box-sizing: border-box;">API’s:</b></p><ul style="box-sizing: border-box; margin-top: 0px;"><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">maxLength - allows restricting the maximum length to be entered.</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">readOnly - allows to change it as a non-editable state.</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">enabled - enable or disable the RTE component.</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">enableHtmlEncode - Get the encoded string value through value property and source code panel</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">getValue - get the value of RTE.</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">getSelection - get the selected text of RTE.</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">selectAll - select all content in RTE.</p></li></ul></td></tr></tbody></table><p><br></p>`;
      editableElement.contentEditable = 'true';
      document.body.appendChild(editableElement);
    });

    afterAll(() => {
      detach(document.getElementById('editorRoot') as HTMLElement);
    });

    it('Content Copied from Sample browser.', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[0].classList.add('e-cell-select');
      tdCollection[1].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      const textNodes: Node[] = tableSelection.getTextNodes();
      expect(blockNodes.length).toBe(13);
      expect(textNodes.length).toBe(16);
      expect(blockNodes[0].nodeName === 'P').toBe(true);
      expect(blockNodes[12].nodeName === 'P').toBe(true);
      expect(
        textNodes[15].textContent ===
          'Provides an option to customize the quick toolbar for an image'
      );
    });
  });

  describe('Content with nested list nodes collection testing ', () => {
    const editableElement: HTMLElement = createElement('div', {
      id: 'editorRoot',
      className: 'e-richtexteditor',
    });
    beforeAll(() => {
      editableElement.innerHTML = `<table class="e-rte-table" style="width: 100%; min-width: 0px;"><tbody><tr><td style="width: 50%;">Span&nbsp;<br><strong>Bold </strong><br><em>Italic <br></em></td><td style="width: 50%;"><p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p></td></tr><tr><td style="width: 50%;"><ol style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px;"><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">The Toolbar contains commands to align the text, insert a link, insert an image, insert list, undo/redo operations, HTML view, etc</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">The Toolbar is fully customizable</p><ol style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px;"><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">The RIch Text Editor</p></li><li style="box-sizing: border-box;"><p style="box-sizing: border-box;">The Nested node</p></li></ol></li></ol></td><td style="width: 50%;"><ol><li>List 1</li><li>List 2</li></ol></td></tr><tr><td>span<br><p>Paragraph</p></td><td><div>The Rich Text Editor</div></td></tr></tbody></table>`;
      editableElement.contentEditable = 'true';
      document.body.appendChild(editableElement);
    });

    afterAll(() => {
      detach(document.getElementById('editorRoot') as HTMLElement);
    });

    it('Content Copied from Sample browser.', () => {
      const tdCollection: NodeListOf<HTMLTableCellElement> = document
        .querySelector('.e-rte-table')
        .querySelectorAll('td');
      tdCollection[2].classList.add('e-cell-select');
      tdCollection[3].classList.add('e-cell-select');
      const tableSelection = new TableSelection(
        editableElement as HTMLElement,
        document
      );
      const blockNodes: HTMLElement[] = tableSelection.getBlockNodes();
      expect(blockNodes.length).toBe(6);
    });
  });
});