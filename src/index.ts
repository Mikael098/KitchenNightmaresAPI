import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import { connect } from 'mongoose';
import EnvVars from './constants/EnvVars';
import server from './server';
import http  from 'http';


// **** Run **** //
/*const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();

  connect(EnvVars.MONGODB_URI!)
  .then(() => {
    server.listen(EnvVars.Port, () => {
      console.log('Serveur écoute sur le port ' + EnvVars.Port);
      logger.info(SERVER_START_MSG);
    });
    console.log('Connecté MongoDB');
  })
  .catch((err) => {
    console.log('Erreur connection MongoDB:', err);
    logger.err(err, true);
  });*/

