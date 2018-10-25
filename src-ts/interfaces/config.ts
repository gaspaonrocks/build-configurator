export default interface ConfigObject {
    entry: Array<string> | string,
    output: string,
    module: object,
    plugins: Array<object>
}