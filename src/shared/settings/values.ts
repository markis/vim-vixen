import * as properties from './properties';

const operationFromFormName = (name: string): any => {
  let [type, argStr] = name.split('?');
  let args = {};
  if (argStr) {
    args = JSON.parse(argStr);
  }
  return { type, ...args };
};

const operationToFormName = (op: any): string => {
  let type = op.type;
  let args = { ...op };
  delete args.type;

  if (Object.keys(args).length === 0) {
    return type;
  }
  return op.type + '?' + JSON.stringify(args);
};

const valueFromJson = (json: string): object => {
  return JSON.parse(json);
};

const valueFromForm = (form: any): object => {
  let keymaps: any = undefined;
  if (form.keymaps) {
    keymaps = {};
    for (let name of Object.keys(form.keymaps)) {
      let keys = form.keymaps[name];
      keymaps[keys] = operationFromFormName(name);
    }
  }

  let search: any = undefined;
  if (form.search) {
    search = { default: form.search.default };

    if (form.search.engines) {
      search.engines = {};
      for (let [name, url] of form.search.engines) {
        search.engines[name] = url;
      }
    }
  }

  return {
    keymaps,
    search,
    blacklist: form.blacklist,
    properties: form.properties
  };
};

const jsonFromValue = (value: any): string => {
  return JSON.stringify(value, undefined, 2);
};

const formFromValue = (value: any, allowedOps: any[]): any => {
  let keymaps: any = undefined;

  if (value.keymaps) {
    let allowedSet = new Set(allowedOps);

    keymaps = {};
    for (let keys of Object.keys(value.keymaps)) {
      let op = operationToFormName(value.keymaps[keys]);
      if (allowedSet.has(op)) {
        keymaps[op] = keys;
      }
    }
  }

  let search: any = undefined;
  if (value.search) {
    search = { default: value.search.default };
    if (value.search.engines) {
      search.engines = Object.keys(value.search.engines).map((name) => {
        return [name, value.search.engines[name]];
      });
    }
  }

  let formProperties = { ...properties.defaults, ...value.properties };

  return {
    keymaps,
    search,
    blacklist: value.blacklist,
    properties: formProperties,
  };
};

const jsonFromForm = (form: any): string => {
  return jsonFromValue(valueFromForm(form));
};

const formFromJson = (json: string, allowedOps: any[]): any => {
  let value = valueFromJson(json);
  return formFromValue(value, allowedOps);
};

export {
  valueFromJson, valueFromForm, jsonFromValue, formFromValue,
  jsonFromForm, formFromJson
};