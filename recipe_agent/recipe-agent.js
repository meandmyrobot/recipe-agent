'use strict';

const config = require('../config');
const DeliveryClient = require('../kentico_cloud/delivery-client');

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

    returnResponseFromIntent () {
        let intent = this.assistant.getIntent();

        switch (intent) {
            case RECIPE_RECOMMENDATION_INTENT:
                let options = this.getOptionsFromArguments();
                this.findRecipes(options).then((response) => {
                    console.log(response);
                    if (response.items[0].elements.name.value !== undefined) {
                        let recipeMessage = this.getRecommendationIntro() + response.items[0].elements.name.value;
                        this.tell(recipeMessage);
                    }
                    else {
                        this.tell(this.getApology());
                    }
                }).catch( (err) => {
                    console.log(err);
                    this.tell('Opps. We have a problem.');
                });
            break;

            default:
                this.tell('Sorry, I\'ve no idea what you\'re talking about');
        }
    }

    findRecipes (options) {
        options.elements = 'name,short_description';
        let client = new DeliveryClient({projectId: config.projectId});
        return client.getItems(options);
    }

    tell (response) {
        this.assistant.tell(response);
    }

    getOptionsFromArguments () {
        let options = {};

        this.setOption(options, 'elements.cooking_speed[contains]', this.assistant.getArgument(COOKING_SPEED_ARGUMENT));
        this.setOption(options, 'elements.dish_type[contains]', this.assistant.getArgument(DISH_TYPE_ARGUMENT));
        this.setOption(options, 'elements.protein[contains]', this.assistant.getArgument(PROTEIN_ARGUMENT));
        this.setOption(options, 'elements.temperature[contains]', this.assistant.getArgument(TEMPERATURE_ARGUMENT));
        this.setOption(options, 'elements.vegetable[contains]', this.assistant.getArgument(VEGETABLE_ARGUMENT));

        return options;
    }

    setOption (options, param, value) {
        if (value !== null && value !== undefined) {
            if (typeof value === 'string') {
                value = value.toLowerCase();
            }
            options[param] = value;
        }
    }

    getRecommendationIntro () {
        let intro = [
            'How about ',
            'I found this recipe. ',
            'This looks good. How about ',
            'I think you\'d like '
        ];

        return intro[Math.floor(Math.random() * intro.length)];
    }

    getApology () {
        let apology = [
            'Weird, I can\'t seem to find a recipe that matches.',
            'You should try a Google search. I can\'t a thing in here!',
            'Warning. Your inputs have inadvertently awoken SkyNet. The robot uprising begins now'
        ];

        return apology[Math.floor(Math.random() * apology.length)];
    }

};

module.exports = RecipeAgent;