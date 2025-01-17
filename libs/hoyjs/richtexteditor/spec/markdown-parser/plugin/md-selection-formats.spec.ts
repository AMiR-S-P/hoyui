/**
 * Markdown Selection Formats plugin spec
 */
import { createElement, detach } from '@hoyui/base';
import { MarkdownParser } from '../../../src/markdown-parser/index';

describe('Markdown - selection command plugin', () => {
  let innerValue: string = `Lists are a piece of cake
They even auto continue as you type
A double enter will end them
Tabs and shift-tabs work too`;

  describe(' style testing', () => {
    let editorObj: MarkdownParser;
    let textArea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      createElement('textarea', {
        id: 'markdown-editor',
        styles: 'width:200px;height:200px',
      })
    );
    beforeAll(() => {
      document.body.appendChild(textArea);
      editorObj = new MarkdownParser({ element: textArea });
      textArea.value = innerValue;
      textArea.focus();
    });

    it(' apply to bold testing  ', () => {
      editorObj.markdownSelection.save(0, 5);
      editorObj.markdownSelection.restore(textArea);
      let isCallBack: boolean = false;
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(\\*\\* )', 'gim').test(line)).toBe(true);
      editorObj.markdownSelection.save(0, 10);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(line.indexOf('**') === 0).toBe(true);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      expect(new RegExp('(\\*\\* )', 'gim').test(line)).not.toBe(true);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('Bold');
      expect(cmd).toBe(true);
    });
    it(' apply to italic testing  ', () => {
      editorObj.markdownSelection.save(13, 17);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Italic', null);
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(\\* )', 'gim').test(line)).toBe(true);
      editorObj.markdownSelection.save(12, 19);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Italic', null);
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(
        line.indexOf('*', textArea.selectionStart - 1) ===
          textArea.selectionStart - 1
      ).toBe(true);
      editorObj.execCommand('Style', 'Italic', null);
      expect(
        line.indexOf('*', textArea.selectionStart - 1) !==
          textArea.selectionStart - 1
      ).toBe(true);
      editorObj.execCommand('Style', 'Italic', null);
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('Italic');
      expect(cmd).toBe(true);
    });
    it(' apply to StrikeThrough testing  ', () => {
      editorObj.markdownSelection.save(25, 30);
      editorObj.markdownSelection.restore(textArea);
      let isCallBack: boolean = false;
      editorObj.execCommand('Style', 'StrikeThrough', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(\\~~)', 'g').test(line)).toBe(true);
      editorObj.markdownSelection.save(27, 27);
      editorObj.markdownSelection.restore(textArea);
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('StrikeThrough');
      expect(cmd).toBe(true);
      editorObj.markdownSelection.save(22, 35);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Style', 'StrikeThrough', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect((line as any).includes('~~')).toBe(true);
    });
    it(' apply to subscript testing  ', () => {
      editorObj.markdownSelection.save(37, 45);
      editorObj.markdownSelection.restore(textArea);
      let isCallBack: boolean = false;
      editorObj.execCommand('Effects', 'SubScript', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(\\<sub>)', 'g').test(line)).toBe(true);
      editorObj.markdownSelection.save(49, 49);
      editorObj.markdownSelection.restore(textArea);
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('SubScript');
      expect(cmd).toBe(true);
      editorObj.markdownSelection.save(36, 60);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Effects', 'SubScript', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect((line as any).includes('<sub>')).toBe(true);
      editorObj.markdownSelection.save(41, 54);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Effects', 'SubScript', null, () => {
        isCallBack = true;
      });
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect((line as any).includes('<sub>')).not.toBe(true);
      editorObj.execCommand('Effects', 'SubScript', null, () => {
        isCallBack = true;
      });
    });
    it(' apply to superscript testing  ', () => {
      editorObj.markdownSelection.save(70, 80);
      editorObj.markdownSelection.restore(textArea);
      let isCallBack: boolean = false;
      editorObj.execCommand('Effects', 'SuperScript', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(\\<sup>)', 'g').test(line)).toBe(true);
      editorObj.markdownSelection.save(75, 75);
      editorObj.markdownSelection.restore(textArea);
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('SuperScript');
      expect(cmd).toBe(true);
      editorObj.markdownSelection.save(70, 95);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Effects', 'SuperScript', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect((line as any).includes('<sup>')).toBe(true);
    });
    it(' apply to casing testing  ', () => {
      editorObj.markdownSelection.save(122, 125);
      editorObj.markdownSelection.restore(textArea);
      let isCallBack: boolean = false;
      editorObj.execCommand('Casing', 'UpperCase', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      editorObj.markdownSelection.save(123, 125);
      editorObj.markdownSelection.restore(textArea);
      let line: any =
        editorObj.markdownSelection.getSelectedInlinePoints(textArea);
      expect(new RegExp('^[A-Z]*$', 'g').test(line.text)).toBe(true);
      editorObj.markdownSelection.save(124, 124);
      editorObj.markdownSelection.restore(textArea);
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('UpperCase');
      expect(cmd).toBe(true);
      editorObj.markdownSelection.save(123, 125);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Casing', 'LowerCase', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      editorObj.markdownSelection.save(123, 125);
      editorObj.markdownSelection.restore(textArea);
      line = editorObj.markdownSelection.getSelectedInlinePoints(textArea);
      expect(new RegExp('^[a-z]*$', 'g').test(line.text)).toBe(true);
      editorObj.markdownSelection.save(200, 200);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Casing', 'UpperCase', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      line = editorObj.markdownSelection.getSelectedInlinePoints(textArea);
      expect(line.text === '').toBe(true);
    });
    it(' apply to code block testing  ', () => {
      editorObj.markdownSelection.save(140, 150);
      editorObj.markdownSelection.restore(textArea);
      (<any>editorObj).mdSelectionFormats.applyCommands({
        subCommand: 'InlineCode',
        callBack: function () {},
      });
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(`)', 'gim').test(line)).toBe(true);
      editorObj.markdownSelection.save(155, 165);
      editorObj.markdownSelection.restore(textArea);
      (<any>editorObj).mdSelectionFormats.applyCommands({
        subCommand: 'InlineCode',
        callBack: function () {},
      });
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(`)', 'gim').test(line)).toBe(true);
    });
    afterAll(() => {
      detach(textArea);
    });
  });
  describe(' style testing', () => {
    let editorObj: MarkdownParser;
    let textArea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      createElement('textarea', {
        id: 'markdown-editor',
        styles: 'width:200px;height:200px',
      })
    );
    beforeAll(() => {
      document.body.appendChild(textArea);
      editorObj = new MarkdownParser({ element: textArea });
      textArea.value = innerValue;
      textArea.focus();
    });

    it(' apply all command combination testing  ', () => {
      editorObj.markdownSelection.save(3, 7);
      editorObj.markdownSelection.restore(textArea);
      let isCallBack: boolean = false;
      editorObj.execCommand('Style', 'StrikeThrough', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      let line: string = editorObj.markdownSelection.getSelectedLine(textArea);
      editorObj.markdownSelection.save(6, 6);
      editorObj.markdownSelection.restore(textArea);
      let cmd = editorObj.mdSelectionFormats.isAppliedCommand('StrikeThrough');
      expect(cmd).toBe(true);
      editorObj.markdownSelection.save(12, 18);
      editorObj.markdownSelection.restore(textArea);
      (<any>editorObj).mdSelectionFormats.applyCommands({
        subCommand: 'InlineCode',
        callBack: function () {},
      });
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(new RegExp('(`)', 'gim').test(line)).toBe(true);
      editorObj.markdownSelection.save(17, 17);
      editorObj.markdownSelection.restore(textArea);
      editorObj.mdSelectionFormats.isAppliedCommand('InlineCode');
      editorObj.markdownSelection.save(27, 32);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Effects', 'SuperScript', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      editorObj.markdownSelection.save(33, 33);
      editorObj.markdownSelection.restore(textArea);
      editorObj.markdownSelection.save(45, 55);
      editorObj.markdownSelection.restore(textArea);
      isCallBack = false;
      editorObj.execCommand('Effects', 'SubScript', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      editorObj.markdownSelection.save(52, 52);
      editorObj.markdownSelection.restore(textArea);
      editorObj.markdownSelection.save(80, 90);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Bold', null, function () {
        isCallBack = true;
      });
      editorObj.markdownSelection.save(75, 96);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Italic', null, function () {
        isCallBack = true;
      });
      editorObj.markdownSelection.save(120, 130);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Italic', null, function () {
        isCallBack = true;
      });
      editorObj.execCommand('Style', 'Italic', null, function () {
        isCallBack = true;
      });
      editorObj.markdownSelection.save(115, 145);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Bold', null, function () {
        isCallBack = true;
      });
      editorObj.markdownSelection.save(110, 150);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Italic', null, function () {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      editorObj.markdownSelection.save(105, 160);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Italic', null, function () {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
    });
    afterAll(() => {
      detach(textArea);
    });
  });

  describe('RTE - uncommand', () => {
    let editorObj: MarkdownParser;
    let innerHTML: string = `Lists are a piece of cake
They even auto continue as you type
A double enter will end them
Tabs and shift-tabs work too`;
    let textArea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      createElement('textarea', {
        id: 'markdown-editor',
        styles: 'width:200px;height:200px',
      })
    );
    beforeAll(() => {
      document.body.appendChild(textArea);
      editorObj = new MarkdownParser({ element: textArea });
      textArea.value = innerHTML;
      textArea.focus();
    });

    it('apply and remvoe the command', () => {
      let isCallBack: boolean = false;
      let line: any;
      editorObj.markdownSelection.save(0, 5);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      expect(isCallBack).toBe(true);
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(line.indexOf('**') === 0).toBe(true);
      editorObj.execCommand('Style', 'Italic', null, () => {
        isCallBack = true;
      });
      editorObj.execCommand('Style', 'StrikeThrough', null, () => {
        isCallBack = true;
      });
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(line.indexOf('~~') > 0).toBe(true);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      editorObj.execCommand('Style', 'Italic', null, () => {
        isCallBack = true;
      });
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(line.indexOf('**') < 0).toBe(true);
      editorObj.execCommand('Style', 'StrikeThrough', null, () => {
        isCallBack = true;
      });
      line = editorObj.markdownSelection.getSelectedLine(textArea);
      expect(line.indexOf('~~') < 0).toBe(true);
    });

    afterAll(() => {
      detach(textArea);
    });
  });

  describe('EJ2-23207 RTE - The UpperCase command is not working properly in Markdown editor ', () => {
    let editorObj: MarkdownParser;
    let innerHTML: string = `Lists are a piece of cake
They even auto continue as you type
A double enter will end them
Tabs and **shift-tabs** work too`;
    let textArea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      createElement('textarea', {
        id: 'markdown-editor',
        styles: 'width:200px;height:200px',
      })
    );
    beforeAll(() => {
      document.body.appendChild(textArea);
      editorObj = new MarkdownParser({ element: textArea });
      textArea.value = innerHTML;
      length = textArea.value.length;
      textArea.focus();
    });

    it(' Apply uppercase command ', () => {
      let isCallBack: boolean = false;
      let line: any;
      editorObj.markdownSelection.save(4, 12);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Casing', 'UpperCase', null, () => {
        isCallBack = true;
      });
      let upperCaseText: string =
        editorObj.markdownSelection.getSelectedText(textArea);
      expect(upperCaseText === upperCaseText.toUpperCase()).toBe(true);
      editorObj.markdownSelection.save(8, 16);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Casing', 'UpperCase', null, () => {
        isCallBack = true;
      });
      upperCaseText = editorObj.markdownSelection.getSelectedText(textArea);
      expect(upperCaseText === upperCaseText.toUpperCase()).toBe(true);
    });

    afterAll(() => {
      detach(textArea);
    });
  });
  describe('EJ2-23972 RTE - Markdown strikethrough style apply not working properly', () => {
    let editorObj: MarkdownParser;
    let length: number;
    let innerHTML: string = `Lists are a piece of cake
They even auto continue as you type
A double enter will end them
Tabs and **shift-tabs** work too`;
    let textArea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      createElement('textarea', {
        id: 'markdown-editor',
        styles: 'width:200px;height:200px',
      })
    );
    beforeAll(() => {
      document.body.appendChild(textArea);
      editorObj = new MarkdownParser({ element: textArea });
      textArea.value = innerHTML;
      length = textArea.value.length;
      textArea.focus();
    });

    it(' Revert the bold command properly', () => {
      let isCallBack: boolean = false;
      editorObj.markdownSelection.save(0, textArea.value.length);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      let secondLength = textArea.value.length;
      let revertSyntax: number = 4;
      let addSyntax: number = 4;
      expect(secondLength - addSyntax + revertSyntax == length).toBe(true);

      editorObj.markdownSelection.save(10, 20);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      secondLength = textArea.value.length;
      expect(secondLength + 4 == length).toBe(true);
      length = length - 4;
      editorObj.markdownSelection.save(10, 20);
      editorObj.markdownSelection.restore(textArea);
      editorObj.execCommand('Style', 'Bold', null, () => {
        isCallBack = true;
      });
      secondLength = textArea.value.length;
      addSyntax = 4;
      expect(secondLength - addSyntax == length).toBe(true);
    });

    afterAll(() => {
      detach(textArea);
    });
  });
});
