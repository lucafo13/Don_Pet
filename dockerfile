FROM rust:1.75-bookworm
RUN curl -fsSL https://nodesource.com | bash - && \
    apt-get update && apt-get install -y \
    nodejs \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "tauri", "build"]
