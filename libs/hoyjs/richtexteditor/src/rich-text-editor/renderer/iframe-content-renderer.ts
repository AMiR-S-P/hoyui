import { IRichTextEditor, MetaTag } from '../base/interface';
import { ContentRender } from '../renderer/content-renderer';
import { isNullOrUndefined } from '@hoyui/base';
import { getEditValue } from '../base/util';

const IFRAMEHEADER: string = `
<!DOCTYPE html> 
    <html>
         <head>
            <meta charset='utf-8' /> 
            <style>
                @charset "UTF-8";
                body {
                    font-family: "Roboto", sans-serif;
                    font-size: 14px;
                }
                html, body{height: 100%;margin: 0;}
                body.e-cursor{cursor:default}
                span.e-selected-node	{background-color: #939393;color: white;}
                span.e-selected-node.e-highlight {background-color: #1d9dd8;}
                body{color:#333;word-wrap:break-word;padding: 8px;box-sizing: border-box;}
                .e-rte-image, .e-rte-video {border: 0;cursor: pointer;display:
                    block;float: none;height: auto;margin: 5px auto;max-width: 100%;position: relative;}
                .e-rte-audio {border: 0;cursor: pointer;display:
                        block;float: none;margin: 5px auto;max-width: 100%;position: relative;}
                .e-rte-image.e-imginline, .e-rte-audio.e-audio-inline, .e-rte-video.e-video-inline {display: inline-block;float: none;
                    margin-left: 5px;margin-right: 5px;max-width: calc(100% - (2 * 5px));padding: 1px;vertical-align: bottom;}
                .e-rte-image.e-imgcenter, .e-rte-video.e-video-center {cursor: pointer;display: block;float: none;margin: 5px auto;max-width: 100%;position: relative;}
                .e-rte-image.e-imgright, .e-rte-video.e-video-right { float: right; margin: 0 auto;margin-left: 5px;text-align: right;}
                .e-rte-image.e-imgleft, .e-rte-video.e-video-left {float: left;margin: 0 auto;margin-right: 5px;text-align: left;}
                .e-img-caption { display: inline-block; float: none; margin: 5px auto; max-width: 100%;position: relative;}
                .e-img-caption.e-caption-inline {display: inline-block;float: none;
                    margin: 5px auto;margin-left: 5px;margin-right: 5px;max-width: calc(100% - (2 * 5px));
                    position: relativetext-align: center;vertical-align: bottom;}
                .e-rte-img-caption.e-imgcenter {display: contents; margin-left: auto; margin-right: auto;}
                .e-rte-img-caption.e-imgright {display: contents; margin-left: auto; margin-right: 0;}
                .e-rte-img-caption.e-imgleft {display: contents;margin-left: 0;margin-right: auto;}
                .e-img-caption.e-rte-img-caption.e-imgbreak {display: contents;}
                .e-img-inner {box-sizing: border-box;display: block;font-size: 16px;font-weight: initial;
                    margin: auto;opacity: .9;text-align: center;width: 100%;}
                .e-img-wrap {display: inline-block;margin: auto;padding: 0;text-align: center;width: 100%;}
                .e-imgleft, .e-video-left {float: left;margin: 0 5px 0 0;text-align: left;}
                .e-imgright, .e-video-right {float: right;margin: 0 0 0 5px;text-align: right;}
                .e-imgcenter, .e-video-center {cursor: pointer;display: block;float: none;height: auto;margin: 5px auto;max-width: 100%;position: relative;}
                .e-control img:not(.e-resize) {border: 2px solid transparent; z-index: 1000}
                .e-imginline , .e-audio-inline, .e-video-inline {display: inline-block;float: none;margin-left: 5px;margin-right: 5px;
                    max-width: calc(100% - (2 * 5px));vertical-align: bottom;}
                .e-imgbreak, .e-audio-break, .e-video-break {border: 0;cursor: pointer;
                    display: block;float: none;height: auto;margin: 5px auto;max-width: 100%;position: relative;}
                .e-rte-image.e-img-focus:not(.e-resize), .e-audio-focus:not(.e-resize), .e-video-focus:not(.e-resize) {border: solid 2px #4a90e2;}
                img.e-img-focus::selection, audio.e-audio-focus::selection, .e-video-focus::selection { background: transparent;color: transparent;}
                span.e-rte-imageboxmark, span.e-rte-videoboxmark {  width: 10px; height: 10px; position: absolute; display: block;
                    background: #4a90e2; border: 1px solid #fff; z-index: 1000;}
                .e-mob-rte.e-mob-span span.e-rte-imageboxmark, .e-mob-rte.e-mob-span span.e-rte-videoboxmark { background: #4a90e2; border: 1px solid #fff; }
                .e-mob-rte span.e-rte-imageboxmark, .e-mob-rte span.e-rte-videoboxmark { background: #fff; border: 1px solid #4a90e2;
                    border-radius: 15px; height: 20px; width: 20px; }
                .e-mob-rte.e-mob-span span.e-rte-imageboxmark, .e-mob-rte.e-mob-span span.e-rte-videoboxmark { background: #4a90e2; border: 1px solid #fff; }
                .e-rte-content .e-content img.e-resize, .e-rte-content .e-content video.e-resize { z-index: 1000; }
                .e-rte-content { font-size: 14px; }
                .e-content { font-weight: normal; line-height: 1.5; font-size: 1em; }
                .e-img-caption .e-img-inner { outline: 0; }
                .e-rte-img-caption.e-imgleft .e-img-inner { float: left; text-align: left; }
                .e-rte-img-caption.e-imgright .e-img-inner { float: right; text-align: right; }
                .e-rte-img-caption.e-imgleft .e-img-wrap, .e-rte-img-caption.e-imgright .e-img-wrap { display: contents; }
                .e-img-caption a:focus-visible { outline: none; }
                .e-rte-img-caption .e-rte-image.e-imgright { margin-left: auto; margin-right: 0; }
                .e-rte-img-caption .e-rte-image.e-imgleft { margin: 0; }
                body{box-sizing: border-box;min-height: 100px;outline: 0 solid transparent;
                    overflow-x: auto;padding: 16px;position: relative;text-align: inherit;z-index: 2;}
                p{margin: 0 0 10px;margin-bottom: 10px;}
                code{ background: #9d9d9d26; color: #ed484c;}
                li{margin-bottom: 10px;}
                table{margin-bottom: 10px;}
                h1{ font-size: 2.857em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
                h2{ font-size: 2.285em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
                h3{ font-size: 2em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
                h4{ font-size: 1.714em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
                h5{ font-size: 1.428em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
                h6{ font-size: 1.142em; line-height: 600; line-height: 1.5; margin: 10px 0; }
                blockquote{margin: 10px 0;margin-left: 0;padding-left: 5px;border-left: solid 2px #5c5c5c;}
                pre{background-color: inherit;border: 0;border-radius: 0;color: #333;
                    font-size: inherit;line-height: inherit;margin: 0 0 10px;overflow: visible;padding: 0;
                    white-space: pre-wrap;word-break: inherit;word-wrap: break-word;}
                strong, b{font-weight: 700;}
                a{text-decoration: none;user-select: auto;}
                a:hover{text-decoration: underline;};
                p:last-child, pre:last-child, blockquote:last-child{margin-bottom: 0;}
                h3+h4, h4+h5, h5+h6{margin-top: 00.6em;}
                ul:last-child{margin-bottom: 0;}
                table { border-collapse: collapse; empty-cells: show;}
                table td,table th {border: 1px solid #BDBDBD; height: 20px; padding: 2px 5px; vertical-align: middle;}
                table.e-alternate-border tbody tr:nth-child(2n) {background-color: #F5F5F5;}
                table th {background-color: #E0E0E0;}
                table.e-dashed-border td,table.e-dashed-border th { border: 1px dashed #BDBDBD} 
                table .e-cell-select {border: 1px double #4a90e2;}
                table.e-cell-select {position: relative;}
                table.e-cell-select::after { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 2px solid #4a90e2; pointer-events: none;}
                table td.e-cell-select.e-multi-cells-select, table th.e-cell-select.e-multi-cells-select {border: 1px solid #dee2e6; position: relative; }
                table td.e-cell-select.e-multi-cells-select::after, table th.e-cell-select.e-multi-cells-select::after {background-color: rgba(13, 110, 253, 0.08); content: "";
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%; bottom: 0; pointer-events: none; right: 0;}
                span.e-table-box { cursor: nwse-resize; display: block; height: 10px; position: absolute; width: 10px; }
                span.e-table-box.e-rmob {height: 14px;width: 14px;}
                .e-row-resize, .e-column-resize { background-color: transparent; background-repeat: repeat;
                    bottom: 0;cursor: col-resize;height: 1px;overflow: visible;position: absolute;width: 1px; }
                .e-row-resize { cursor: row-resize; height: 1px;}
                .e-table-rhelper { cursor: col-resize; opacity: .87;position: absolute;}
                .e-table-rhelper.e-column-helper { width: 1px; }
                .e-table-rhelper.e-row-helper {height: 1px;}
                .e-reicon::before { border-bottom: 6px solid transparent; border-right: 6px solid;
                    border-top: 6px solid transparent; content: ''; display: block; height: 0;
                    position: absolute; right: 4px; top: 4px; width: 20px; }
                .e-reicon::after { border-bottom: 6px solid transparent; border-left: 6px solid;
                    border-top: 6px solid transparent; content: ''; display: block;
                    height: 0; left: 4px; position: absolute; top: 4px; width: 20px; z-index: 3; }
                .e-row-helper.e-reicon::after { top: 10px; transform: rotate(90deg); }
                .e-row-helper.e-reicon::before { left: 4px; top: -20px; transform: rotate(90deg); }
                span.e-table-box { background-color: #ffffff; border: 1px solid #BDBDBD; }
                span.e-table-box.e-rbox-select { background-color: #BDBDBD; border: 1px solid #BDBDBD; }
                .e-table-rhelper { background-color: #4a90e2;}
                .e-rtl { direction: rtl; }
                .e-rte-placeholder::before { content: attr(placeholder); opacity: 0.54; overflow: hidden; padding-top: 16px; position: absolute; text-align: start; top: 0; z-index: 1; }
                li ol, li ul { margin-block-start: 10px;}
                .e-resize-enabled, .e-count-enabled { padding-bottom: 0px; }
                td.e-multi-cells-select ::selection, th.e-multi-cells-select ::selection { background-color: transparent; }
                td.e-multi-cells-select, th.e-multi-cells-select { user-select: none !important; }
            </style>
        </head>`;

/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
export class IframeContentRender extends ContentRender {
  /**
   * The function is used to render Rich Text Editor iframe
   *
   * @hidden
   * @deprecated
   */

  public renderPanel(): void {
    const rteObj: IRichTextEditor = this.parent;
    const rteContent: string = getEditValue(rteObj.value, rteObj);
    const iFrameBodyContent: string =
      '<body spellcheck="false" autocorrect="off" contenteditable="true">' +
      rteContent +
      '</body></html>';
    let iFrameContent: string = IFRAMEHEADER + iFrameBodyContent;
    const iframe: HTMLIFrameElement = <HTMLIFrameElement>(
      this.parent.createElement('iframe', {
        id: this.parent.getID() + '_rte-view',
        className: 'e-rte-content',
        attrs: { srcdoc: iFrameContent },
      })
    );
    iframe.setAttribute('role', 'none');
    this.setPanel(iframe);
    if (!isNullOrUndefined(this.parent.iframeSettings.sandbox)) {
      let sandboxValues: string = this.parent.iframeSettings.sandbox
        .map((element: string) => element.toLocaleLowerCase().trim())
        .join(' ');
      if (!sandboxValues.includes('allow-same-origin')) {
        sandboxValues += ' allow-same-origin';
      }
      iframe.setAttribute('sandbox', sandboxValues.trim());
    }
    rteObj.rootContainer.appendChild(iframe);
    iframe.contentDocument.body.id = this.parent.getID() + '_rte-edit-view';
    iframe.contentDocument.body.setAttribute('aria-owns', this.parent.getID());
    iframe.contentDocument.open();
    iFrameContent = this.setThemeColor(iFrameContent, { color: '#333' });
    iframe.contentDocument.write(iFrameContent);
    iframe.contentDocument.close();
    if (rteObj.enableRtl) {
      (
        this.contentPanel as HTMLIFrameElement
      ).contentDocument.body.setAttribute('class', 'e-rtl');
    }
    if (
      !isNullOrUndefined(iframe.contentDocument.head) &&
      this.parent.iframeSettings.metaTags.length > 0
    ) {
      const head: HTMLHeadElement = iframe.contentDocument.head;
      const metaData: Array<MetaTag> = this.parent.iframeSettings.metaTags;
      metaData.forEach((tag: MetaTag) => {
        const meta: HTMLElement = document.createElement('meta');
        for (const key in tag) {
          if (!isNullOrUndefined(tag[key as keyof MetaTag])) {
            meta.setAttribute(
              key === 'httpEquiv' ? 'http-equiv' : key,
              tag[key as keyof MetaTag] as string
            );
          }
        }
        head.appendChild(meta);
      });
    }
  }
  private setThemeColor(
    content: string,
    styles: { [key: string]: string }
  ): string {
    const fontColor: string = getComputedStyle(
      this.parent.element,
      '.e-richtexteditor'
    ).getPropertyValue('color');
    return content.replace(styles.color, fontColor);
  }
  /**
   * Get the editable element of RichTextEditor
   *
   * @returns {Element} - specifies the element.
   * @hidden
   * @deprecated
   */
  public getEditPanel(): Element {
    let editNode: HTMLElement;
    if (
      !isNullOrUndefined(
        (this.contentPanel as HTMLIFrameElement).contentDocument
      )
    ) {
      editNode = (this.contentPanel as HTMLIFrameElement).contentDocument.body;
    } else {
      editNode = this.parent.inputElement;
    }
    return editNode;
  }
  /**
   * Get the document of RichTextEditor
   *
   * @returns {void}
   * @hidden
   * @deprecated
   */
  public getDocument(): Document {
    return this.getEditPanel().ownerDocument;
  }
}