interface IJSONObject<T = string, K = any> {
    [key: string]: K;
}

/**
 * Class implementing the `IJSONObject` interface.
 * Represents a JSON object where keys are strings and values can be of any type.
 * @template T - The type of the keys (default is `string`).
 * @template K - The type of the values (default is `any`).
 */
class JSONObjectArgument<T = string, K = any> implements IJSONObject {
    [key: string]: K;
}

export default JSONObjectArgument;
