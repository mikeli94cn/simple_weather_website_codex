FROM debian:13-slim

RUN printf 'Acquire::http::Timeout "20";\nAcquire::https::Timeout "20";\nAcquire::Retries "2";\n' \
        > /etc/apt/apt.conf.d/99docker-network \
    && timeout --kill-after=10s 180s apt-get update -o APT::Update::Error-Mode=any \
    && timeout --kill-after=10s 180s apt-get install -y --no-install-recommends nginx curl \
    && rm /etc/apt/apt.conf.d/99docker-network \
    && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html style.css script.js /srv/daylight/

USER www-data
EXPOSE 80
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s \
    CMD ["curl", "--fail", "--silent", "--max-time", "2", "--output", "/dev/null", "http://127.0.0.1:80/"]
CMD ["nginx", "-g", "daemon off;"]
