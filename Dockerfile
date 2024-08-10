# Rebuilding the pm2 image for ARM architecture
FROM arm64v8/node:current-alpine
# FROM node:current

WORKDIR /usr/family-manager

# Node dependencies / install
COPY package*.json ./
RUN npm ci --production

ARG SHOPPING_LIST_ENDPOINT
ENV NEXT_PUBLIC_SHOPPING_LIST_BACK_END_ENDPOINT=$SHOPPING_LIST_ENDPOINT

# Bundle APP files
COPY ./ ./
RUN npm run build

CMD [ "npm", "run", "start" ]