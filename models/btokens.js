// TOKEN: This table as it stands is the only pre-loaded table.  The intent is to dump all of the existing MtG game tokens into a databse for a player to use.  This should mean there are no queries other than the one that loads and refreshes the tabular information.  We will remain open to determine what else could be put in there

// Not likely to use sequelize as shown in this boilerplate.  I think folks use a "chron" job to update tables like this nightly using..... python?  For our part we'll just push it in manually
module.exports = function(sequelize, DataTypes) {
  let tokens = sequelize.define("tokens", {
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    color: DataTypes.STRING,
    pt: DataTypes.STRING,
    promo: DataTypes.STRING,
    type: DataTypes.STRING,
    artist: DataTypes.STRING,
    text: DataTypes.STRING
  });

  tokens.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    tokens.hasMany(models.token_logs, {
      forignKey: "token_id",
      onDelete: "no action",
      onUpdate: "no action"
    });
  };
  return tokens;
};
