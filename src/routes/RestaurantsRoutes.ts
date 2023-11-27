//Code inspiré de: https://web3.kerzo.ca/projet_complet_mongoose/

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import RestaurantService from '@src/services/RestaurantsService';
import { IRestaurants } from '@src/models/Restaurants';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Sort tous les restaurants
 */
async function getAll(req: IReq, res: IRes) {
  const restaurants = await RestaurantService.getAll();
  const descriptionPourEmission = req.params.DescriptionPourEmission

  return res.status(HttpStatusCodes.OK).json({ restaurants, descriptionPourEmission});
}

/**
* Sort un restaurant par son id
*/
async function getById(req: IReq, res: IRes) {
  const id = req.params.id;
  const restaurant = await RestaurantService.getById(id);

  return res.status(HttpStatusCodes.OK).json({ restaurant });
}

/**
 * Sort tous les restaurants qui sont censurés ou non
 */
async function getByCensure(req: IReq, res: IRes) {
  const censure = req.params.censure

  if(censure!= "true" && censure!= "false")
  {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'Le paramètre doit être true ou false'});
  }

  const restaurants = await RestaurantService.getByCensure(censure)

  return res.status(HttpStatusCodes.OK).json({ restaurants });
}

/**
 * Sort tous les restaurants selon la note de Gordon
 */
async function getByGordonNote(req: IReq, res: IRes) {
  const note_de_Gordon = parseInt(req.params.noteGordon)

  if(note_de_Gordon < 1 || note_de_Gordon > 10)
  {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'La note doit être un nombre entre 1 et 10'});
  }
  
  const restaurants = await RestaurantService.getByGordonNote(note_de_Gordon)

  return res.status(HttpStatusCodes.OK).json({ restaurants });
}

/**
 * Retourne le nombre d'insulte total de tous les restaurants
 */
async function getNombreInsulteTotal(req: IReq, res: IRes) {
  const nombreInsultes = await RestaurantService.getNombreInsulteTotal()

  return res.status(HttpStatusCodes.OK).json({ nombreInsultes })
}

/**
 * Retourne la note moyenne de Gordon Ramsay de tous les restaurants
 */
async function getNoteMoyenneGordon(req: IReq, res: IRes) {
  const moyenneGordon = await RestaurantService.getNoteMoyenneGordon()
  
  return res.status(HttpStatusCodes.OK).json({ moyenneGordon })
}

/**
 * Ajoute un restaurant
 */
async function add(req: IReq<{ restaurant: IRestaurants }>, res: IRes) {
  let { restaurant } = req.body;
  restaurant = await RestaurantService.add(restaurant);

  return res.status(HttpStatusCodes.CREATED).json({ restaurant });
}

/**
 * Modifie un restaurant
 */
async function update(req: IReq<{ restaurant: IRestaurants }>, res: IRes) {
  let { restaurant } = req.body;
  restaurant = await RestaurantService.update(restaurant);
  return res.status(HttpStatusCodes.OK).json({ restaurant });
}

/**
 * Supprime un restaurant par son id
 */
async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await RestaurantService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
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
