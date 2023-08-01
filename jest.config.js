const nextJest = require("next/jest");

process.env.TZ = "UTC";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    /* '^equipo-10/features/(.*)$': '<rootDir>/features/$1', */
    "^@/service/(.*)$": "<rootDir>/src/service/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/test/(.*)$": "<rootDir>/src/test/$1",
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    "^@/helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@/shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@/shared/items/(.*)$": "<rootDir>/src/shared/items/$1",
    "^@/shared/items/MetadataHead$":
      "<rootDir>/src/shared/items/MetadataHead.tsx",
    "^@/shared/styled/Register$": "<rootDir>/src/shared/styled/Register.tsx",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    modulePaths: ["<rootDir>"],
  }, 
  silent: true,
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.ts",
    "src/components/**/*.tsx",
    "!src/components/**/*.stories.tsx",
    "src/features/**/*.ts",
    "src/features/**/*.tsx",
    "src/pages/**/*.route.ts",
    "src/pages/**/*.page.tsx",
    "src/services/**/*.ts",
    "!src/pages/_app.page.tsx",
    "!src/pages/api/*",
    "!src/pages/_document.page.tsx",
    "!src/**/*.test.tsx",
    "!src/**/*.spec.tsx",
    "!src/components/constants/mongo-config.ts"
  ],

  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
