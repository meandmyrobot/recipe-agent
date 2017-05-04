'use strict';

// Constants
const config = require('../config');
const DeliveryClient = require('../kentico_cloud/delivery-client');
const PROTEIN_ARGUMENT = 'protein';
const VEGETABLE_ARGUMENT = 'vegetable';
const TEMPERATURE_ARGUMENT = 'temperature';
const COOKING_SPEED_ARGUMENT = 'cooking-speed';
const DISH_TYPE_ARGUMENT = 'dish-type';

/**
 * Constructor for RecipeRecommendationFulfillment object
 * Handles the fulfillment of the recipe recommendation intent
 *
 * @param {Object} assistant Instance of 'actions-on-google' assistant.
 */
const RecipeRecommendationFulfillment = class {
    constructor (assistant) {
        if (!assistant) {
            throw new Error('Actions on Google Assistant required to fulfill action.');
        }

        /**
         * Array of possible intros for when a single result is found.
         * @private
         * @type {Array}
         */
        this.singleResultIntro = [
            'How about ',
            'I found this recipe. ',
            'This looks good. How about ',
            'I think you\'d like '
        ];

        /**
         * Array of possible intros for when a multiple results are found.
         * @private
         * @type {Array}
         */
        this.multipleResultIntro = [
            'I found some recipes. Here\'s the info. ',
            'Hope you\'re hungry as I found some. First I have ',
            'It\'s always good to have options. Here\'s what I\'ve got. ',
            'I think you\'d like '
        ];

        /**
         * Array of possible intros for when no results are found.
         * @private
         * @type {Array}
         */
        this.noResultsMessage = [
            'Weird, I can\'t seem to find a recipe that matches.',
            'You should try a Google search. I can\'t a thing in here!',
            'Warning. Your inputs have inadvertently awoken SkyNet. The robot uprising begins now'
        ];

        /**
         * Save a reference to the 'actions-on-google' assistant.
         * @private
         * @type {Array}
         */
        this.assistant = assistant;

        /**
         * Options for the query that will be made for this intent.
         * @private
         * @type {Object}
         */
        this.options = {};

        // Build the query options based on the assistance arguments
        this.getQueryOptionsFromIntentArguments();
    }

    /**
     * Processes the client response.
     * The assistant call to tell returns the response to the device/app/bot.
     * @return {void}
     */
    provideRecommendation () {
        this.findRecipes().then((response) => {
            if (typeof response.items !== 'undefined' && response.items !== null && response.items.length > 0) {
                this.assistant.tell(this.getRecommendedRecipes(response.items));
            } else {
                this.assistant.tell(this.getRandomResponse(this.noResultsMessage));
            }
        }).
        catch((err) => {
            console.log(err);
            this.assistant.tell('Opps. We have a problem.');
        });
    }

    /**
     * Calls the client with the assistant arguments.
     * @return {Promise} Response from the client.
     */
    findRecipes () {
        this.options.elements = 'name,short_description';
        let client = new DeliveryClient({projectId: config.projectId});

        return client.getItems(this.options);
    }

    /**
     * Build the options from the assistant arguments.
     * @return {Object} Query parameters for the client.
     */
    getQueryOptionsFromIntentArguments () {
        this.setOption(this.options, 'elements.cooking_speed[contains]', this.assistant.getArgument(COOKING_SPEED_ARGUMENT));
        this.setOption(this.options, 'elements.dish_type[contains]', this.assistant.getArgument(DISH_TYPE_ARGUMENT));
        this.setOption(this.options, 'elements.protein[contains]', this.assistant.getArgument(PROTEIN_ARGUMENT));
        this.setOption(this.options, 'elements.temperature[contains]', this.assistant.getArgument(TEMPERATURE_ARGUMENT));
        this.setOption(this.options, 'elements.vegetable[contains]', this.assistant.getArgument(VEGETABLE_ARGUMENT));

        return this.options;
    }

    /**
     * Add a query to the options object is the argument has a value.
     * @param {Object} options The object we are adding query values to
     * @param {Object} param The param that will be added to the client call (part of the URL for filtering).
     * @param {Object} value The argument value from the client.
     * @return {void}
     */
    setOption (options, param, value) {
        if (value !== null && value !== undefined) {
            let valueToSave = value;
            if (typeof valueToSave === 'string') {
                valueToSave = valueToSave.toLowerCase();
            }
            options[param] = valueToSave;
        }
    }

    /**
     * Return a random response from our array of potential responses.
     * @param {Array} responses Array of potential response intros
     * @return {String} A random value from the array
     */
    getRandomResponse (responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Build a response for the user based on the client payload.
     * @param {Array} recipeData The json payload from the client
     * @return {String} The response that the assistant will tell the user.
     */
    getRecommendedRecipes (recipeData) {
        let recipeRecommendations = [];

        for (let recipe of recipeData) {
            recipeRecommendations.push(`${recipe.elements.name.value}. ${recipe.elements.short_description.value}.`);
        }

        if (recipeData.length > 1) {
            let recipes = recipeRecommendations.join('. Next I found ');

            return this.getRandomResponse(this.multipleResultIntro) + recipes;
        }

        return this.getRandomResponse(this.singleResultIntro) + recipeRecommendations[0];
    }
};

module.exports = RecipeRecommendationFulfillment;