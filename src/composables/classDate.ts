export class customDate {
  current: Date;

  constructor(date?: Date | string | number) {
    // as string please use ISO format;
    // number => milliseconds from 1-1-1970(new Date.getTime() will return this value)
    this.current = this.__createDate(date ? date : 0);
  }

  __createDate(date?: Date | string | number): Date {
    if (date) {
      if (date instanceof Date) {
        return date;
      } else {
        return new Date(date);
      }
    } else {
      return new Date();
    }
  }
  formatDate(format: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: format.includes("YYYY") ? "numeric" : undefined,
      month: format.includes("MM")
        ? "2-digit"
        : format.includes("MMM")
        ? "short"
        : format.includes("MMMM")
        ? "long"
        : undefined,
      day: format.includes("DD") ? "2-digit" : undefined,
      hour: format.includes("HH") ? "2-digit" : undefined,
      hour12: format.includes("hh") || format.includes("a") ? true : undefined,
      minute: format.includes("mm") ? "2-digit" : undefined,
      second: format.includes("ss") ? "2-digit" : undefined,
      timeZone: format.includes("Z") ? "UTC" : undefined,
      timeZoneName: format.includes("z") ? "short" : undefined,
    };

    const formatter = new Intl.DateTimeFormat(undefined, options);
    const parts = formatter.formatToParts(this.current);

    let formattedDate = "";
    for (const part of parts) {
      switch (part.type) {
        case "year":
          formattedDate += part.value.padStart(4, "0");
          break;
        case "month":
          formattedDate += format.includes("MMM")
            ? part.value.slice(0, 3)
            : format.includes("MMMM")
            ? part.value
            : part.value.padStart(2, "0");
          break;
        case "day":
          formattedDate += part.value.padStart(2, "0");
          break;
        case "hour":
          formattedDate += format.includes("HH")
            ? part.value.padStart(2, "0")
            : part.value;
          break;
        case "minute":
          formattedDate += part.value.padStart(2, "0");
          break;
        case "second":
          formattedDate += part.value.padStart(2, "0");
          break;
        case "dayPeriod":
          formattedDate += format.includes("a") ? part.value.toUpperCase() : "";
          break;
        case "timeZoneName":
          formattedDate += format.includes("z") ? part.value : "";
          break;
        default:
          formattedDate += part.value;
          break;
      }
    }
    return formattedDate;
  }

  // difference Function

  dateDiff(date: Date | string | number, unit: string): number {
    const passedDate = this.__createDate(date);
    const diff = passedDate.getTime() - this.current.getTime();

    switch (unit) {
      case "y":
        return passedDate.getUTCFullYear() - this.current.getUTCFullYear();
      case "m":
        return (
          (passedDate.getUTCFullYear() - this.current.getUTCFullYear()) * 12 +
          (passedDate.getUTCMonth() - this.current.getUTCMonth())
        );
      case "w":
        return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
      case "d":
        return Math.floor(diff / (24 * 60 * 60 * 1000));
      case "h":
        return Math.floor(diff / (60 * 60 * 1000));
      case "min":
        return Math.floor(diff / (60 * 1000));
      case "s":
        return Math.floor(diff / 1000);
      case "ms":
        return diff;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }

  // isBefore function

  isBefore(date: Date | string | number): boolean {
    const passedDate = this.__createDate(date);
    return this.current.getTime() - passedDate.getTime() > 0;
  }

  // isSame function

  isSame(date: Date | string | number): boolean {
    const passedDate = this.__createDate(date);
    return passedDate.getTime() === this.current.getTime();
  }

  // isAfter function

  isAfter(date: Date | string | number): boolean {
    const passedDate = this.__createDate(date);
    return this.current.getTime() - passedDate.getTime() > 0;
  }

  setDate(unit: string, value: number): void {
    switch (unit) {
      case "y":
        this.current.setUTCFullYear(value);
        break;
      case "m":
        this.current.setUTCMonth(value - 1);
        break;
      case "d":
        this.current.setUTCDate(value);
        break;
      case "h":
        this.current.setUTCHours(value);
        break;
      case "min":
        this.current.setUTCMinutes(value);
        break;
      case "s":
        this.current.setUTCSeconds(value);
        break;
      case "ms":
        this.current.setUTCMilliseconds(value);
        break;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }

  // Get

  getDatePart(unit: string): number {
    switch (unit) {
      case "y":
        return this.current.getUTCFullYear();
      case "m":
        return this.current.getUTCMonth() + 1;
      case "d":
        return this.current.getUTCDate();
      case "h":
        return this.current.getUTCHours();
      case "min":
        return this.current.getUTCMinutes();
      case "s":
        return this.current.getUTCSeconds();
      case "ms":
        return this.current.getUTCMilliseconds();
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }
}
