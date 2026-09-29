import type { NextConfig } from "next";

// STATIC_EXPORT=1 — статическая копия сайта для зеркала на российском хостинге
// (andrey-yunev.ru, reg.ru): см. scripts/deploy_ru.py. Сборка на Vercel идёт как раньше.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isExport
  ? {
      output: "export",
      // на обычном хостинге нет сервера оптимизации картинок
      images: { unoptimized: true },
      // /cinema -> cinema/index.html: Apache отдаёт такие адреса без правил перезаписи
      trailingSlash: true,
    }
  : {};

export default nextConfig;
