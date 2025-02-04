// namespace App {
// autobind decorator - called on class method needing to bind this keyword to below to get access to class itself (target), its methods (methodName) and properties (descriptor).
export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // descriptor.value = provides access to method used in class
  const orginalMethod = descriptor.value;
  const adjDescripto: PropertyDescriptor = {
    configurable: true,
    // creates getter method to bind this key word to method used in class
    get() {
      const boundFn = orginalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescripto;
}
// }
