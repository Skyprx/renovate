import { detectMonorepos } from './monorepo';

describe('manager/npm/extract', () => {
  describe('.extractPackageFile()', () => {
    it('uses lerna package settings', () => {
      const packageFiles = [
        {
          packageFile: 'package.json',
          lernaDir: '.',
          lernaPackages: ['packages/*'],
        },
        {
          packageFile: 'packages/a/package.json',
          packageJsonName: '@org/a',
        },
        {
          packageFile: 'packages/b/package.json',
          packageJsonName: '@org/b',
        },
      ];
      detectMonorepos(packageFiles);
      expect(packageFiles).toMatchSnapshot();
      expect(packageFiles[1].lernaDir).toEqual('.');
      expect((packageFiles[1] as any).internalPackages).toEqual(['@org/b']);
    });
    it('uses yarn workspaces package settings with lerna', () => {
      const packageFiles = [
        {
          packageFile: 'package.json',
          lernaDir: '.',
          lernaPackages: ['oldpackages/*'],
          lernaClient: 'yarn',
          yarnWorkspacesPackages: ['packages/*'],
        },
        {
          packageFile: 'packages/a/package.json',
          packageJsonName: '@org/a',
        },
        {
          packageFile: 'packages/b/package.json',
          packageJsonName: '@org/b',
        },
      ];
      detectMonorepos(packageFiles);
      expect(packageFiles).toMatchSnapshot();
      expect(packageFiles[1].lernaDir).toEqual('.');
      expect((packageFiles[1] as any).internalPackages).toEqual(['@org/b']);
    });
    it('uses yarn workspaces package settings without lerna', () => {
      const packageFiles = [
        {
          packageFile: 'package.json',
          yarnWorkspacesPackages: 'packages/*',
        },
        {
          packageFile: 'packages/a/package.json',
          packageJsonName: '@org/a',
          yarnLock: 'yarn.lock',
        },
        {
          packageFile: 'packages/b/package.json',
          packageJsonName: '@org/b',
        },
      ];
      detectMonorepos(packageFiles);
      expect(packageFiles).toMatchSnapshot();
      expect((packageFiles[1] as any).internalPackages).toEqual(['@org/b']);
    });
  });
});
