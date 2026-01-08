Dev-port 4000
pm2 start "npm run dev" --name targetpeak-dev

Staging-port 4001
pm2 start "npx vite --mode staging" --name targetpeak-stage

Production preview-port 4002
pm2 start "npx vite preview --mode production" --name targetpeak-prod


Check status:

pm2 list