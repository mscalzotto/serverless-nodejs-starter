import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, _context) => {
  //const data = JSON.parse(event.body);
  //const { content, attachment } = data;
  const { content, attachment } = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content, // Parsed from request body
      attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});