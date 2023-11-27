//Code inspiré de: https://web3.kerzo.ca/projet_complet_mongoose/

/**
 * Les chemins d'accès à mes routes
 */
export default {
  Base: '/',
  Restaurants: {
    Base: '/KitchenNightmares',
    Documentation: '/',
    GetAll: '/tout',
    GetById: '/id/:id',
    GetByCensure: '/censure/:censure',
    GetByGordonNote: '/noteGordon/:noteGordon',
    GetNombreInsulteTotal: '/insulteTotal',
    GetMoyenneTotalGordon: '/moyenneGordon',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
