import config from '../config/config';

export default {
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  hash: () => {
    return null;
  },
  decryptHash: () => {
    return null;
  },
  getTokenKey: () => config.secret,
  getMONGO_URI: () => process.env.MONGODB_URI as string || config.database,
  app: null,
};