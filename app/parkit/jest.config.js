module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub",
    
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
  //testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  modulePaths: [
    "<rootDir>"
  ],
  setupFiles: [
    "./__test__/setup.ts"
  ]
}
