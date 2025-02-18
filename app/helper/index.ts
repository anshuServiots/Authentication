const { validationResult } = require("express-validator");
import { Request } from "express";
//import {validationResult} from "express-validator"

 const checkValidation = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = {
      message: errors.errors,
    };
    throw validationError;
  }
};


export  {checkValidation}