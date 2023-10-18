//Code inspiré de: https://web3.kerzo.ca/projet_complet_mongoose/

import mongoose, { Schema, model, Date, ObjectId } from 'mongoose';

export interface IRestaurantsCommentairePublic{
  commentaire: string,
  note: number
}

export interface IRestaurants {
  _id: ObjectId;
  nom: string;
  description: string;
  emplacement: string;
  commentaire_de_Gordon: string;
  note_de_Gordon: number;
  note_public: number;
  nombre_insultes: number;
  date_de_visite: Date;
  emission_censurer: boolean
  cuisinier: string[];
  commentaire_public: IRestaurantsCommentairePublic[]
  DescriptionPourEmission: string
  ResumeEmission: string
}

const notEmpty = (array: any[]) => {
  if(array.length ===0)
  {
    return false
  }
  else
  {
    return true
  }
}


const RestaurantsSchema = new Schema<IRestaurants>({
  nom: {type:String,
    required:[true, "Le nom est obligatoire !"],
    minlength:[2,"Le nom doit être d'aux moins 2 caractères !"],
    maxlength:[100,"Le nom doit être inférieur à 100 caractères !"]},

  description: {type: String,
  //Validation ci-dessous inspiré de:
  //https://mongoosejs.com/docs/validation.html#custom-validators
  validate: {
    validator: function (description:string) {
      //Regex de: https://chat.openai.com/
      return /^[A-ZÀ-ÖØ-Þ][^\n.]*\.(\s+[A-ZÀ-ÖØ-Þ][^\n.]*)*\s*\.*$/.test(description);
    }, message: 'Toutes les phrases doivent commencer par une majuscule et finir par un point !',
  }},

  emplacement: {type: String,
    required:[true, "L'emplacement du restaurant est obligatoire !"],
    minlength:[2,"L'emplacement du restaurant doit être d'aux moins 10 caractères !"],
    maxlength:[200,"L'emplacement du restaurant être inférieur à 200 caractères !"]},

  commentaire_de_Gordon: {type: String,
    required:[true, "Le commentaire de Gordon est obligatoire !"],
    maxlength:[500,"Le commentaire de Gordon doit être inférieur à 500 caractères !"],
    validate: {
      validator: function (commentaire:string) {
        //Regex de: https://chat.openai.com/
        return /^[^\d]*$/.test(commentaire);
      }, message:'Le commentaire de Gordon ne peut pas contenir de chiffre. Si vous voulez inscrire un nombre, écrivé le en lettres !',
    },},

  note_de_Gordon: {type:Number,
    required:[true, "La note de Gordon est obligatoire !"],
    min:[1,"La note de Gordon ne peut pas être inférieur à 1 !"],
    max:[10,"La note de Gordon ne peut pas dépasser 10 !"]},

  note_public: {type:Number,
    min:[1,"La note du public doit être positif !"],
    max:[10,"La note du public ne peut pas dépasser 10 !"]},

  nombre_insultes :{type:Number,
    min:[0, "Le nombre d'insulte que Gordon à dit, ne peut pas être inférieur à 0 !"]},

  date_de_visite: {type: Date,
    required:[true,"La date de visite est obligatoire !"],
    max:['2023-12-31',"La date de visite ne peut pas dépasser le 2023/12/31 !"],
    min:['1966-11-8', "La date de visite ne peut pas être inférieur à 1966/11/08 !"]},

  emission_censurer: {type:Boolean},

    //Validation ci-dessous inspiré de:
    //https://mongoosejs.com/docs/validation.html#custom-validators
    //Regex de: https://chat.openai.com/
  cuisinier: { type: [String],
    validate:[notEmpty,"Il doit minimalement y avoir un cuisinier !"]
    },

  commentaire_public: {
    type:[
      {
        commentaire:{type:String,
          required:[true,"Un commentaire est obligatoire !"],
          maxlength:[250, "Le commentaire ne peut pas dépasser 250 caractères !"],
        },
          

        note:{type:Number,
          required:[true,"Une note est obligatoire !"],
          min:[1, "La note ne peut pas être inférieur à 1 !"],
          max:[10, "La note ne peut pas dépasser 10 !"]
        },
      },
  ],
  },
}
)

//Permet de retourner le résumé de l'émission
RestaurantsSchema.virtual('ResumeEmission').
get(function() {
  return "Gordon Ramsay a dit " + this.nombre_insultes +
  " insultes. Son commentaire est " + this.commentaire_de_Gordon + 
  " et sa note est " + this.note_de_Gordon
})

//Permet de retourner la description de l'émission
RestaurantsSchema.virtual('DescriptionPourEmission').
get(function() {
  let censurer

  if(this.emission_censurer!=false)
  {
    censurer = "Cette émission contient un language vulgaire, la discrétion des téléspectateurs est avertie !"
  }

  return "Dans l'émission d'aujourd'hui, Gordon Ramsey visite " + 
    this.nom + " situé à " + this.emplacement + " . \n " + censurer
})

mongoose.pluralize(null);
export default model<IRestaurants>('Restaurants', RestaurantsSchema);