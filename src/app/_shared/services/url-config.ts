interface UrlConfig {
  ProdUrlPrefix: string;
  DevUrlPrefix: string;
  localDevUrlPrefix: string;
}

export const URL_CONFIG: UrlConfig = {
  ProdUrlPrefix: 'https://JAWebAPI.jovenesadelante.org/',
  DevUrlPrefix: 'https://JAWebAPI-dev.jovenesadelante.org/',
  localDevUrlPrefix:  'http://192.168.0.19:1099/' //  'http://192.168.1.133:1099/' // 'http://192.168.43.98:1099/' //  'http://192.168.1.133:1099/'
};
