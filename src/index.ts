import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import { connect } from 'mongoose';
import server from './server';
import http  from 'http';


// **** Run **** //
const SERVER_START_MSG =
  //'Express server started on port: ' + process.env.PORT.toString();
    server.listen(process.env.PORT, () => {
      console.log('Serveur écoute sur le port ' + process.env.PORT);
      logger.info(SERVER_START_MSG);
    });
    console.log('Connecté MongoDB');
   

