import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
    service: 'serverless-aws-nodejs-typescript',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-localstack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs16.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    // import the function via paths
    functions: {
        ping: {
            handler: './src/index.ping',
            events: [
                {
                    http: {
                        method: 'GET',
                        path: '/api/v1/ping',
                    },
                },
            ],
        },
    },
    package: { individually: true },
    custom: {
        localstack: {
            stages: ['dev'],
            edgePort: 4566,
            autostart: false,
            lambda: {
                mountCode: true,
            },
        },
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node16',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
}

module.exports = serverlessConfiguration
