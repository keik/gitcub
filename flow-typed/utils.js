// for return value type of async function
// https://github.com/facebook/flow/issues/6058#issuecomment-377152455
declare type $UnwrapPromise<T> = $Call<<T>(Promise<T>) => T, T>

// for combined reducers type
// https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
declare type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V

// Flux Standard Action
// https://github.com/redux-utilities/flux-standard-action
declare type StandardActionT<T, P> =
  | {|
      type: T,
      payload: P,
      error?: false,
      meta?: mixed
    |}
  | {|
      type: T,
      payload: Error,
      error: true,
      meta?: mixed
    |}
