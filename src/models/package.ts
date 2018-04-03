export default interface Package {
  name: string;
  main: string;
  version: string;
  description: string;
  namespace: string;
  path: string;
  packageRepo: string;
  package: object;
}; // eslint-disable-line
