    import { Injectable, signal, WritableSignal } from '@angular/core';

/**
 * ToolService is an Angular service that provides functionality for managing console messages and signals.
 * It exposes several methods for creating console messages of different types (success, error, warning, info) with a specific CSS style for each type.
 * It also uses signals to control the incrementation of a loader and the creation of logs.
 *
 * @property {WritableSignal<number>} loaderIncrement - A signal that represents the incrementation of a loader.
 * @property {WritableSignal<boolean>} createLog - A signal that controls whether or not logs should be created.
 * @property {string} success - A string representing the CSS for success messages.
 * @property {string} error - A string representing the CSS for error messages.
 * @property {string} info - A string representing the CSS for information messages.
 * @property {string} warning - A string representing the CSS for warning messages.
 *
 * @method createSuccessConsoleLog (message: string, data: any = null): void - Creates a success message in the console.
 * @method createErrorConsoleLog (message: string, data: any = null): void - Creates an error message in the console.
 * @method createWarningConsoleLog (message: string, data: any = null): void - Creates a warning message in the console.
 * @method createInfoConsoleLog (message: string, data: any = null): void - Creates an information message in the console.
 */
@Injectable({
  providedIn: 'root',
})
export class ToolService {
  /**
   * A signal that represents the increment of a loader.
   * This signal is automatically updated when an HTTP request is made. see api.interceptor.ts
   * It's a writable signal, meaning its value can be changed.
   * @type {WritableSignal<number>}
   */
  public loaderIncrement: WritableSignal<number> = signal(0);

  /**
   * A signal that controls whether logs should be created or not.
   * It's a writable signal, meaning its value can be changed.
   * @type {WritableSignal<boolean>}
   */
  public createLog: WritableSignal<boolean> = signal(true);

  /**
   * A signal that controls whether logs should be logging the data.
   * It's a writable signal, meaning its value can be changed.
   * @type {WritableSignal<boolean>}
   */
  public createLogWithData: WritableSignal<boolean> = signal(false);

  /**
   * A string representing the CSS for success messages.
   * It includes properties for background color, text color, padding, font weight, font size, and border radius.
   * @type {string}
   */
  public success = `
  background: #4CAF50;
  color:#fff;
  padding:3px 5px;
  font-weight: bold;
  font-size: 10px;
  border-radius: 5px;
`;

  /**
   * A string representing the CSS for error messages.
   * It includes properties for background color, text color, padding, font weight, font size, and border radius.
   * @type {string}
   */
  public error = `
  background: #F44336;
  color:#fff;
  padding:3px 5px;
  font-weight: bold;
  font-size: 10px;
  border-radius: 5px;
`;

  /**
   * A string representing the CSS for info messages.
   * It includes properties for background color, border, text color, padding, font weight, font size, and border radius.
   * @type {string}
   */
  public info = `
  background: transparent;
  border: 1px solid #2196F3;
  color:#2196F3;
  padding:3px 5px;
  font-weight: bold;
  font-size: 10px;
  border-radius: 5px;
`;

  /**
   * A string representing the CSS for warning messages.
   * The properties are not fully visible in the provided code.
   * @type {string}
   */
  public warning = `
    background: transparent;
    border: 1px solid #FF9800;
    color:#FF9800;
    padding:3px 5px;
    font-weight: bold;
    font-size: 10px;
    border-radius: 5px;
  `;

  /**
   * Creates a success message in the console.
   * @param message - The message to display.
   * @param data - Additional data to display with the message.
   * @returns {void} Nothing.
   */
  public createSuccessConsoleLog(message: string, data: unknown = null) {
    if (this.createLog() === false) return;
    console.log('%c' + 'SUCCESS >> ' + message, this.success, this.createLogWithData() === true && data !== null ? data : '');
  }

  /**
   * Creates a success message in the console.
   * @param message - The message to display.
   * @param data - Additional data to display with the message.
   * @returns {void} Nothing.
   */
  public createErrorConsoleLog(message: string, data: unknown = null) {
    if (this.createLog() === false) return;
    console.log('%c' + 'ERROR >> ' + message, this.error, this.createLogWithData() === true && data !== null ? data : '');
  }

  /**
   * Creates a success message in the console.
   * @param message - The message to display.
   * @param data - Additional data to display with the message.
   * @returns {void} Nothing.
   */
  public createWarningConsoleLog(message: string, data: unknown = null) {
    if (this.createLog() === false) return;
    console.log('%c' + 'WARNING >> ' + message, this.warning, this.createLogWithData() === true && data !== null ? data : '');
  }

  /**
   * Creates a success message in the console.
   * @param message - The message to display.
   * @param data - Additional data to display with the message.
   * @returns {void} Nothing.
   */
  public createInfoConsoleLog(message: string, data: unknown = null) {
    if (this.createLog() === false) return;
    console.log('%c' + 'INFO >> ' + message, this.info, this.createLogWithData() === true && data !== null ? data : '');
  }
}
