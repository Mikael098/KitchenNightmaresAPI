//Inspiré de : https://web3.kerzo.ca/netlify/

/**
 * Point d'entrée pour les fonctions de Netlify
 */

import app from "../src/server";

import dotenv from 'dotenv';

import serverless from 'serverless-http';

// *** Variables d'environnement ***

//dotenv.config();

// *** Le handler requis par Netlify **
export const handler = serverless(app);
