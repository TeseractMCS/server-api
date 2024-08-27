interface IJSONObject<T = string, K = any> {
    [key: string]: K;

}

export default class JSONObjectArgument<T = string, K = any> implements IJSONObject {
    [key: string]: K;
}
