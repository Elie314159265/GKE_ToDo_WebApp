#===== ビルドステージ =====
FROM node:20-alpine AS builder
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ViteでReactアプリをビルド (成果物は /app/dist に生成される)
RUN npm run build

# ===== 本番ステージ =====
FROM nginx:1.27-alpine

# ビルドステージで生成された静的ファイルをNginxのドキュメントルートにコピー
# Viteの成果物ディレクトリ dist を指定
COPY --from=builder /app/dist /usr/share/nginx/html

# (任意) Nginxのカスタム設定
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
