ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-alpine

# WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

COPY . .

RUN npm install

ARG REACT_APP_USER_SERVER_API
ENV REACT_APP_USER_SERVER_API=$REACT_APP_USER_SERVER_API

ARG REACT_APP_BUSINESS_SERVER_API
ENV REACT_APP_BUSINESS_SERVER_API=$REACT_APP_BUSINESS_SERVER_API

EXPOSE 3000

# USER node