module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    maxWorkers: 1,
    testEnvironment: 'node',
    testRegex: '/tests/unit/.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
      '^tests/(.*)$': '<rootDir>/tests/$1',
    },
  };