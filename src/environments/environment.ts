import 'angular-server-side-configuration/process';

export const environment = {
  production: process.env['PROD'] !== 'false',
  API_ARTICLE_URL: process.env['API_ARTICLE_URL'] ?? 'https://back.leltoncrazy.com'
};
