import { renderRegistrationPage } from "../services/render.service.js";
import { save } from "./registration.model.js";

export async function getPage(req, res, next) {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const scriptSrc = isDev
      ? `/modules/registration/instance.js`
      : `modules/registration/instance.js`;
    const html = await renderRegistrationPage(req, scriptSrc);
    const contentType = "text/html; charset=utf-8";
    const setParams = { "Content-Type": contentType };

    return res.status(200).set(setParams).end(html);
  } catch (e) {
    next(e); // delega ao handler global de erros
  }
}

export async function create(req, res, next) {
  try {
    const id = await save(req.body);
    const message = "Cadastro criado com sucesso!";

    return res.status(201).json({ id, message });
  } catch (e) {
    next(e);
  }
}
