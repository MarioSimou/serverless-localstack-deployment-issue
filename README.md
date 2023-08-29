## Instructions

```bash
# Install node modules
pnpm i

# Run localstack container
docker compose up -d localstack

# Deploy to localstack
pnpm deploy:dev
```