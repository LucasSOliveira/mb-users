import { renderRegistrationPage } from "../services/render.service.js";
import { validateRegister } from "../validators/registration.validator.js"
import { findByCpfOrCnpj, save } from "./registration.model.js";

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
    next(e);
  }
}


export async function create(req, res, next) {
  try {
    const isValidForm = validateRegister(req.body);

    if (!isValidForm.valid) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: isValidForm?.message || "Erro de validação.",
        errors: Array.isArray(isValidForm?.errors) ? isValidForm.errors : [],
      });
    }

    const type = req.body.type;
    const { cpf, cnpj } = req.body;
    const identifierField = type === "PF" ? "cpf" : "cnpj";
    const identifier = type === "PF" ? cpf : cnpj;
    const existingRecord = await findByCpfOrCnpj(identifier);

    if (existingRecord) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: `${identifierField} já foi cadastrado.`,
        errors: [
          {
            field: identifierField,
            message: `O ${identifierField.toLocaleUpperCase()} ${identifier} já foi cadastrado.`,
          },
        ],
      });
    }

    const id = await save(req.body);
    const message = "Cadastro criado com sucesso!";
    
    if (!id) {
      throw new Error("Erro ao salvar o registro.");
    }

    return res.status(201).json({
      id,
      success: true,
      status: 201,
      message,
      errors: [],
    });
  } catch (e) {
    console.error("Error creating registration:", e);

    res.status(500).json({
      success: false,
      status: 500,
      message: "Erro ao criar o cadastro.",
      errors: [{ field: "server", message: `Error creating registration: ${e}` }],
    });
    next(e);
  }
}

