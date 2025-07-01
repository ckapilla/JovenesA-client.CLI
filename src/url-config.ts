interface UrlConfig {
  ProdUrlPrefix: string;
  DevUrlPrefix: string;
  localDevUrlPrefix: string;
}

export const URL_CONFIG: UrlConfig = {
  ProdUrlPrefix: 'https://JAWebAPI.jovenesadelante.org/',
  DevUrlPrefix: 'https://JAWebAPI-dev.jovenesadelante.org/',
  ///******CHECK using ipconfig in command window to get the correct address ***********/
  localDevUrlPrefix: 'http://192.168.1.15:1099/' // use http (not https) and provide 1099 port number for local dev
  // localDevUrlPrefix: 'https://JAWebAPI-dev.jovenesadelante.org/'
  // localDevUrlPrefix: 'https://JAWebAPI.jovenesadelante.org/'

};
