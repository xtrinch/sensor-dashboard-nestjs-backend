
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  rootDir: 'src',
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  moduleDirectories: [
    "node_modules", 
    "src"
  ],
  testTimeout: 30000,
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
};