interface UrlConfig {
  ProdUrlPrefix: string;
  DevUrlPrefix: string;
  localDevUrlPrefix: string;
}

export const URL_CONFIG: UrlConfig = {
  ProdUrlPrefix: 'https://JAWebAPI.jovenesadelante.org/',
  DevUrlPrefix: 'https://JAWebAPI-dev.jovenesadelante.org/',
  localDevUrlPrefix: 'http://192.168.0.15:1099/'
  // localDevUrlPrefix: 'https://JAWebAPI-dev.jovenesadelante.org/'
  // localDevUrlPrefix: 'https://JAWebAPI.jovenesadelante.org/'

};
