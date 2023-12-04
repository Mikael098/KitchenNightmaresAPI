import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import { connect } from 'mongoose';
import EnvVars from './constants/EnvVars';
import server from './server';
import http  from 'http';


// **** Run **** //
const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();
    server.listen(EnvVars.Port, () => {
      console.log('Serveur écoute sur le port ' + EnvVars.Port);
      logger.info(SERVER_START_MSG);
    });
    console.log('Connecté MongoDB');
   

