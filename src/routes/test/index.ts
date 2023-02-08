import { IRequest } from "itty-router";
import res from "../../utilities/CustomResponse";

const get = async (request: IRequest) => {
  return res({ testing: "testing routes" });
};

export default async function (request: IRequest) {
  switch (request.method) {
    case "GET":
      return await get(request);
  }
}
