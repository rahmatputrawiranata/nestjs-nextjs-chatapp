module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "password", "username"],
          properties: {
            email: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            password: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            username: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            profile: {
              bsonType: "object",
              required: ["name", "height", "weight", "birthDate", "zodiac", "horoscope"],
              properties: {
                name: {
                  bsonType: "string",
                  description: "must be a string"
                },
                gender: {
                  bsonType: "string",
                  enum: ["male", "female", "other", "prefer not to say"],
                },
                height: {
                  bsonType: "int",
                  description: "must be a integer"
                },
                weight: {
                  bsonType: "int",
                  description: "must be a integer"
                },
                birthDate: {
                  bsonType: "date",
                  description: "must be a date"
                },
                zodiac: {
                  bsonType: "string",
                  description: "must be a string",
                },
                horoscope: {
                  bsonType: "string",
                  description: "must be a objectId"
                },
                imageProfileBase64: {
                  bsonType: "string",
                  description: "must be a string"
                },
              }
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date"
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date"
            },
          }
        }
      }
    })

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
  },

  async down(db, client) {
    await db.collection('users').drop()
  }
};
