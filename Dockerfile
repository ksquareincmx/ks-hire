FROM kshire-webui:builder as builder

ARG REACT_APP_API_URL
ARG REACT_APP_LOGROCKET_ID

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_LOGROCKET_ID=$REACT_APP_LOGROCKET_ID

RUN yarn run build

FROM nginx:mainline

COPY --from=builder /workspace/build/ /app
COPY config/nginx /etc/nginx/conf.d/default.conf
