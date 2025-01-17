import { PathOption } from '@hoyui/svg-base';
import { remove, createElement } from '@hoyui/base';
/**
 * helper for progress bar
 */
/** @private */
export class Rect {
  public x: number;
  public y: number;
  public height: number;
  public width: number;
  constructor(x: number, y: number, height: number, width: number) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}
/** @private */
export class Size {
  public height: number;
  public width: number;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
}
/** @private */
export class Pos {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
/** @private */
export class RectOption extends PathOption {
  public x: number;
  public y: number;
  public height: number;
  public width: number;
  public rx: number;
  public ry: number;
  public transform: string;
  constructor(
    id: string,
    fill: string,
    width: number,
    color: string,
    opacity: number,
    rect: Rect,
    rx?: number,
    ry?: number,
    transform?: string,
    dashArray?: string
  ) {
    super(id, fill, width, color, opacity, dashArray);
    this.y = rect.y;
    this.x = rect.x;
    this.height = rect.height;
    this.width = rect.width;
    this.rx = rx ? rx : 0;
    this.ry = ry ? ry : 0;
    this.transform = transform ? transform : '';
    this.stroke = width !== 0 && this.stroke !== '' ? color : 'transparent';
  }
}

/** @private */
export class ColorValue {
  public r: number;
  public g: number;
  public b: number;

  constructor(r?: number, g?: number, b?: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

/**
 * Converts a color value to its hexadecimal representation.
 *
 * @param {ColorValue} value - The color value to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
export function convertToHexCode(value: ColorValue): string {
  return (
    '#' +
    componentToHex(value.r) +
    componentToHex(value.g) +
    componentToHex(value.b)
  );
}

/**
 * Converts a color component value to its hexadecimal representation.
 *
 * @param {number} value - The color component value to convert.
 * @returns {string} - The hexadecimal representation of the color component.
 * @private
 */
export function componentToHex(value: number): string {
  const hex: string = value.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Converts a hexadecimal color code to a ColorValue.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @returns {ColorValue} - The ColorValue representing the color.
 * @private
 */
export function convertHexToColor(hex: string): ColorValue {
  const result: RegExpExecArray =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? new ColorValue(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      )
    : new ColorValue(255, 255, 255);
}

/**
 * Converts a color name to its corresponding hexadecimal representation.
 *
 * @param {string} color - The color name to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
export function colorNameToHex(color: string): string {
  color = color === 'transparent' ? 'white' : color;
  document.body.appendChild(createElement('text', { id: 'chartmeasuretext' }));
  const element: HTMLElement = document.getElementById('chartmeasuretext');
  element.style.color = color;
  color = window.getComputedStyle(element).color;
  remove(element);
  let isRGBValue: string[];
  if (color.indexOf('rgb') === 0 || color.indexOf('hsl') === 0) {
    color = color.replace(/\s/g, '').replace(/[()]/g, '');
    isRGBValue = color.slice(3).split(',');
  }
  return convertToHexCode(
    new ColorValue(
      parseInt(isRGBValue[3], 10),
      parseInt(isRGBValue[4], 10),
      parseInt(isRGBValue[5], 10)
    )
  );
}

/** @private */
export class TextOption {
  public id: string;
  public ['font-size']: string;
  public ['font-style']: string;
  public ['font-family']: string;
  public ['font-weight']: string;
  public ['text-anchor']: string;
  public fill: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  constructor(
    id: string,
    fontSize: string,
    fontStyle: string,
    fontFamily: string,
    fontWeight: string,
    textAnchor: string,
    fill: string,
    x: number,
    y: number,
    width?: number,
    height?: number
  ) {
    this.id = id;
    this['font-size'] = fontSize;
    this['font-style'] = fontStyle;
    this['font-family'] = fontFamily;
    this['font-weight'] = fontWeight;
    this['text-anchor'] = textAnchor;
    this.fill = fill;
    this.x = x;
    this.y = y;
    this.width = width ? width : 0;
    this.height = height ? height : 0;
  }
}
/**
 * Converts polar coordinates (angle in degrees) to Cartesian coordinates.
 *
 * @param {number} centerX - The x-coordinate of the center point.
 * @param {number} centerY - The y-coordinate of the center point.
 * @param {number} radius - The radius from the center point.
 * @param {number} angleInDegrees - The angle in degrees.
 * @returns {Pos} - The Cartesian coordinates (x, y) corresponding to the given polar coordinates.
 */
export function degreeToLocation(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Pos {
  const angleInRadians: number = (angleInDegrees - 90) * (Math.PI / 180);

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
/**
 * Generates an SVG path arc string based on given parameters.
 *
 * @param {number} x - The x-coordinate of the center of the arc.
 * @param {number} y - The y-coordinate of the center of the arc.
 * @param {number} radius - The radius of the arc.
 * @param {number} startAngle - The start angle of the arc in degrees.
 * @param {number} endAngle - The end angle of the arc in degrees.
 * @param {boolean} enableRtl - Indicates whether the drawing direction is right-to-left.
 * @param {boolean} pieView - Indicates whether the arc should be drawn as a pie slice.
 * @returns {string} - The SVG path arc string representing the arc.
 */
export function getPathArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  enableRtl: boolean,
  pieView?: boolean
): string {
  const start: Pos = degreeToLocation(x, y, radius, startAngle);
  const end: Pos = degreeToLocation(x, y, radius, endAngle);
  let largeArcFlag: string = '0';
  const sweepFlag: string = enableRtl ? '0' : '1';
  if (!enableRtl) {
    largeArcFlag =
      (endAngle >= startAngle ? endAngle : endAngle + 360) - startAngle <= 180
        ? '0'
        : '1';
  } else {
    largeArcFlag =
      (startAngle >= endAngle ? startAngle : startAngle + 360) - endAngle <= 180
        ? '0'
        : '1';
  }
  let d: string;
  if (pieView) {
    d =
      'M ' +
      x +
      ' ' +
      y +
      ' L ' +
      start.x +
      ' ' +
      start.y +
      ' A ' +
      radius +
      ' ' +
      radius +
      ' ' +
      ' 0 ' +
      ' ' +
      largeArcFlag +
      ' ' +
      sweepFlag +
      ' ' +
      end.x +
      ' ' +
      end.y +
      ' ' +
      'Z';
  } else {
    d =
      'M' +
      start.x +
      ' ' +
      start.y +
      'A' +
      radius +
      ' ' +
      radius +
      ' ' +
      '0' +
      ' ' +
      largeArcFlag +
      ' ' +
      sweepFlag +
      ' ' +
      end.x +
      ' ' +
      end.y;
  }
  return d;
}
/**
 * Converts a string value to a number, considering the container size.
 *
 * @param {string} value - The string value to convert to a number.
 * @param {number} containerSize - The size of the container to consider for relative values.
 * @returns {number} - The converted number value.
 * @private
 */
export function stringToNumber(value: string, containerSize: number): number {
  if (value !== null && value !== undefined) {
    return value.indexOf('%') !== -1
      ? (containerSize / 100) * parseInt(value, 10)
      : parseInt(value, 10);
  }
  return null;
}
/**
 * Sets attributes on an HTML element based on the provided options.
 *
 * @param {any} options - The options object containing attributes to set.
 * @param {Element} element - The HTML element to set attributes on.
 * @returns {Element} - The modified HTML element.
 * @private
 */
export function setAttributes(options: any, element: Element): Element {
  const keys: string[] = Object.keys(options);
  for (let i: number = 0; i < keys.length; i++) {
    element.setAttribute(keys[i as number], options[keys[i as number]]);
  }
  return element;
}
/**
 * Calculates the effect value at a given time based on the start and end values, duration, and direction.
 *
 * @param {number} currentTime - The current time in milliseconds.
 * @param {number} startValue - The start value of the effect.
 * @param {number} endValue - The end value of the effect.
 * @param {number} duration - The duration of the effect in milliseconds.
 * @param {boolean} enableRtl - Indicates whether the effect direction is right-to-left.
 * @returns {number} - The calculated effect value at the given time.
 * @private
 */
export function effect(
  currentTime: number,
  startValue: number,
  endValue: number,
  duration: number,
  enableRtl: boolean
): number {
  const start: number = enableRtl ? endValue : -endValue;
  const end: number = startValue + (enableRtl ? -endValue : endValue);
  return start * Math.cos((currentTime / duration) * (Math.PI / 2)) + end;
}
/**
 * @private
 */
export const annotationRender: string = 'annotationRender';
/**
 * Retrieves an HTML element from the DOM by its ID.
 *
 * @param {string} id - The ID of the HTML element to retrieve.
 * @returns {Element} - The HTML element with the specified ID.
 * @private
 */
export function getElement(id: string): Element {
  return document.getElementById(id);
}
/**
 * Removes an HTML element from the DOM.
 *
 * @param {string | Element} id - The ID of the HTML element or the element itself to remove.
 *                                If provided as a string, it's assumed to be the ID of the element.
 * @returns {void}
 * @private
 */
export function removeElement(id: string | Element): void {
  if (!id) {
    return null;
  }
  const element: Element = typeof id === 'string' ? getElement(id) : id;
  if (element) {
    remove(element);
  }
}
/**
 * @private
 */
export class ProgressLocation {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
