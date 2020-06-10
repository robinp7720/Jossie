import WolframAlphaAPI from '@dguttman/wolfram-alpha-api';
import config from '../../config';

const waApi = WolframAlphaAPI(config.wolframalpha.appid);

export default {
     'response': async function (modifiers) {
         let response = await waApi.getShort(modifiers.original);
         console.log(response);
         return [response];
     }
}
