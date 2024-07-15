import { connect } from "@/libs/helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Response, res: Response) {
  await connect();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("inputSearch");
  const category = searchParams.get("category");
  const min = searchParams.get("minPrice");
  const max = searchParams.get("maxPrice");
  const filter: FilterQuery<Ad> = {}

  if (search) {
    filter.title = { $regex: '.*' + search + '.*', $options: 'i' }
  }

  if (category) {
    filter.category = category
  }

  if (min && !max) filter.price = { $gte: min }
  if (max && !min) filter.price = { $lte: max }
  if (min && max) filter.price = { $gte: min, $lte: max }

  const adsDocs = await AdModel.find(filter, null, { sort: { createdAt: -1 } });
  return Response.json(adsDocs);
}

export async function DELETE(req: Response) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await connect();
  const adDoc = await AdModel.findById(id);
  const session = await getServerSession(authOptions);

  if (!adDoc || adDoc.userEmail !== session?.user?.email) {
    return Response.json(false);
  }

  await AdModel.findByIdAndDelete(id);
  return Response.json(true);
}
