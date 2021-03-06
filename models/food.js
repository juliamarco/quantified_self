'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    Food.hasMany(models.MealFood, { onDelete: 'cascade' });
    Food.belongsToMany(models.Meal, {through: models.MealFood})
  };
  return Food;
};
