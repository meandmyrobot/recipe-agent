'use strict';

const config = require('../config');
const DeliveryClient = require('../kentico_cloud/delivery-client');

const PROTEIN_ARGUMENT = 'protein';
const VEGETABLE_ARGUMENT = 'vegetable';
const TEMPERATURE_ARGUMENT = 'temperature';
const COOKING_SPEED_ARGUMENT = 'cooking-speed';
const DISH_TYPE_ARGUMENT = 'dish-type';

const RecipeRecommendationFulfillment = class {
    constructor (assistant) {
        if (!assistant) {
            throw new Error('Actions on Google Assistant required to fulfill action.');
        }

        this.singleResultIntro = [
            'How about ',
            'I found this recipe. ',
            'This looks good. How about ',
            'I think you\'d like '
        ];

        this.multipleResultIntro = [
            'I found some recipes. Here\'s the info. ',
            'Hope you\'re hungry as I found some. First I have ',
            'It\'s always good to have options. Here\'s what I\'ve got. ',
            'I think you\'d like '
        ];

        this.noResultsMessage = [
            'Weird, I can\'t seem to find a recipe that matches.',
            'You should try a Google search. I can\'t a thing in here!',
            'Warning. Your inputs have inadvertently awoken SkyNet. The robot uprising begins now'
        ];

        this.assistant = assistant;
        this.options = {};
        this.getQueryOptionsFromIntentArguments();
    }

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

    findRecipes () {
        this.options.elements = 'name,short_description';
        let client = new DeliveryClient({projectId: config.projectId});

        return client.getItems(this.options);
    }

    getQueryOptionsFromIntentArguments () {
        this.setOption(this.options, 'elements.cooking_speed[contains]', this.assistant.getArgument(COOKING_SPEED_ARGUMENT));
        this.setOption(this.options, 'elements.dish_type[contains]', this.assistant.getArgument(DISH_TYPE_ARGUMENT));
        this.setOption(this.options, 'elements.protein[contains]', this.assistant.getArgument(PROTEIN_ARGUMENT));
        this.setOption(this.options, 'elements.temperature[contains]', this.assistant.getArgument(TEMPERATURE_ARGUMENT));
        this.setOption(this.options, 'elements.vegetable[contains]', this.assistant.getArgument(VEGETABLE_ARGUMENT));

        return this.options;
    }

    setOption (options, param, value) {
        if (value !== null && value !== undefined) {
            let valueToSave = value;
            if (typeof valueToSave === 'string') {
                valueToSave = valueToSave.toLowerCase();
            }
            options[param] = valueToSave;
        }
    }

    getRandomResponse (responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

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