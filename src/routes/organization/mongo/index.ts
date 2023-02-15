import { IRequest } from "itty-router";
import res from "../../../utilities/CustomResponse";
import * as Realm from "realm-web";

declare global {
  const MONGO_DB_CONN_STRING: string;
  const MONGO_DB_API_KEY: string;
  const MONGO_DB_APP_ID: string;
}

let App: Realm.App;
const ObjectId = Realm.BSON.ObjectID;

const get = async (request: IRequest) => {
  App = App || new Realm.App(MONGO_DB_APP_ID);
  try {
    const credentials = Realm.Credentials.apiKey(MONGO_DB_API_KEY);
    // Attempt to authenticate
    var user = await App.logIn(credentials);
    var client = user.mongoClient("mongodb-atlas");
  } catch (err) {
    return res({ error: "Error with authentication" }, { status: 500 });
  }

  const collection = client.db("Organization").collection("Organization");
  console.log(collection);

  try {
    const start = Date.now();
    // const organization = await collection.findOne({
    //   id: "1659592718616-add2ddeb",
    // });

    const organization = await collection.findOne({
      _id: new ObjectId("63ec2d9f2c020de5d6b1b3c5"),
    });

    const end = Date.now();

    console.log(end - start);

    return res(organization);
  } catch (error) {
    return res({ error });
  }
};

export default async function (request: IRequest) {
  switch (request.method) {
    case "GET":
      return await get(request);
  }
}
