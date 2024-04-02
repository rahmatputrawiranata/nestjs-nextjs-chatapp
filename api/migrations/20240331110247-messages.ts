module.exports = {
  async up(db, client) {
    await db.createCollection('messages', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["type", "participants", "contents"],
          properties: {
            type: {
              bsonType: "string",
              description: "must be a string",
              enum: ["private", "group"]
            },
            participants: {
              bsonType: "array",
              description: "must be a array and is required",
              items: {
                bsonType: "object",
                required: ["userId"],
                properties: {
                  userId: {
                    bsonType: "objectId",
                    description: "must be a objectId"
                  }
                }
              }
            },
            contents: {
              bsonType: "array",
              description: "must be a array and is required",
              items: {
                bsonType: "object",
                required: ["content", "senderId", "createdAt"],
                properties: {
                  content: {
                    bsonType: "string",
                    description: "must be a string"
                  },
                  contentType: {
                    bsonType: "string",
                    description: "must be a string"
                  },
                  senderId: {
                    bsonType: "objectId",
                    description: "must be a objectId"
                  },
                  createdAt: {
                    bsonType: "date",
                    description: "must be a date"
                  }
                }
              }
            }
          }
        }
      }
    })
  },

  async down(db, client) {
    await db.collection('messages').drop();
  }
};
