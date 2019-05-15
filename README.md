# Quantified Self

## Introduction

Quantified Self is a calorie tracker app split into three parts: two microservices and a frontend. The first microservice is the [quantified self](https://github.com/juliamarco/quantified_self) service that can foods and meals along with calorie information. The second microservice is the [recipes api](https://github.com/juliamarco/recipes_api) which accesses the Edamam recipe API database to search for and save favorite recipes for a user. Finally, the [quantified self frontend](https://github.com/juliamarco/quantified_self_fe) for our application creates a basic user interface for interacting with our microservices using React.

## Local Setup

To run the project locally, you will need to clone down the [quantified self](https://github.com/juliamarco/quantified_self), [recipes api](https://github.com/juliamarco/recipes_api), and [quantified self frontend](https://github.com/juliamarco/quantified_self_fe) repos.

    git clone https://github.com/juliamarco/quantified_self.git
    git clone https://github.com/juliamarco/recipes_api.git
    git clone https://github.com/juliamarco/quantified_self_fe.git
    
In each directory you will need to install node packages

    npm install
    
Then in the quantified self and recipes api microservices, you will need to create, migrate, and seed your database

    npx sequelize db:create
    npx sequelize db:migrate
    npx sequelize db:seed:all
    
You will also need access to an [Edamam Recipe API key](https://developer.edamam.com/edamam-recipe-api) to use the recipes api microservice. After signing up, create environment variables for the recipes api by creating a .env file in the root directory and adding the following

    app_key=edamam_app_key
    app_id=edamam_app_id
    
Finally, you can start each of the three apps locally

    npm start

and visit the frontend homepage by navigating to http://localhost:4000/

## How to Use

Once the microservices are running locally, you can make API requests to the following endpoints

## Quantified Self Endpoints

These endpoints are from the quantified self microservice and are used to access Foods and Meals

### Get Foods

Users can retrieve all foods in the database by making a request to the following endpoint:

    GET /api/v1/foods

If the request is successful, foods will be returned in the following format:
```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

### Get Food by id

Users can retrieve a food by id by making a request to the following endpoint:

    GET /api/v1/foods/:id
    

If the request is successful, the food with id = :id will be returned in the following format:
```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

### Create Food

Users can create a new food by making a request to the following endpoint:

    POST /api/v1/foods/
    
With a body that has the following format:
```
{
    "name": food_name,
    "calories": 100
}
```

If the request is successful, the new food will be created and returned in the following format:
```
{
    "id": 10,
    "name": "new_food",
    "calories": 100,
    "updatedAt": current_time,
    "createdAt": current_time
}
```

### Edit Food

Users can create a new food by making a request to the following endpoint:

    PATCH /api/v1/foods/:id
    
With a body that has the following format
```
{
    "name": edited_name,
    "calories": 200
}
```

If the request is successful, the food with id = :id will be edited and returned in the following format:
```
{
    "id": 10,
    "name": "edited_name",
    "calories": 2==,
    "updatedAt": current_time,
    "createdAt": created_time
}
```

### Delete Food

Users can create a new food by making a request to the following endpoint:

    DELETE /api/v1/foods/:id

If the request is successful, the food with id = :id will be deleted and a 204 status will be returned.

### Get Meals

Users can retrieve all meals in the database and their associated foods by making a request to the following endpoint:

    GET /api/v1/meals

If the request is successful, foods will be returned in the following format:
```
[
    {
        "id": 1,
        "name": "Fruit Salad",
        "Food": [
            {
                "id": 3,
                "name": "Kiwi",
                "calories": 50
            },
            {
                "id": 2,
                "name": "Apple",
                "calories": 70
            }
        ]
    },
```

### Get Foods for a Meal

Users can retrieve all foods for a meal by making a request to the following endpoint:

    GET /api/v1/meals/:meal_id/foods

If the request is successful, the meal with id = :meal_id and all associated foods will be returned in the following format:
```
{
    "id": 1,
    "name": "Fruit Salad",
    "Food": [
        {
            "id": 2,
            "name": "Apple",
            "calories": 70
        },
        {
            "id": 3,
            "name": "Kiwi",
            "calories": 50
        }
    ]
}
```

### Add a Food to a Meal

Users can add a food to a meal by making a request to the following endpoint:

    POST /api/v1/meals/:meal_id/foods/:id

If the request is successful, the food with id = :id will be added to the meal with id = :meal_id and a confirmation message will be returned with the following format:
```
{
    "message": "Successfully added FOOD to MEAL"
}
```

### Remove a Food from a Meal

Users can remove a food from a meal by making a request to the following endpoint:

    DELETE /api/v1/meals/:meal_id/foods/:id
    
If the request is successful, the food with id = :id will be removed from the meal with id = :meal_id and a 204 status will be returned.
