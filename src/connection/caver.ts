import {config} from "../config";
import Caver, {HttpProviderOptions} from "caver-js";


const accessKeyId = config.caver.accessKeyId;
const secretAccessKey = config.caver.secretAccessKey;

const option = {
  headers: [
    {name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')},
    {name: 'x-chain-id', value: 8217},
  ]
}

// export const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option as HttpProviderOptions));
export const caver = new Caver(new Caver.providers.HttpProvider("https://public-node-api.klaytnapi.com/v1/cypress"));
