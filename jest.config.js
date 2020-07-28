
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  rootDir: 'src',
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: [
    "node_modules", 
    "src"
  ],
  testTimeout: 30000
};