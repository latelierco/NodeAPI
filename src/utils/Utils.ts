import config from '../config/config';

export default {
  log: (stringToShow: string) => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}: ${stringToShow}`,
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  getTokenKey: () => process.env.secret as string || config.secret,
  getMONGO_URI: () => process.env.MONGODB_URI as string || config.database,
  getApiUrl: () => process.env.apiUrl as string || config.api_url,
  getPort: () => process.env.PORT as string || config.port,
  getDefaultUser: () => (process.env.defaultUser) ? JSON.parse(process.env.defaultUser as string) as object : config.defaultUser,
  formatData: (success: any, data: any) => {
    return { success, data };
  },
  app: null,
};