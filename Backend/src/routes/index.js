import express from "express";
const app = express();
import bodyParser from "body-parser";
import {
  contract,
  contractById,
  jobsUnpaid,
  jobsByIdPay,
  balances,
  profession,
  clients,
  health,
} from "../controller";
import { sequelize } from "../models/model";
import { Op, col, fn, literal } from "sequelize";

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.get("/contracts/:id", contractById);

app.get("/contracts", contract);

app.get("/jobs/unpaid", jobsUnpaid);

app.post("/jobs/:job_id/pay", jobsByIdPay);

app.post("/balances/deposit/:userId", balances);

app.get("/admin/profession", profession) 

app.get("/admin/clients", clients)

app.get("/", health);

module.exports = app;
