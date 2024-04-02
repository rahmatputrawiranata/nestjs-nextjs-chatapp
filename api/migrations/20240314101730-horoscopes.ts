module.exports = {
  async up(db, client) {
    await db.createCollection('horoscopes', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "startDate", "endDate"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            startDate: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            endDate: {
              bsonType: "date",
              description: "must be a date and is required"
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

    const horoscopeCollection = db.collection('horoscopes');
    const horoscopes = [
      {
        name: "Aries",
        startDate: new Date("2022-03-21"),
        endDate: new Date("2022-04-19"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Taurus",
        startDate: new Date("2022-04-20"),
        endDate: new Date("2022-05-20"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gemini",
        startDate: new Date("2022-05-21"),
        endDate: new Date("2022-06-20"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cancer",
        startDate: new Date("2022-06-21"),
        endDate: new Date("2022-07-22"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Leo",
        startDate: new Date("2022-07-23"),
        endDate: new Date("2022-08-22"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Virgo",
        startDate: new Date("2022-08-23"),
        endDate: new Date("2022-09-22"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Libra",
        startDate: new Date("2022-09-23"),
        endDate: new Date("2022-10-22"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Scorpio",
        startDate: new Date("2022-10-23"),
        endDate: new Date("2022-11-21"),
        createdAt: new Date()
      },
      {
        name: "Sagittarius",
        startDate: new Date("2022-11-22"),
        endDate: new Date("2022-12-21"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Capricorn",
        startDate: new Date("2022-12-22"),
        endDate: new Date("2023-01-19"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Aquarius",
        startDate: new Date("2023-01-20"),
        endDate: new Date("2023-02-18"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pisces",
        startDate: new Date("2023-02-19"),
        endDate: new Date("2023-03-20"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await horoscopeCollection.insertMany(horoscopes);
  },

  async down(db, client) {
    await db.collection('zodiacs').drop();
  }
};
