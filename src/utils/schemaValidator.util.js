const { default: Ajv } = require("ajv");
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);   // enables date-time, email, etc.

function validateSchema(schema,data){
    const validate = ajv.compile(schema);
    const valid = validate(data);

    return valid;
}

export default validateSchema;