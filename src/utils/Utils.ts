import validator = require('validator');
import config from '../config/Index';

export default {
  log: (stringToShow: string) => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}: ${stringToShow}`,
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  getTokenKey: () => process.env.secret as string || config.secret,
  getMONGO_URI: () => process.env.MONGODB_URI as string || config.database,
  getApiUrl: () => process.env.apiUrl as string || config.api_url,
  getPort: () => process.env.PORT as string || config.port,
  getDefaultUser: () => (process.env.defaultUser) ? JSON.parse(process.env.defaultUser as string) as object : config.defaultUser,
  formatData: (success: any, data: any) => {
    if (data && data[0] && data[0].password) {
      return {
        data: data.map((user: any) => {
          const userToSend = user;
          user.password = undefined;
          return userToSend;
        }),
        success
      };
    }
    return { success, data };
  },
  verifyBody: (req: any) => {
    if (
      req.body.firstName && !validator.isAlphanumeric(req.body.firstName)
      || req.body.lastName && !validator.isAlphanumeric(req.body.lastName)
      || req.body.username && !validator.isAlphanumeric(req.body.username)
      || req.body.email && !validator.isEmail(req.body.email)
      || req.body.password && !validator.isAlphanumeric(req.body.password)
    ) {
      return false;
    }
    return true;
  },
  app: null,
};