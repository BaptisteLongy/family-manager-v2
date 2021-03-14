# Rebuilding the pm2 image for ARM architecture
# FROM arm64v8/node:current
FROM node:current

# Install pm2
RUN npm install pm2@3 -g

WORKDIR /usr/family-manager

# Node dependencies / install
COPY package*.json ./
RUN npm install --production

ARG SHOPPING_LIST_ENDPOINT
ENV NEXT_PUBLIC_SHOPPING_LIST_BACK_END_ENDPOINT=$SHOPPING_LIST_ENDPOINT

# Bundle APP files
COPY ./ ./
RUN npm run build

CMD [ "pm2-runtime", "npm", "--", "start" ]