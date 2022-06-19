/* eslint-disable no-template-curly-in-string */
const typeTemplate = "${label} is not a valid ${type}";

export const defaultValidateMessages = {
  default: "Validation error on field '${label}'",
  required: "'${label}' is required",
  enum: "'${label}' must be one of [${enum}]",
  whitespace: "'${label}' cannot be empty",
  date: {
    format: "'${label}' is invalid for format date",
    parse: "'${label}' could not be parsed as date",
    invalid: "'${label}' is invalid date",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "${label} must be exactly ${len} characters",
    min: "'${label}' must be at least ${min} characters",
    max: 'this field can not longer than ${max} character ',
    range: "'${label}' must be between ${min} and ${max} characters",
  },
  number: {
    len: "value must equal ${len}",
    min: "value cannot be less than ${min}",
    max: "value cannot be greater than ${max}",
    range: 'value must be between ${min} and ${max}',
  },
  array: {
    len: "'${label}' must be exactly ${len} in length",
    min: "'${label}' cannot be less than ${min} in length",
    max: "'${label}' cannot be greater than ${max} in length",
    range: "'${label}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: `'$'{label}' does not match pattern '$'{pattern}`,
  },
};