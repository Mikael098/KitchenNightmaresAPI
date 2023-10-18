//Code inspiré de: https://web3.kerzo.ca/projet_complet_mongoose/

import RestaurantRepo from '@src/repos/RestaurantsRepo';
import { IRestaurants } from '@src/models/Restaurants';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from '@src/routes/types/express/misc';
import { NextFunction } from 'express';


// **** Variables **** //

export const RESTAURANT_NOT_FOUND_ERR = 'Restaurant non trouvé';


// **** Functions **** //

/**
 * Sort tous les restaurants.
 */
function getAll(): Promise<IRestaurants[]> {
  return RestaurantRepo.getAll();
}

/**
 * Sort un restaurant par son id
 */
async function getById(id: string): Promise<IRestaurants | null> {
  const persists = await RestaurantRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND,
      RESTAURANT_NOT_FOUND_ERR,
    );
  }

  return RestaurantRepo.getById(id);
}

/**
 * Sort tous les restaurants qui sont censurés ou non
 */
function getByCensure(censure: string): Promise<IRestaurants[]>
{
  return RestaurantRepo.getByCensure(censure);
}

/**
 * Sort tous les restaurants selon la note de Gordon
 */
function getByGordonNote(note_de_Gordon: number): Promise<IRestaurants[]>
{ 
  return RestaurantRepo.getByGordonNote(note_de_Gordon);
}

/**
 * Retourne le nombre d'insulte total de tous les restaurants
 */
function getNombreInsulteTotal():Promise<number>
{
  return RestaurantRepo.getNombreInsulteTotal();
}


/**
 * Retourne la note moyenne de Gordon Ramsay de tous les restaurants
 */
function getNoteMoyenneGordon():Promise<number>
{
  return RestaurantRepo.getNoteMoyenneGordon();
}


/**
 * Ajoute un restaurant
 */
function add(restaurant: IRestaurants): Promise<IRestaurants> {
  return RestaurantRepo.add(restaurant);
}

/**
 * Modifie un restaurant
 */
async function update(restaurant: IRestaurants): Promise<IRestaurants> {
  const idString = restaurant._id


  const persists = await RestaurantRepo.persists(idString.toString()!);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, RESTAURANT_NOT_FOUND_ERR);
  }
  return RestaurantRepo.update(restaurant);
}

/**
 * Supprime un restaurant par son id
 */
async function delete_(id: string): Promise<void | null> {
  const persists = await RestaurantRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, RESTAURANT_NOT_FOUND_ERR);
  }

  return RestaurantRepo.delete(id);
}



// **** Export default **** //
export default {
  getAll,
  getById,
  getByCensure,
  getByGordonNote,
  getNombreInsulteTotal,
  getNoteMoyenneGordon,
  add,
  update,
  delete: delete_,
  //genererToken,
} as const;
