export function allSettled(
  promises: Promise<any>[]
): Promise<
  {
    state: 'fulfilled' | 'rejected';
    value?: any;
    reason?: any;
  }[]
> {
  let wrappedPromises = promises.map(p =>
    Promise.resolve(p).then(
      val => ({ state: 'fulfilled', value: val }),
      err => ({ state: 'rejected', reason: err })
    )
  );
  return Promise.all(wrappedPromises) as any;
}
