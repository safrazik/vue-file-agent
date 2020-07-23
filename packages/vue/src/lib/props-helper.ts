class PropsHelper {
  createWatcher(props: any) {
    const propsWatch: any = {};
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        propsWatch[key] = function (value: any) {
          this?.propUpdated(key, value);
        };
      }
    }
    return propsWatch;
  }
  bindThis(propsWatch: any, thisValue: any) {
    for (const key in propsWatch) {
      if (propsWatch.hasOwnProperty(key)) {
        propsWatch[key].bind(thisValue);
      }
    }
  }
}

export default new PropsHelper();
