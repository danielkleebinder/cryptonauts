import {environment} from '../../../environments/environment';


/**
 * Use this class to print information.
 */
export class Logger {

  private readonly debugStyle = 'background: #e4e4e4; color: #000; padding: 3px; font-size: 11px;';
  private readonly infoStyle = 'background: #00bcd4; color: #fff; padding: 3px; font-size: 11px;';
  private readonly warnStyle = 'background: #d4bc00; color: #fff; padding: 3px; font-size: 11px;';
  private readonly errorStyle = 'background: #d40000; color: #fff; padding: 3px; font-size: 11px;';

  private constructor(public readonly loggerName) {
  }

  /**
   * Creates a new logger instance. This function tries to call the ".name" field on the given logger
   * name parameter. If it is not present, it just uses the string representation.
   * @param loggerName Logger name.
   */
  static getLogger(loggerName: string | any): Logger {
    return new Logger(loggerName.name || loggerName);
  }

  /**
   * Logs a verbose debug message (not used in production).
   * @param data Data to log.
   */
  debug(...data: any[]): void {
    if (environment.production) {
      return;
    }
    console.debug(`%c${new Date().toISOString()} DEBUG [${this.loggerName}]`, this.debugStyle, ...data);
  }

  /**
   * Logs an info message (not used in production).
   * @param data Data to log.
   */
  info(...data: any[]): void {
    if (environment.production) {
      return;
    }
    console.info(`%c${new Date().toISOString()}  INFO [${this.loggerName}]`, this.infoStyle, ...data);
  }

  /**
   * Logs a warning message (not used in production).
   * @param data Data to log.
   */
  warn(...data: any[]): void {
    if (environment.production) {
      return;
    }
    console.warn(`%c${new Date().toISOString()}  WARN [${this.loggerName}]`, this.warnStyle, ...data);
  }

  /**
   * Logs an error message.
   * @param data Data to log.
   */
  error(...data: any[]): void {
    console.error(`%c${new Date().toISOString()} ERROR [${this.loggerName}]`, this.errorStyle, ...data);
  }
}
