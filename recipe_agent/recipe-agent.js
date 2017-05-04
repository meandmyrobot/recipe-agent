'use strict';

// Constants
const RecipeRecommendationFulfillment = require('./recipe-recommendation-fulfillment');
const RECIPE_RECOMMENDATION_INTENT = 'recipe.recommendation';

/**
 * Constructor for RecipeAgent object
 * Maps the actions from Google to fulfillment handlers
 *
 * @param {Object} assistant Instance of 'actions-on-google' assistant.
 */
const RecipeAgent = class {
    constructor (assistant) {

        /**
         * Save a reference to the 'actions-on-google' assistant.
         * @type {Object}
         */
        this.assistant = assistant;
    }

    /**
     * Creates fulfillment handler from action and executes.
     * @return {void}
     */
    broadcastResponseFromIntent () {
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