//Code inspiré de: https://web3.kerzo.ca/projet_complet_mongoose/

import { Router, NextFunction, Request, Response } from 'express';
import jetValidator from 'jet-validator';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import Paths from '../constants/Paths';
import Restaurant from '@src/models/Restaurants';
import RestaurantRoutes from './RestaurantsRoutes';


// **** Variables **** //
const apiRouter = Router(),
validate = jetValidator();

// **** Fonctions **** //
function validateRestaurant(req:Request, res:Response, next:NextFunction)
{
    const nouveauRestaurant = new Restaurant(req.body.restaurant)
    const error = nouveauRestaurant.validateSync()
    if(error !== null && error !== undefined)
    {
        res.status(HttpStatusCodes.BAD_REQUEST).send(error).end()
    }
    else{
        next()
    }

}

// Sort tous les restaurants
apiRouter.get(
  Paths.Restaurants.GetAll,
  RestaurantRoutes.getAll,
);

// Sort un restaurant par un id
apiRouter.get(
  Paths.Restaurants.GetById,
  RestaurantRoutes.getById,
);

//Sort tous les restaurants qui sont censurés ou non
apiRouter.get(
  Paths.Restaurants.GetByCensure,
  RestaurantRoutes.getByCensure,
);

//Sort tous les restaurants selon la note de Gordon
apiRouter.get(
  Paths.Restaurants.GetByGordonNote,
  RestaurantRoutes.getByGordonNote,
);

//Retourne le nombre d'insulte total de tous les restaurants
apiRouter.get(
  Paths.Restaurants.GetNombreInsulteTotal,
  RestaurantRoutes.getNombreInsulteTotal,
)

//Retourne la note moyenne de Gordon Ramsay de tous les restaurants
apiRouter.get(
  Paths.Restaurants.GetMoyenneTotalGordon,
  RestaurantRoutes.getNoteMoyenneGordon,
)

//Ajoute un restaurant
apiRouter.post(
  Paths.Restaurants.Add, validateRestaurant,
  RestaurantRoutes.add,
);

//Modifie un restaurant
apiRouter.put(
  Paths.Restaurants.Update, validateRestaurant,
  RestaurantRoutes.update,
);

//Supprime un restaurant par son id
apiRouter.delete(
  Paths.Restaurants.Delete,
  validate(['id', 'string', 'params']),
  RestaurantRoutes.delete
);

//AJOUTE ApiRouter
apiRouter.use(Paths.Restaurants.Base, apiRouter);

// **** Exporte default **** //
export default apiRouter;
