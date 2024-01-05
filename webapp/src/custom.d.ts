declare namespace NodeJS {
    interface Require {
      context(path: string, flag: boolean, expression: RegExp): any;
    }
  }