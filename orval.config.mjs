import { defineConfig } from 'orval';
import transformer from './scripts/openapi-transformer.js';

export default defineConfig({
  zenbpm: {
    input: {
      target: './openapi/api.yaml',

      override: {
        transformer,
      },
    },
    output: {
      mode: 'tags-split',
      target: './src/base/openapi/generated-api',
      schemas: './src/base/openapi/generated-api/schemas',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/base/openapi/axios-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
        },
      },
    },
  },
});
