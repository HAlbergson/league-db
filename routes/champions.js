import { Router } from "express";
import dbConnection from "../database.js";

const championRouter = Router();

function resultToChampion(row) {
  return {
    id: row.champion_id,
    name: row.champion_name,
  };
}

championRouter.get("/", async (request, response) => {
  const pageNum = Number(request.query.page);
  const limit = Number(request.query.pageSize);
  const offset = (pageNum - 1) * limit;
  console.log(limit, pageNum);
  if (isNaN(pageNum) === true && isNaN(limit) === true) {
    const [rows, fields] = await dbConnection.query(`SELECT * FROM champions`);
    const champions = rows.map(resultToChampion);
    response.json(champions);
  } else {
    const [rows, fields] = await dbConnection.query(`SELECT * FROM champions LIMIT ? OFFSET ?`, [limit, offset]);
    const champions = rows.map(resultToChampion);
    response.json(champions);
  }
});

export default championRouter;
