#!/bin/sh
export DATABASE_URL="file:./test.db";

npx prisma generate
npx prisma migrate deploy
node ./node_modules/jest/bin/jest.js \
    --config=jest.config.integration.json \
    --silent \
    --detectOpenHandles \
    --forceExit \
    --setupFilesAfterEnv="<rootDir>/tests/integration/setup/index.ts"

JEST_EXIT_CODE=$?

exit $JEST_EXIT_CODE
