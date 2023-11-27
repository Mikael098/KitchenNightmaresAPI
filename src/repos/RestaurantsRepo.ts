//Code inspiré de: https://web3.kerzo.ca/projet_complet_mongoose/

import Restaurants, { IRestaurants } from '@src/models/Restaurants';
import mongoose, { Schema } from 'mongoose';
import { json } from 'stream/consumers';

// **** Functions **** //
async function persists(id:string):Promise<boolean>
{
  return (await Restaurants.findById(id)) !== null
}

/*
 * Sort tous les restaurants
 */
async function getAll(): Promise<IRestaurants[]> {

  const restaurants = Restaurants.find();

  if(restaurants == null)
  {
    throw new Error('Aucun restaurants trouvés')
  }

  return restaurants;
}

/**
 * Sort un restaurant par son id
 */
async function getById(id: string): Promise<IRestaurants | null> {

  const restaurant = await Restaurants.findById(id)
  
  if(restaurant == null)
  {
    throw new Error('Restaurant non trouvé')
  }

  //Appelle de mes deux fonctions virtuals
  const restaurantVirtual = restaurant.toObject();
  restaurantVirtual.DescriptionPourEmission = restaurant.DescriptionPourEmission;
  restaurantVirtual.ResumeEmission = restaurant.ResumeEmission;

  return restaurantVirtual
}

/**
 * Filtre
 * Sort tous les restaurants qui sont censurés ou non
 */
async function getByCensure(censure: string): Promise<IRestaurants[]> {

  if(censure!= "true" && censure!= "false")
  {
    throw new Error('Le paramètre doit être soit à true ou à false')
  }

  const restaurant = Restaurants.find({emission_censurer:censure})

  return restaurant
}

/**
 * Filtre
 * Sort tous les restaurants selon la note de Gordon
 */
async function getByGordonNote(note_de_Gordon: number): Promise<IRestaurants[]> {
  if(note_de_Gordon< 1 && note_de_Gordon> 10)
  {
    throw new Error('La note doit être entre 1 et 10')
  }

  const restaurant = Restaurants.find({note_de_Gordon:note_de_Gordon})

  return restaurant
}

/**
 * Stat
 * Retourne le nombre d'insulte total de tous les restaurants
 */
async function getNombreInsulteTotal(): Promise<number> {
  const restaurants = await Restaurants.find();
  const totalInsultes = restaurants.reduce(
    (total, { nombre_insultes = 0 }) =>
    total + nombre_insultes, 0
  );
  
  return totalInsultes;
}

/**
 * Stat
 * Retourne la note moyenne de Gordon Ramsay de tous les restaurants
 */
async function getNoteMoyenneGordon(): Promise<number> {
  const restaurants = await Restaurants.find();

  if (restaurants.length > 0) {

    const totalNotesGordon = restaurants.reduce(
      (total, { note_de_Gordon = 0 }) =>
      total + note_de_Gordon, 0
    );

    const moyenneGordon = totalNotesGordon / restaurants.length;

    return parseFloat(moyenneGordon.toFixed(2));
  }

  return 0;
}

/*
 * Ajoute un restaurant
 */
async function add(restaurant: IRestaurants): Promise<IRestaurants> {
  const nouveauRestaurant = new Restaurants(restaurant);
  await nouveauRestaurant.save();
  return nouveauRestaurant;
}

/*
 * Modifie un restaurant
 */
async function update(restaurant: IRestaurants): Promise<IRestaurants> {
  const restaurantUpdate = await Restaurants.findById(restaurant._id);
  if (restaurantUpdate === null) {
    throw new Error('Restaurant non trouvé');
  }
  restaurantUpdate.nom = restaurant.nom
  restaurantUpdate.description = restaurant.description
  restaurantUpdate.emplacement = restaurant.emplacement
  restaurantUpdate.commentaire_de_Gordon = restaurant.commentaire_de_Gordon
  restaurantUpdate.note_de_Gordon = restaurant.note_de_Gordon
  restaurantUpdate.note_public = restaurant.note_public
  restaurantUpdate.nombre_insultes = restaurant.nombre_insultes
  restaurantUpdate.date_de_visite = restaurant.date_de_visite
  restaurantUpdate.emission_censurer = restaurant.emission_censurer
  restaurantUpdate.cuisinier = restaurant.cuisinier
  restaurantUpdate.commentaire_public = restaurant.commentaire_public

  await restaurantUpdate.save();
  return restaurantUpdate;
}

/**
 * Supprime un restaurant par son id.
 */
async function delete_(id: string): Promise<void | null> {
  const restaurant = await Restaurants.findByIdAndDelete(id);

  if(restaurant == null)
  {
    throw new Error('Restaurant non trouvé')
  }
}

// **** Export default **** //
export default {
  persists,
  getAll,
  getById,
  getByCensure,
  getByGordonNote,
  getNombreInsulteTotal,
  getNoteMoyenneGordon,
  add,
  update,
  delete: delete_,
} as const;