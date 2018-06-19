import config from '../config/config';

export default {
  log: (stringToShow: string) => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}: ${stringToShow}`,
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  getTokenKey: () => config.secret,
  getMONGO_URI: () => process.env.MONGODB_URI as string || config.database,
  app: null,
};