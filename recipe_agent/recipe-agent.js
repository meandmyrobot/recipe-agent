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

    getResponseFromIntent () {
        let intent = this.assistant.getIntent();
        let response = 'Nope';

        switch (intent) {
            case RECIPE_RECOMMENDATION_INTENT:
                response = this.provideRecipeRecommnedation();
            break;

            default:
                response = 'Sorry, I\'ve no idea what you\'re talking about';
        }

        return response;
    }

    provideRecipeRecommnedation () {
        let options = {
            cookingSpeed: this.assistant.getArgument(COOKING_SPEED_ARGUMENT),
            dishType: this.assistant.getArgument(DISH_TYPE_ARGUMENT),
            protein: this.assistant.getArgument(PROTEIN_ARGUMENT),
            temperature: this.assistant.getArgument(TEMPERATURE_ARGUMENT),
            vegetable: this.assistant.getArgument(VEGETABLE_ARGUMENT)
        };

        recipeRecommendationService = new RecipeRecommendationService();
        let recommendation = recipeRecommendationService.getRecommendation(options);

        return recommendation;
    }
};

module.exports = RecipeAgent;