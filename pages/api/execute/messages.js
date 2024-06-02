import sdk from '@api/skip-ibc-api';

function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function convertKeysToSnakeCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      let newKey = toSnakeCase(key);
      if (newKey.endsWith('_i_d_s')) {
        newKey = newKey.replace('_i_d_s', '_ids');
      } else if (newKey.endsWith('_i_d')) {
        newKey = newKey.replace('_i_d', '_id');
      } else if (newKey.endsWith('_i_ds')) {
        newKey = newKey.replace('_i_ds', '_ids');
      } else if (newKey.endsWith('_c_w20')) {
        newKey = newKey.replace('_c_w20', '_cw20');
      }
      else if (newKey.endsWith('_e_v_m')) {
        newKey = newKey.replace('_e_v_m', '_evm');
      } else if (newKey.endsWith('_s_v_m')) {
        newKey = newKey.replace('_s_v_m', '_svm');
      }
      acc[newKey] = convertKeysToSnakeCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const routeObject = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      //console.log('routeObject:', routeObject);

      delete routeObject.chainIDs;
      delete routeObject.requiredChainAddresses;
      delete routeObject.doesSwap;
      delete routeObject.swapVenue;
      delete routeObject.txsRequired;

      const routeFormatted = convertKeysToSnakeCase(routeObject);

      delete routeFormatted.usd_amount_in;
      delete routeFormatted.usd_amount_out;
      delete routeFormatted.swap_price_impact_percent;
      routeFormatted.address_list = routeFormatted["addresses"]["address_list"];
      delete routeFormatted.addresses;
      // console.log('routeFormatted:', routeFormatted);
      delete routeFormatted.is_c_w20;

      routeFormatted.slippage_tolerance_percent = "1";

      // console.log('routeFormatted:', routeFormatted);

      const { data } = await sdk.getMsgsV2(routeFormatted);
      res.status(200).json(data);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: error || 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
