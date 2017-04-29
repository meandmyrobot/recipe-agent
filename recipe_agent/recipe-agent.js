'use strict';

const RecipeRecommendationService = require('./recipe-recommendation-service');

const RECIPE_RECOMMENDATION_INTENT = 'recipe.recommendation';
const PROTEIN_ARGUMENT = 'protein';
const VEGETABLE_ARGUMENT = 'vegetable';
const TEMPERATURE_ARGUMENT = 'temperature';
const COOKING_SPEED_ARGUMENT = 'cooking-speed';
const DISH_TYPE_ARGUMENT = 'dish-type';

const RecipeAgent = class {
    constructor (assistant) {
        this.assistant = assistant;
    }

    getRecipeResponse () {
        let intent = this.assistant.getIntent();
        switch (intent) {
            case RECIPE_RECOMMENDATION_INTENT:
                this.provideRecipeRecommnedation();
            break;

            default:
                this.assistant.tell('Sorry, I\'ve no idea what you\'re talking about');
        }
    }

    provideRecipeRecommnedation () {
        let options = {
            cookingSpeed: assistant.getArgument(COOKING_SPEED_ARGUMENT),
            dishType: assistant.getArgument(DISH_TYPE_ARGUMENT),
            protein: assistant.getArgument(PROTEIN_ARGUMENT),
            temperature: assistant.getArgument(TEMPERATURE_ARGUMENT),
            vegetable: assistant.getArgument(VEGETABLE_ARGUMENT)
        };

        recipeRecommendationService = new RecipeRecommendationService();
        let recommendation = recipeRecommendationService.getRecommendation(options);
        this.assistant.tell(recommendation);
    }
};

module.exports = RecipeAgent;