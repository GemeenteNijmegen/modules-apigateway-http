const { GemeenteNijmegenTsPackage } = require('@gemeentenijmegen/projen-project-type');

const projectName = '@gemeentenijmegen/apigateway-http';

const project = new GemeenteNijmegenTsPackage({
  defaultReleaseBranch: 'main',
  name: projectName,
  repository: 'https://github.com/GemeenteNijmegen/modules-apigateway-http.git',
  defaultReleaseBranch: 'main',
  license: 'EUPL-1.2',
  depsUpgradeOptions: {
    workflowOptions: {
      branches: ['main'], // No acceptance branche available
    },
  },
  deps: [
    '@types/aws-lambda',
  ],
  devDeps: [
    '@gemeentenijmegen/projen-project-type',
  ],
  packageName: projectName,
  enableAutoMergeDependencies: false, // We only have a main branche that requires reviewing so we cannot auto-upgrade
});
project.synth();