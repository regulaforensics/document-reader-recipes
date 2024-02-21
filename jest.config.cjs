module.exports = {
  preset: 'ts-jest',
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/.*\\.(test|spec)?\\.(ts|tsx)$',
  setupFiles: ['dotenv/config'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
     "^@/(.*)": "<rootDir>/src/$1"
  }
}
