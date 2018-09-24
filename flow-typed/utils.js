// for return value type of async function
// https://github.com/facebook/flow/issues/6058#issuecomment-377152455
declare type $UnwrapPromise<T> = $Call<<T>(Promise<T>) => T, T>;

// for combined reducers type
// https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
declare type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
