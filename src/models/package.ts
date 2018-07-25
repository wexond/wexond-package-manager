export default interface Package {
  name: string;
  main: string;
  version: string;
  description: string;
  namespace: string;
  dependencies: {
    [key: string]: string;
  };
} // eslint-disable-line
