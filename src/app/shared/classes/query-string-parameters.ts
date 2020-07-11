export class QueryStringParameters {
    private paramsAndValues: string[];

    constructor() {
        this.paramsAndValues = [];
    }

    // tslint:disable-next-line:ban-types
    public push(key: string, value: Object): void {
        value = encodeURIComponent(value.toString());
        this.paramsAndValues.push([key, value].join('='));
    }

    public toString = (): string => this.paramsAndValues.join('&');
}
