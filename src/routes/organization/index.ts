import { IRequest } from "itty-router";
import res from "../../utilities/CustomResponse";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

declare global {
  const ACCESS_KEY_ID: string;
  const SECRET_ACCESS_KEY: string;
}

async function myCredentialProvider() {
  return {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  };
}

const get = async (request: IRequest) => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentialDefaultProvider: myCredentialProvider as any,
  });
  const get = new GetItemCommand({
    TableName: "Organization",
    Key: {
      id: { S: "1659592718616-add2ddeb" },
    },
  });

  const response = await client.send(get);
  const results = unmarshall(response.Item as any);

  return res(results);
};

export default async function (request: IRequest) {
  switch (request.method) {
    case "GET":
      return await get(request);
  }
}
