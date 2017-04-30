'use strict';

const RecipeRecommendationFulfillment = require('./recipe-recommendation-fulfillment');
const RECIPE_RECOMMENDATION_INTENT = 'recipe.recommendation';

const RecipeAgent = class {
    constructor (assistant) {
        this.assistant = assistant;
    }

    returnResponseFromIntent () {
        let intent = this.assistant.getIntent();

        switch (intent) {
            case RECIPE_RECOMMENDATION_INTENT:
                {
                    let recipeRecommendationFulfillment = new RecipeRecommendationFulfillment(this.assistant);
                    recipeRecommendationFulfillment.provideRecommendation();
                }
                break;

            default:
                this.assistant.tell('Sorry, I\'ve no idea what you\'re talking about');
        }
    }
};

module.exports = RecipeAgent;