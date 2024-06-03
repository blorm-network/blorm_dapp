declare const GetAssetRecommendations: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly requests: {
                readonly type: "array";
                readonly description: "Array where each entry corresponds to a distinct asset recommendation request.";
                readonly items: {
                    readonly properties: {
                        readonly source_asset_denom: {
                            readonly type: "string";
                            readonly description: "Denom of the source asset";
                            readonly examples: readonly ["uusdc"];
                        };
                        readonly source_asset_chain_id: {
                            readonly type: "string";
                            readonly description: "Chain-id of the source asset";
                            readonly examples: readonly ["axelar-dojo-1"];
                        };
                        readonly dest_chain_id: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Chain-id of the recommended destination asset";
                            readonly examples: readonly ["cosmoshub-4"];
                        };
                        readonly reason: {
                            readonly description: "Recommendation reason: <br/> * UNKNOWN - Unknown recommendation reason. <br/> * MOST_LIQUID - Highest liquidity form of the transferred token on the destination chain. <br/> * BASE_TOKEN - The base token if the destination chain is the origin chain of the source token. <br/> * DIRECT - The token resulting from the least amount of transfers to the destination chain.\n";
                            readonly enum: readonly ["UNKNOWN", "MOST_LIQUID", "BASE_TOKEN", "DIRECT"];
                            readonly type: readonly ["string", "null"];
                        };
                    };
                    readonly type: "object";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly recommendation_entries: {
                    readonly type: "array";
                    readonly description: "Array of recommendations for each entry in the `request` field.";
                    readonly items: {
                        readonly properties: {
                            readonly recommendations: {
                                readonly type: "array";
                                readonly items: {
                                    readonly properties: {
                                        readonly asset: {
                                            readonly description: "Asset that is recommended";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly chain_id: {
                                                    readonly description: "Chain-id of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly coingecko_id: {
                                                    readonly description: "Coingecko id of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly decimals: {
                                                    readonly description: "Number of decimals used for amounts of the asset";
                                                    readonly type: readonly ["number", "null"];
                                                };
                                                readonly denom: {
                                                    readonly description: "Denom of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly description: {
                                                    readonly description: "Description of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly is_cw20: {
                                                    readonly description: "Indicates whether asset is a CW20 token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_evm: {
                                                    readonly description: "Indicates whether asset is an EVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_svm: {
                                                    readonly description: "Indicates whether asset is an SVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly logo_uri: {
                                                    readonly description: "URI pointing to an image of the logo of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly name: {
                                                    readonly description: "Name of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly origin_chain_id: {
                                                    readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly origin_denom: {
                                                    readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly recommended_symbol: {
                                                    readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly symbol: {
                                                    readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly token_contract: {
                                                    readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly trace: {
                                                    readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                        readonly reason: {
                                            readonly description: "Recommendation reason: <br/> * UNKNOWN - Unknown recommendation reason. <br/> * MOST_LIQUID - Highest liquidity form of the transferred token on the destination chain. <br/> * BASE_TOKEN - The base token if the destination chain is the origin chain of the source token. <br/> * DIRECT - The token resulting from the least amount of transfers to the destination chain.\n\n\n`UNKNOWN` `MOST_LIQUID` `BASE_TOKEN` `DIRECT`";
                                            readonly enum: readonly ["UNKNOWN", "MOST_LIQUID", "BASE_TOKEN", "DIRECT"];
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly error: {
                                readonly properties: {
                                    readonly message: {
                                        readonly description: "Error message";
                                        readonly type: "string";
                                    };
                                };
                                readonly type: "object";
                            };
                        };
                        readonly type: "object";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly chain_id: {
                    readonly type: "string";
                    readonly examples: readonly ["osmosis-1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Chain-id to get supported assets for";
                };
                readonly native_only: {
                    readonly type: "boolean";
                    readonly examples: readonly [true, false];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to restrict assets to those native to their chain";
                };
                readonly include_no_metadata_assets: {
                    readonly type: "boolean";
                    readonly examples: readonly [false, true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include assets without metadata (symbol, name, logo_uri, etc.)";
                };
                readonly include_cw20_assets: {
                    readonly type: "boolean";
                    readonly examples: readonly [false, true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include CW20 tokens";
                };
                readonly include_evm_assets: {
                    readonly type: "boolean";
                    readonly examples: readonly [false, true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include EVM tokens";
                };
                readonly include_svm_assets: {
                    readonly type: "boolean";
                    readonly examples: readonly [false, true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include SVM tokens";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly chain_to_assets_map: {
                    readonly type: "object";
                    readonly description: "Map of chain-ids to array of assets supported on the chain";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly properties: {
                            readonly assets: {
                                readonly type: "array";
                                readonly items: {
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the asset";
                                            readonly type: "string";
                                        };
                                        readonly coingecko_id: {
                                            readonly description: "Coingecko id of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly decimals: {
                                            readonly description: "Number of decimals used for amounts of the asset";
                                            readonly type: readonly ["number", "null"];
                                        };
                                        readonly denom: {
                                            readonly description: "Denom of the asset";
                                            readonly type: "string";
                                        };
                                        readonly description: {
                                            readonly description: "Description of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly is_cw20: {
                                            readonly description: "Indicates whether asset is a CW20 token";
                                            readonly type: "boolean";
                                        };
                                        readonly is_evm: {
                                            readonly description: "Indicates whether asset is an EVM token";
                                            readonly type: "boolean";
                                        };
                                        readonly is_svm: {
                                            readonly description: "Indicates whether asset is an SVM token";
                                            readonly type: "boolean";
                                        };
                                        readonly logo_uri: {
                                            readonly description: "URI pointing to an image of the logo of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly name: {
                                            readonly description: "Name of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly origin_chain_id: {
                                            readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                            readonly type: "string";
                                        };
                                        readonly origin_denom: {
                                            readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                            readonly type: "string";
                                        };
                                        readonly recommended_symbol: {
                                            readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly symbol: {
                                            readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly token_contract: {
                                            readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly trace: {
                                            readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetsFromSource: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["source_asset_denom", "source_asset_chain_id"];
        readonly properties: {
            readonly source_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the source asset";
                readonly examples: readonly ["uusdc"];
            };
            readonly source_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the source asset";
                readonly examples: readonly ["axelar-dojo-1"];
            };
            readonly allow_multi_tx: {
                readonly type: "boolean";
                readonly description: "Whether to include recommendations requiring multiple transactions to reach the destination";
                readonly default: false;
            };
            readonly include_cw20_assets: {
                readonly type: "boolean";
                readonly description: "Whether to include CW20 tokens";
                readonly default: false;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly dest_assets: {
                    readonly type: "object";
                    readonly description: "Array of assets that are reachable from the specified source asset";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly properties: {
                            readonly assets: {
                                readonly type: "array";
                                readonly items: {
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the asset";
                                            readonly type: "string";
                                        };
                                        readonly coingecko_id: {
                                            readonly description: "Coingecko id of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly decimals: {
                                            readonly description: "Number of decimals used for amounts of the asset";
                                            readonly type: readonly ["number", "null"];
                                        };
                                        readonly denom: {
                                            readonly description: "Denom of the asset";
                                            readonly type: "string";
                                        };
                                        readonly description: {
                                            readonly description: "Description of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly is_cw20: {
                                            readonly description: "Indicates whether asset is a CW20 token";
                                            readonly type: "boolean";
                                        };
                                        readonly is_evm: {
                                            readonly description: "Indicates whether asset is an EVM token";
                                            readonly type: "boolean";
                                        };
                                        readonly is_svm: {
                                            readonly description: "Indicates whether asset is an SVM token";
                                            readonly type: "boolean";
                                        };
                                        readonly logo_uri: {
                                            readonly description: "URI pointing to an image of the logo of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly name: {
                                            readonly description: "Name of the asset";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly origin_chain_id: {
                                            readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                            readonly type: "string";
                                        };
                                        readonly origin_denom: {
                                            readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                            readonly type: "string";
                                        };
                                        readonly recommended_symbol: {
                                            readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly symbol: {
                                            readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly token_contract: {
                                            readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly trace: {
                                            readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBridges: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bridges: {
                    readonly type: "array";
                    readonly items: {
                        readonly properties: {
                            readonly id: {
                                readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                            };
                            readonly name: {
                                readonly description: "Name of the bridge";
                                readonly type: "string";
                            };
                            readonly logo_uri: {
                                readonly description: "URI pointing to an image of the logo of the bridge";
                                readonly type: "string";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly description: "Array of supported bridges";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetChains: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly include_evm: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include EVM chains in the response";
                };
                readonly include_svm: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include SVM chains in the response";
                };
                readonly include_testnets: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include testnets in the response";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly chains: {
                    readonly type: "array";
                    readonly items: {
                        readonly properties: {
                            readonly chain_name: {
                                readonly description: "Name of the chain";
                                readonly type: "string";
                            };
                            readonly chain_id: {
                                readonly description: "Chain-id of the chain";
                                readonly type: "string";
                            };
                            readonly pfm_enabled: {
                                readonly description: "Whether the PFM module is enabled on the chain";
                                readonly type: "boolean";
                            };
                            readonly cosmos_module_support: {
                                readonly description: "Supported cosmos modules";
                                readonly properties: {
                                    readonly authz: {
                                        readonly description: "Whether the authz module is supported";
                                        readonly type: "boolean";
                                    };
                                    readonly feegrant: {
                                        readonly description: "Whether the feegrant module is supported";
                                        readonly type: "boolean";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly supports_memo: {
                                readonly description: "Whether the chain supports IBC memos";
                                readonly type: "boolean";
                            };
                            readonly logo_uri: {
                                readonly description: "chain logo URI";
                                readonly type: readonly ["string", "null"];
                            };
                            readonly bech32_prefix: {
                                readonly description: "Bech32 prefix of the chain";
                                readonly type: "string";
                            };
                            readonly fee_assets: {
                                readonly description: "Fee assets of the chain";
                                readonly items: {
                                    readonly description: "Asset used to pay gas fees and the recommended price tiers. Assets and gas price recommendations are sourced from the [keplr chain registry](https://github.com/chainapsis/keplr-chain-registry)";
                                    readonly properties: {
                                        readonly denom: {
                                            readonly description: "Asset denom";
                                            readonly type: "string";
                                        };
                                        readonly gas_price_info: {
                                            readonly description: "Gas price tiers";
                                            readonly properties: {
                                                readonly average: {
                                                    readonly description: "Average gas price";
                                                    readonly type: "string";
                                                };
                                                readonly high: {
                                                    readonly description: "High gas price";
                                                    readonly type: "string";
                                                };
                                                readonly low: {
                                                    readonly description: "Low gas price";
                                                    readonly type: "string";
                                                };
                                            };
                                            readonly type: readonly ["object", "null"];
                                        };
                                    };
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                            readonly chain_type: {
                                readonly description: "Type of chain, e.g. \"cosmos\" or \"evm\"";
                                readonly type: "string";
                            };
                            readonly ibc_capabilities: {
                                readonly description: "IBC capabilities of the chain";
                                readonly properties: {
                                    readonly cosmos_pfm: {
                                        readonly description: "Whether the packet forwarding middleware module is supported";
                                        readonly type: "boolean";
                                    };
                                    readonly cosmos_ibc_hooks: {
                                        readonly description: "Whether the ibc hooks module is supported";
                                        readonly type: "boolean";
                                    };
                                    readonly cosmos_memo: {
                                        readonly description: "Whether the chain supports IBC memos";
                                        readonly type: "boolean";
                                    };
                                    readonly cosmos_autopilot: {
                                        readonly description: "Whether the autopilot module is supported";
                                        readonly type: "boolean";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly is_testnet: {
                                readonly description: "Whether the chain is a testnet";
                                readonly type: "boolean";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly description: "Array of supported chain-ids";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMsgsDirectV2: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly source_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the source asset";
                readonly examples: readonly ["uusdc"];
            };
            readonly source_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the source asset";
                readonly examples: readonly ["axelar-dojo-1"];
            };
            readonly dest_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the destination asset";
                readonly examples: readonly ["uatom"];
            };
            readonly dest_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the destination asset";
                readonly examples: readonly ["cosmoshub-4"];
            };
            readonly amount_in: {
                readonly type: "string";
                readonly description: "Amount of source asset to be transferred or swapped. If this is a swap, only one of amount_in and amount_out should be provided.";
                readonly examples: readonly ["1500000000"];
            };
            readonly amount_out: {
                readonly type: "string";
                readonly description: "Amount of destination asset out. If this is a swap, only one of amount_in and amount_out should be provided. If amount_out is provided for a swap, the route will be computed to give exactly amount_out.";
            };
            readonly chain_ids_to_addresses: {
                readonly type: "object";
                readonly description: "Map of chain-ids to receipient and/or sender address for each chain in the path. Since the path is not known to the caller beforehand, the caller should attempt to provide addresses for all chains in the path, and the API will return an error if the path cannot be constructed.";
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly swap_venues: {
                readonly type: "array";
                readonly description: "Swap venues to consider, if provided (optional)";
                readonly items: {
                    readonly description: "A venue on which swaps can be exceuted";
                    readonly properties: {
                        readonly chain_id: {
                            readonly description: "Chain-id of the swap venue";
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly description: "Name of the swap venue";
                            readonly type: "string";
                        };
                    };
                    readonly type: "object";
                };
            };
            readonly slippage_tolerance_percent: {
                readonly type: "string";
                readonly description: "Percent tolerance for slippage on swap, if a swap is performed";
                readonly examples: readonly ["3"];
            };
            readonly timeout_seconds: {
                readonly type: "string";
                readonly description: "Number of seconds for the IBC transfer timeout, defaults to 5 minutes";
            };
            readonly affiliates: {
                readonly type: "array";
                readonly description: "Array of affiliates to send affiliate fees";
                readonly items: {
                    readonly description: "An affiliate that receives fees from a swap";
                    readonly properties: {
                        readonly address: {
                            readonly description: "Address to which to pay the fee";
                            readonly type: "string";
                        };
                        readonly basis_points_fee: {
                            readonly description: "Bps fee to pay to the affiliate";
                            readonly type: "string";
                        };
                    };
                    readonly type: "object";
                };
            };
            readonly post_route_handler: {
                readonly oneOf: readonly [{
                    readonly properties: {
                        readonly wasm_msg: {
                            readonly properties: {
                                readonly contract_address: {
                                    readonly description: "Address of the contract to execute the message on";
                                    readonly type: "string";
                                };
                                readonly msg: {
                                    readonly description: "JSON string of the message";
                                    readonly type: "string";
                                };
                            };
                            readonly type: "object";
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly properties: {
                        readonly autpilot_msg: {
                            readonly properties: {
                                readonly action: {
                                    readonly enum: readonly ["LIQUID_STAKE", "CLAIM"];
                                    readonly type: "string";
                                };
                                readonly receiver: {
                                    readonly type: "string";
                                };
                            };
                            readonly type: "object";
                        };
                    };
                    readonly type: "object";
                }];
            };
            readonly allow_multi_tx: {
                readonly type: "boolean";
                readonly description: "Whether to allow route responses requiring multiple transactions";
                readonly examples: readonly [true];
            };
            readonly allow_unsafe: {
                readonly type: "boolean";
                readonly description: "Toggles whether the api should return routes that fail price safety checks.";
            };
            readonly experimental_features: {
                readonly type: "array";
                readonly description: "Array of experimental features to enable";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly bridges: {
                readonly type: "array";
                readonly description: "Array of bridges to use";
                readonly items: {
                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                };
            };
            readonly smart_relay: {
                readonly type: "boolean";
                readonly description: "Indicates whether this transfer route should be relayed via Skip's Smart Relay service";
            };
            readonly smart_swap_options: {
                readonly properties: {
                    readonly split_routes: {
                        readonly description: "Indicates whether the swap can be split into multiple swap routes";
                        readonly type: "boolean";
                    };
                };
                readonly type: "object";
            };
            readonly allow_swaps: {
                readonly type: "boolean";
                readonly description: "Whether to allow swaps in the route";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly msgs: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly properties: {
                                readonly multi_chain_msg: {
                                    readonly description: "A message that interacts with multiple chains";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction containing the message is intended for";
                                            readonly type: "string";
                                        };
                                        readonly msg: {
                                            readonly description: "JSON string of the message";
                                            readonly type: "string";
                                        };
                                        readonly msg_type_url: {
                                            readonly description: "TypeUrl of the message";
                                            readonly type: "string";
                                        };
                                        readonly path: {
                                            readonly description: "Path of chain-ids that the message is intended to interact with";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly type: "array";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly properties: {
                                readonly evm_tx: {
                                    readonly description: "A transaction on an EVM chain";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly data: {
                                            readonly description: "Data of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly required_erc20_approvals: {
                                            readonly description: "ERC20 approvals required for the transaction";
                                            readonly items: {
                                                readonly description: "An ERC20 token contract approval";
                                                readonly properties: {
                                                    readonly amount: {
                                                        readonly description: "Amount of the approval";
                                                        readonly type: "string";
                                                    };
                                                    readonly spender: {
                                                        readonly description: "Address of the spender";
                                                        readonly type: "string";
                                                    };
                                                    readonly token_contract: {
                                                        readonly description: "Address of the ERC20 token contract";
                                                        readonly type: "string";
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                            readonly type: "array";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly to: {
                                            readonly description: "Address of the recipient of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly value: {
                                            readonly description: "Amount of the transaction";
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly properties: {
                                readonly svm_tx: {
                                    readonly description: "A transaction on an SVM chain";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly tx: {
                                            readonly description: "Base64 encoded unsigned or partially signed transaction";
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly type: "object";
                        }];
                    };
                };
                readonly txs: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly properties: {
                                readonly cosmos_tx: {
                                    readonly description: "A transaction on a Cosmos chain";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly path: {
                                            readonly description: "Path of chain-ids that the message is intended to interact with";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly type: "array";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly msgs: {
                                            readonly description: "The messages that should be included in the transaction. The ordering must be adhered to.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "A message in a cosmos transaction";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly msg: {
                                                        readonly description: "JSON string of the message";
                                                        readonly type: "string";
                                                    };
                                                    readonly msg_type_url: {
                                                        readonly description: "TypeUrl of the message";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly type: "object";
                                };
                                readonly operations_indices: {
                                    readonly description: "Array of indices of the operations that this transaction executes";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "integer";
                                    };
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly evm_tx: {
                                    readonly description: "A transaction on an EVM chain";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly data: {
                                            readonly description: "Data of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly required_erc20_approvals: {
                                            readonly description: "ERC20 approvals required for the transaction";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "An ERC20 token contract approval";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly amount: {
                                                        readonly description: "Amount of the approval";
                                                        readonly type: "string";
                                                    };
                                                    readonly spender: {
                                                        readonly description: "Address of the spender";
                                                        readonly type: "string";
                                                    };
                                                    readonly token_contract: {
                                                        readonly description: "Address of the ERC20 token contract";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly to: {
                                            readonly description: "Address of the recipient of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly value: {
                                            readonly description: "Amount of the transaction";
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly operations_indices: {
                                    readonly description: "Array of indices of the operations that this transaction executes";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "integer";
                                    };
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly svm_tx: {
                                    readonly description: "A transaction on an SVM chain";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly tx: {
                                            readonly description: "Base64 encoded unsigned or partially signed transaction";
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly operations_indices: {
                                    readonly description: "Array of indices of the operations that this transaction executes";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "integer";
                                    };
                                };
                            };
                        }];
                    };
                };
                readonly route: {
                    readonly properties: {
                        readonly amount_in: {
                            readonly description: "Amount of source asset to be transferred or swapped";
                            readonly type: "string";
                        };
                        readonly amount_out: {
                            readonly description: "Amount of destination asset out";
                            readonly type: "string";
                        };
                        readonly chain_ids: {
                            readonly description: "Chain-ids of all chains of the transfer or swap, in order of usage by operations in the route";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly type: "array";
                        };
                        readonly required_chain_addresses: {
                            readonly description: "All chain-ids that require an address to be provided for, in order of usage by operations in the route";
                        };
                        readonly dest_asset_chain_id: {
                            readonly description: "Chain-id of the destination asset";
                            readonly type: "string";
                        };
                        readonly dest_asset_denom: {
                            readonly description: "Denom of the destination asset";
                            readonly type: "string";
                        };
                        readonly does_swap: {
                            readonly description: "Whether this route performs a swap";
                            readonly type: "boolean";
                        };
                        readonly estimated_amount_out: {
                            readonly description: "Amount of destination asset out, if a swap is performed";
                            readonly type: "string";
                        };
                        readonly operations: {
                            readonly description: "Array of operations required to perform the transfer or swap";
                            readonly items: {
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly transfer: {
                                            readonly description: "A cross-chain transfer";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly from_chain_id: {
                                                    readonly description: "Chain-id on which the transfer is initiated";
                                                    readonly type: "string";
                                                };
                                                readonly to_chain_id: {
                                                    readonly description: "Chain-id on which the transfer is received";
                                                    readonly type: "string";
                                                };
                                                readonly channel: {
                                                    readonly description: "Channel to use to initiate the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly dest_denom: {
                                                    readonly description: "Denom of the destionation asset of the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly pfm_enabled: {
                                                    readonly description: "Whether pfm is enabled on the chain where the transfer is initiated";
                                                    readonly type: "boolean";
                                                };
                                                readonly port: {
                                                    readonly description: "Port to use to initiate the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly supports_memo: {
                                                    readonly description: "Whether the transfer chain supports a memo";
                                                    readonly type: "boolean";
                                                };
                                                readonly denom_in: {
                                                    readonly description: "Denom of the input asset of the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly denom_out: {
                                                    readonly description: "Denom of the output asset of the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable.";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly usd_fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable, converted to USD value";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly fee_asset: {
                                                    readonly type: readonly ["object", "null"];
                                                    readonly description: "Asset to be paid as the transfer fee if applicable.";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly coingecko_id: {
                                                            readonly description: "Coingecko id of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly decimals: {
                                                            readonly description: "Number of decimals used for amounts of the asset";
                                                            readonly type: readonly ["number", "null"];
                                                        };
                                                        readonly denom: {
                                                            readonly description: "Denom of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly description: {
                                                            readonly description: "Description of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly is_cw20: {
                                                            readonly description: "Indicates whether asset is a CW20 token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_evm: {
                                                            readonly description: "Indicates whether asset is an EVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_svm: {
                                                            readonly description: "Indicates whether asset is an SVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly logo_uri: {
                                                            readonly description: "URI pointing to an image of the logo of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly origin_chain_id: {
                                                            readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly origin_denom: {
                                                            readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly recommended_symbol: {
                                                            readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly symbol: {
                                                            readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly token_contract: {
                                                            readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly trace: {
                                                            readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly bridge_id: {
                                                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                                };
                                                readonly smart_relay: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                                };
                                            };
                                        };
                                        readonly tx_index: {
                                            readonly description: "Index of the tx returned from Msgs that executes this operation";
                                            readonly type: "integer";
                                        };
                                        readonly amount_in: {
                                            readonly description: "Amount of input asset to this operation";
                                            readonly type: "string";
                                        };
                                        readonly amount_out: {
                                            readonly description: "Amount of output asset from this operation";
                                            readonly type: "string";
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly swap: {
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly swap_in: {
                                                        readonly description: "Specification of a swap with an exact amount in";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly swap_amount_in: {
                                                                readonly description: "Amount to swap in";
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly swap_operations: {
                                                                readonly description: "Operations required to execute the swap";
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly description: "Description of a single swap operation";
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly denom_in: {
                                                                            readonly description: "Input denom of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly denom_out: {
                                                                            readonly description: "Output denom of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly pool: {
                                                                            readonly description: "Identifier of the pool to use for the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly interface: {
                                                                            readonly description: "Optional dditional metadata a swap adapter may require";
                                                                            readonly type: readonly ["string", "null"];
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly swap_venue: {
                                                                readonly description: "A venue on which swaps can be exceuted";
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain-id of the swap venue";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly name: {
                                                                        readonly description: "Name of the swap venue";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly price_impact_percent: {
                                                                readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                    };
                                                    readonly estimated_affiliate_fee: {
                                                        readonly description: "Estimated total affiliate fee generated by the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly chain_id: {
                                                        readonly description: "Chain id that the swap will be executed on";
                                                        readonly type: "string";
                                                    };
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                                        readonly type: "string";
                                                    };
                                                    readonly denom_in: {
                                                        readonly description: "Input denom of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly denom_out: {
                                                        readonly description: "Output denom of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly swap_venues: {
                                                        readonly description: "Swap venues that the swap will route through";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly description: "A venue on which swaps can be exceuted";
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly chain_id: {
                                                                    readonly description: "Chain-id of the swap venue";
                                                                    readonly type: "string";
                                                                };
                                                                readonly name: {
                                                                    readonly description: "Name of the swap venue";
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly swap_out: {
                                                        readonly description: "Specification of a swap with an exact amount out";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly swap_amount_out: {
                                                                readonly description: "Amount to get out of the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly swap_operations: {
                                                                readonly description: "Operations required to execute the swap";
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly description: "Description of a single swap operation";
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly denom_in: {
                                                                            readonly description: "Input denom of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly denom_out: {
                                                                            readonly description: "Output denom of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly pool: {
                                                                            readonly description: "Identifier of the pool to use for the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly interface: {
                                                                            readonly description: "Optional dditional metadata a swap adapter may require";
                                                                            readonly type: readonly ["string", "null"];
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly swap_venue: {
                                                                readonly description: "A venue on which swaps can be exceuted";
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain-id of the swap venue";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly name: {
                                                                        readonly description: "Name of the swap venue";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly price_impact_percent: {
                                                                readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                    };
                                                    readonly estimated_affiliate_fee: {
                                                        readonly description: "Estimated total affiliate fee generated by the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly chain_id: {
                                                        readonly description: "Chain id that the swap will be executed on";
                                                        readonly type: "string";
                                                    };
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                                        readonly type: "string";
                                                    };
                                                    readonly denom_in: {
                                                        readonly description: "Input denom of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly denom_out: {
                                                        readonly description: "Output denom of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly swap_venues: {
                                                        readonly description: "Swap venues that the swap will route through";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly description: "A venue on which swaps can be exceuted";
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly chain_id: {
                                                                    readonly description: "Chain-id of the swap venue";
                                                                    readonly type: "string";
                                                                };
                                                                readonly name: {
                                                                    readonly description: "Name of the swap venue";
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly smart_swap_in: {
                                                        readonly description: "Specification of a smart swap in operation";
                                                        readonly properties: {
                                                            readonly swap_venue: {
                                                                readonly description: "A venue on which swaps can be exceuted";
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain-id of the swap venue";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly name: {
                                                                        readonly description: "Name of the swap venue";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly swap_routes: {
                                                                readonly description: "Routes to execute the swap";
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly properties: {
                                                                        readonly swap_amount_in: {
                                                                            readonly description: "Amount to swap in";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly denom_in: {
                                                                            readonly description: "Denom in of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly swap_operations: {
                                                                            readonly description: "Operations required to execute the swap route";
                                                                            readonly type: "array";
                                                                            readonly items: {
                                                                                readonly description: "Description of a single swap operation";
                                                                                readonly type: "object";
                                                                                readonly properties: {
                                                                                    readonly denom_in: {
                                                                                        readonly description: "Input denom of the swap";
                                                                                        readonly type: "string";
                                                                                    };
                                                                                    readonly denom_out: {
                                                                                        readonly description: "Output denom of the swap";
                                                                                        readonly type: "string";
                                                                                    };
                                                                                    readonly pool: {
                                                                                        readonly description: "Identifier of the pool to use for the swap";
                                                                                        readonly type: "string";
                                                                                    };
                                                                                    readonly interface: {
                                                                                        readonly description: "Optional dditional metadata a swap adapter may require";
                                                                                        readonly type: readonly ["string", "null"];
                                                                                    };
                                                                                };
                                                                            };
                                                                        };
                                                                    };
                                                                    readonly type: "object";
                                                                };
                                                            };
                                                        };
                                                        readonly type: "object";
                                                    };
                                                    readonly estimated_affiliate_fee: {
                                                        readonly description: "Estimated total affiliate fee generated by the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly chain_id: {
                                                        readonly description: "Chain id that the swap will be executed on";
                                                        readonly type: "string";
                                                    };
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                                        readonly type: "string";
                                                    };
                                                    readonly denom_in: {
                                                        readonly description: "Input denom of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly denom_out: {
                                                        readonly description: "Output denom of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly swap_venues: {
                                                        readonly description: "Swap venues that the swap will route through";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly description: "A venue on which swaps can be exceuted";
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly chain_id: {
                                                                    readonly description: "Chain-id of the swap venue";
                                                                    readonly type: "string";
                                                                };
                                                                readonly name: {
                                                                    readonly description: "Name of the swap venue";
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            }];
                                            readonly type: "object";
                                        };
                                        readonly tx_index: {
                                            readonly description: "Index of the tx returned from Msgs that executes this operation";
                                            readonly type: "integer";
                                        };
                                        readonly amount_in: {
                                            readonly description: "Amount of input asset to this operation";
                                            readonly type: "string";
                                        };
                                        readonly amount_out: {
                                            readonly description: "Amount of output asset from this operation";
                                            readonly type: "string";
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly axelar_transfer: {
                                            readonly description: "A transfer facilitated by the Axelar bridge";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly asset: {
                                                    readonly description: "Axelar-name of the asset to bridge";
                                                    readonly type: "string";
                                                };
                                                readonly fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the Axelar bridge fee. This is denominated in the fee asset.";
                                                    readonly type: "string";
                                                };
                                                readonly fee_asset: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly coingecko_id: {
                                                            readonly description: "Coingecko id of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly decimals: {
                                                            readonly description: "Number of decimals used for amounts of the asset";
                                                            readonly type: readonly ["number", "null"];
                                                        };
                                                        readonly denom: {
                                                            readonly description: "Denom of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly description: {
                                                            readonly description: "Description of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly is_cw20: {
                                                            readonly description: "Indicates whether asset is a CW20 token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_evm: {
                                                            readonly description: "Indicates whether asset is an EVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_svm: {
                                                            readonly description: "Indicates whether asset is an SVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly logo_uri: {
                                                            readonly description: "URI pointing to an image of the logo of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly origin_chain_id: {
                                                            readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly origin_denom: {
                                                            readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly recommended_symbol: {
                                                            readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly symbol: {
                                                            readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly token_contract: {
                                                            readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly trace: {
                                                            readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly from_chain: {
                                                    readonly description: "Name for source chain of the bridge transaction used on Axelar";
                                                    readonly type: "string";
                                                };
                                                readonly from_chain_id: {
                                                    readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                                    readonly type: "string";
                                                };
                                                readonly is_testnet: {
                                                    readonly description: "Whether the source and destination chains are both testnets";
                                                    readonly type: "boolean";
                                                };
                                                readonly should_unwrap: {
                                                    readonly description: "Whether to unwrap the asset at the destination chain (from ERC-20 to native)";
                                                    readonly type: "boolean";
                                                };
                                                readonly to_chain: {
                                                    readonly description: "Name for destination chain of the bridge transaction used on Axelar";
                                                    readonly type: "string";
                                                };
                                                readonly to_chain_id: {
                                                    readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                                    readonly type: "string";
                                                };
                                                readonly denom_in: {
                                                    readonly description: "Denom of the input asset";
                                                    readonly type: "string";
                                                };
                                                readonly denom_out: {
                                                    readonly description: "Denom of the output asset";
                                                    readonly type: "string";
                                                };
                                                readonly usd_fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the Axelar bridge fee, converted to USD value";
                                                    readonly type: "string";
                                                };
                                                readonly ibc_transfer_to_axelar: {
                                                    readonly description: "A cross-chain transfer";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly from_chain_id: {
                                                            readonly description: "Chain-id on which the transfer is initiated";
                                                            readonly type: "string";
                                                        };
                                                        readonly to_chain_id: {
                                                            readonly description: "Chain-id on which the transfer is received";
                                                            readonly type: "string";
                                                        };
                                                        readonly channel: {
                                                            readonly description: "Channel to use to initiate the transfer";
                                                            readonly type: "string";
                                                        };
                                                        readonly dest_denom: {
                                                            readonly description: "Denom of the destionation asset of the transfer";
                                                            readonly type: "string";
                                                        };
                                                        readonly pfm_enabled: {
                                                            readonly description: "Whether pfm is enabled on the chain where the transfer is initiated";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly port: {
                                                            readonly description: "Port to use to initiate the transfer";
                                                            readonly type: "string";
                                                        };
                                                        readonly supports_memo: {
                                                            readonly description: "Whether the transfer chain supports a memo";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly denom_in: {
                                                            readonly description: "Denom of the input asset of the transfer";
                                                            readonly type: "string";
                                                        };
                                                        readonly denom_out: {
                                                            readonly description: "Denom of the output asset of the transfer";
                                                            readonly type: "string";
                                                        };
                                                        readonly fee_amount: {
                                                            readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable.";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly usd_fee_amount: {
                                                            readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable, converted to USD value";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly fee_asset: {
                                                            readonly type: readonly ["object", "null"];
                                                            readonly description: "Asset to be paid as the transfer fee if applicable.";
                                                            readonly properties: {
                                                                readonly chain_id: {
                                                                    readonly description: "Chain-id of the asset";
                                                                    readonly type: "string";
                                                                };
                                                                readonly coingecko_id: {
                                                                    readonly description: "Coingecko id of the asset";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly decimals: {
                                                                    readonly description: "Number of decimals used for amounts of the asset";
                                                                    readonly type: readonly ["number", "null"];
                                                                };
                                                                readonly denom: {
                                                                    readonly description: "Denom of the asset";
                                                                    readonly type: "string";
                                                                };
                                                                readonly description: {
                                                                    readonly description: "Description of the asset";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly is_cw20: {
                                                                    readonly description: "Indicates whether asset is a CW20 token";
                                                                    readonly type: "boolean";
                                                                };
                                                                readonly is_evm: {
                                                                    readonly description: "Indicates whether asset is an EVM token";
                                                                    readonly type: "boolean";
                                                                };
                                                                readonly is_svm: {
                                                                    readonly description: "Indicates whether asset is an SVM token";
                                                                    readonly type: "boolean";
                                                                };
                                                                readonly logo_uri: {
                                                                    readonly description: "URI pointing to an image of the logo of the asset";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly name: {
                                                                    readonly description: "Name of the asset";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly origin_chain_id: {
                                                                    readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                                    readonly type: "string";
                                                                };
                                                                readonly origin_denom: {
                                                                    readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                                    readonly type: "string";
                                                                };
                                                                readonly recommended_symbol: {
                                                                    readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly symbol: {
                                                                    readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly token_contract: {
                                                                    readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                                readonly trace: {
                                                                    readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                        };
                                                        readonly bridge_id: {
                                                            readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                            readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                                        };
                                                        readonly smart_relay: {
                                                            readonly type: "boolean";
                                                            readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                                        };
                                                    };
                                                };
                                                readonly bridge_id: {
                                                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                                };
                                                readonly smart_relay: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                                };
                                            };
                                        };
                                        readonly tx_index: {
                                            readonly description: "Index of the tx returned from Msgs that executes this operation";
                                            readonly type: "integer";
                                        };
                                        readonly amount_in: {
                                            readonly description: "Amount of input asset to this operation";
                                            readonly type: "string";
                                        };
                                        readonly amount_out: {
                                            readonly description: "Amount of output asset from this operation";
                                            readonly type: "string";
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly bank_send: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly chain_id: {
                                                    readonly type: "string";
                                                    readonly description: "Chain-id of the chain that the transaction is intended for";
                                                };
                                                readonly denom: {
                                                    readonly type: "string";
                                                    readonly description: "Denom of the asset to send";
                                                };
                                            };
                                        };
                                        readonly tx_index: {
                                            readonly description: "Index of the tx returned from Msgs that executes this operation";
                                            readonly type: "integer";
                                        };
                                        readonly amount_in: {
                                            readonly description: "Amount of input asset to this operation";
                                            readonly type: "string";
                                        };
                                        readonly amount_out: {
                                            readonly description: "Amount of output asset from this operation";
                                            readonly type: "string";
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly cctp_transfer: {
                                            readonly description: "A transfer facilitated by the CCTP bridge";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly from_chain_id: {
                                                    readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                                    readonly type: "string";
                                                };
                                                readonly to_chain_id: {
                                                    readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                                    readonly type: "string";
                                                };
                                                readonly burn_token: {
                                                    readonly description: "Name of the asset to bridge. It will be the erc-20 contract address for EVM chains and `uusdc` for Noble.";
                                                    readonly type: "string";
                                                };
                                                readonly denom_in: {
                                                    readonly description: "Denom of the input asset";
                                                    readonly type: "string";
                                                };
                                                readonly denom_out: {
                                                    readonly description: "Denom of the output asset";
                                                    readonly type: "string";
                                                };
                                                readonly bridge_id: {
                                                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                                };
                                                readonly smart_relay: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                                };
                                            };
                                        };
                                        readonly tx_index: {
                                            readonly description: "Index of the tx returned from Msgs that executes this operation";
                                            readonly type: "integer";
                                        };
                                        readonly amount_in: {
                                            readonly description: "Amount of input asset to this operation";
                                            readonly type: "string";
                                        };
                                        readonly amount_out: {
                                            readonly description: "Amount of output asset from this operation";
                                            readonly type: "string";
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly hyperlane_transfer: {
                                            readonly description: "A transfer facilitated by the Hyperlane bridge";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly from_chain_id: {
                                                    readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                                    readonly type: "string";
                                                };
                                                readonly to_chain_id: {
                                                    readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                                    readonly type: "string";
                                                };
                                                readonly denom_in: {
                                                    readonly description: "Denom of the input asset";
                                                    readonly type: "string";
                                                };
                                                readonly denom_out: {
                                                    readonly description: "Denom of the output asset";
                                                    readonly type: "string";
                                                };
                                                readonly hyperlane_contract_address: {
                                                    readonly description: "Contract address of the hyperlane warp route contract that initiates the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the Hyperlane bridge fee. This is denominated in the fee asset.";
                                                    readonly type: "string";
                                                };
                                                readonly fee_asset: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly coingecko_id: {
                                                            readonly description: "Coingecko id of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly decimals: {
                                                            readonly description: "Number of decimals used for amounts of the asset";
                                                            readonly type: readonly ["number", "null"];
                                                        };
                                                        readonly denom: {
                                                            readonly description: "Denom of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly description: {
                                                            readonly description: "Description of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly is_cw20: {
                                                            readonly description: "Indicates whether asset is a CW20 token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_evm: {
                                                            readonly description: "Indicates whether asset is an EVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_svm: {
                                                            readonly description: "Indicates whether asset is an SVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly logo_uri: {
                                                            readonly description: "URI pointing to an image of the logo of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly origin_chain_id: {
                                                            readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly origin_denom: {
                                                            readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly recommended_symbol: {
                                                            readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly symbol: {
                                                            readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly token_contract: {
                                                            readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly trace: {
                                                            readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly usd_fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the Hyperlane bridge fee, converted to USD value";
                                                    readonly type: "string";
                                                };
                                                readonly bridge_id: {
                                                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                                };
                                                readonly smart_relay: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                                };
                                            };
                                        };
                                        readonly tx_index: {
                                            readonly description: "Index of the tx returned from Msgs that executes this operation";
                                            readonly type: "integer";
                                        };
                                        readonly amount_in: {
                                            readonly description: "Amount of input asset to this operation";
                                            readonly type: "string";
                                        };
                                        readonly amount_out: {
                                            readonly description: "Amount of output asset from this operation";
                                            readonly type: "string";
                                        };
                                    };
                                }];
                            };
                            readonly type: "array";
                        };
                        readonly source_asset_chain_id: {
                            readonly description: "Chain-id of the source asset";
                            readonly type: "string";
                        };
                        readonly source_asset_denom: {
                            readonly description: "Denom of the source asset";
                            readonly type: "string";
                        };
                        readonly swap_venue: {
                            readonly description: "A venue on which swaps can be exceuted";
                            readonly type: "object";
                            readonly properties: {
                                readonly chain_id: {
                                    readonly description: "Chain-id of the swap venue";
                                    readonly type: "string";
                                };
                                readonly name: {
                                    readonly description: "Name of the swap venue";
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly txs_required: {
                            readonly description: "Number of transactions required to perform the transfer or swap";
                            readonly type: "integer";
                        };
                        readonly usd_amount_in: {
                            readonly description: "Amount of the source denom, converted to USD value";
                            readonly type: "string";
                        };
                        readonly usd_amount_out: {
                            readonly description: "Amount of the destination denom expected to be received, converted to USD value";
                            readonly type: "string";
                        };
                        readonly swap_price_impact_percent: {
                            readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                            readonly type: readonly ["string", "null"];
                        };
                        readonly warning: {
                            readonly description: "Indicates if the route is unsafe due to poor execution price or if safety cannot be determined due to lack of pricing information";
                            readonly type: readonly ["object", "null"];
                            readonly properties: {
                                readonly type: {
                                    readonly description: "Recommendation reason: <br/> * LOW_INFO_WARNING - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_WARNING - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_WARNING` `BAD_PRICE_WARNING`";
                                    readonly enum: readonly ["LOW_INFO_WARNING", "BAD_PRICE_WARNING"];
                                    readonly type: "string";
                                };
                                readonly message: {
                                    readonly description: "Warning message";
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly estimated_fees: {
                            readonly description: "Indicates fees incurred in the execution of the transfer";
                            readonly items: {
                                readonly properties: {
                                    readonly fee_type: {
                                        readonly description: "Fee type: <br/> * SMART_RELAY - Fees for Smart relaying services.\n\n`SMART_RELAY`";
                                        readonly enum: readonly ["SMART_RELAY"];
                                        readonly type: "string";
                                    };
                                    readonly bridge_id: {
                                        readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                        readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                    };
                                    readonly amount: {
                                        readonly description: "Amount of the fee asset to be paid";
                                        readonly type: "string";
                                    };
                                    readonly usd_amount: {
                                        readonly description: "The value of the fee in USD";
                                        readonly type: "string";
                                    };
                                    readonly origin_asset: {
                                        readonly properties: {
                                            readonly chain_id: {
                                                readonly description: "Chain-id of the asset";
                                                readonly type: "string";
                                            };
                                            readonly coingecko_id: {
                                                readonly description: "Coingecko id of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly decimals: {
                                                readonly description: "Number of decimals used for amounts of the asset";
                                                readonly type: readonly ["number", "null"];
                                            };
                                            readonly denom: {
                                                readonly description: "Denom of the asset";
                                                readonly type: "string";
                                            };
                                            readonly description: {
                                                readonly description: "Description of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly is_cw20: {
                                                readonly description: "Indicates whether asset is a CW20 token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_evm: {
                                                readonly description: "Indicates whether asset is an EVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_svm: {
                                                readonly description: "Indicates whether asset is an SVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly logo_uri: {
                                                readonly description: "URI pointing to an image of the logo of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly name: {
                                                readonly description: "Name of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly origin_chain_id: {
                                                readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly origin_denom: {
                                                readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly recommended_symbol: {
                                                readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly symbol: {
                                                readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly token_contract: {
                                                readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly trace: {
                                                readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                readonly type: "string";
                                            };
                                        };
                                        readonly type: "object";
                                    };
                                    readonly chain_id: {
                                        readonly description: "Chain ID of the chain where fees are collected";
                                        readonly type: "string";
                                    };
                                    readonly tx_index: {
                                        readonly description: "The index of the transaction in the list of transactions required to execute the transfer where fees are paid";
                                        readonly type: "integer";
                                    };
                                    readonly operation_index: {
                                        readonly description: "The index of the operation in the returned operations list which incurs the fee";
                                        readonly type: readonly ["integer", "null"];
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly type: "array";
                        };
                    };
                    readonly type: "object";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMsgsV2: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly source_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the source asset";
                readonly examples: readonly ["uusdc"];
            };
            readonly source_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the source asset";
                readonly examples: readonly ["axelar-dojo-1"];
            };
            readonly dest_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the destination asset";
                readonly examples: readonly ["uatom"];
            };
            readonly dest_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the destination asset";
                readonly examples: readonly ["cosmoshub-4"];
            };
            readonly amount_in: {
                readonly type: "string";
                readonly description: "Amount of source asset to be transferred or swapped";
                readonly examples: readonly ["1000000"];
            };
            readonly amount_out: {
                readonly type: "string";
                readonly description: "Amount of destination asset out";
                readonly examples: readonly ["107033"];
            };
            readonly address_list: {
                readonly type: "array";
                readonly description: "Array of receipient and/or sender address for each chain in the path, corresponding to the chain_ids array returned from a route request";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["axelar1x8ad0zyw52mvndh7hlnafrg0gt284ga7u3rez0"];
                };
            };
            readonly operations: {
                readonly type: "array";
                readonly description: "Array of operations required to perform the transfer or swap";
                readonly items: {
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly transfer: {
                                readonly description: "A cross-chain transfer";
                                readonly type: "object";
                                readonly properties: {
                                    readonly from_chain_id: {
                                        readonly description: "Chain-id on which the transfer is initiated";
                                        readonly type: "string";
                                    };
                                    readonly to_chain_id: {
                                        readonly description: "Chain-id on which the transfer is received";
                                        readonly type: "string";
                                    };
                                    readonly channel: {
                                        readonly description: "Channel to use to initiate the transfer";
                                        readonly type: "string";
                                    };
                                    readonly dest_denom: {
                                        readonly description: "Denom of the destionation asset of the transfer";
                                        readonly type: "string";
                                    };
                                    readonly pfm_enabled: {
                                        readonly description: "Whether pfm is enabled on the chain where the transfer is initiated";
                                        readonly type: "boolean";
                                    };
                                    readonly port: {
                                        readonly description: "Port to use to initiate the transfer";
                                        readonly type: "string";
                                    };
                                    readonly supports_memo: {
                                        readonly description: "Whether the transfer chain supports a memo";
                                        readonly type: "boolean";
                                    };
                                    readonly denom_in: {
                                        readonly description: "Denom of the input asset of the transfer";
                                        readonly type: "string";
                                    };
                                    readonly denom_out: {
                                        readonly description: "Denom of the output asset of the transfer";
                                        readonly type: "string";
                                    };
                                    readonly fee_amount: {
                                        readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable.";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly usd_fee_amount: {
                                        readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable, converted to USD value";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly fee_asset: {
                                        readonly type: readonly ["object", "null"];
                                        readonly description: "Asset to be paid as the transfer fee if applicable.";
                                        readonly properties: {
                                            readonly chain_id: {
                                                readonly description: "Chain-id of the asset";
                                                readonly type: "string";
                                            };
                                            readonly coingecko_id: {
                                                readonly description: "Coingecko id of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly decimals: {
                                                readonly description: "Number of decimals used for amounts of the asset";
                                                readonly type: readonly ["number", "null"];
                                            };
                                            readonly denom: {
                                                readonly description: "Denom of the asset";
                                                readonly type: "string";
                                            };
                                            readonly description: {
                                                readonly description: "Description of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly is_cw20: {
                                                readonly description: "Indicates whether asset is a CW20 token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_evm: {
                                                readonly description: "Indicates whether asset is an EVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_svm: {
                                                readonly description: "Indicates whether asset is an SVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly logo_uri: {
                                                readonly description: "URI pointing to an image of the logo of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly name: {
                                                readonly description: "Name of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly origin_chain_id: {
                                                readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly origin_denom: {
                                                readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly recommended_symbol: {
                                                readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly symbol: {
                                                readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly token_contract: {
                                                readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly trace: {
                                                readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly bridge_id: {
                                        readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                        readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                    };
                                    readonly smart_relay: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                    };
                                };
                            };
                            readonly tx_index: {
                                readonly description: "Index of the tx returned from Msgs that executes this operation";
                                readonly type: "integer";
                            };
                            readonly amount_in: {
                                readonly description: "Amount of input asset to this operation";
                                readonly type: "string";
                                readonly examples: readonly ["1000000"];
                            };
                            readonly amount_out: {
                                readonly description: "Amount of output asset from this operation";
                                readonly type: "string";
                                readonly examples: readonly ["107033"];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly swap: {
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly swap_in: {
                                            readonly description: "Specification of a swap with an exact amount in";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly swap_amount_in: {
                                                    readonly description: "Amount to swap in";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly swap_operations: {
                                                    readonly description: "Operations required to execute the swap";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly description: "Description of a single swap operation";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly denom_in: {
                                                                readonly description: "Input denom of the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly denom_out: {
                                                                readonly description: "Output denom of the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly pool: {
                                                                readonly description: "Identifier of the pool to use for the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly interface: {
                                                                readonly description: "Optional dditional metadata a swap adapter may require";
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly swap_venue: {
                                                    readonly description: "A venue on which swaps can be exceuted";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly price_impact_percent: {
                                                    readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                        };
                                        readonly estimated_affiliate_fee: {
                                            readonly description: "Estimated total affiliate fee generated by the swap";
                                            readonly type: "string";
                                        };
                                        readonly chain_id: {
                                            readonly description: "Chain id that the swap will be executed on";
                                            readonly type: "string";
                                        };
                                        readonly from_chain_id: {
                                            readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                            readonly type: "string";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Input denom of the swap";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Output denom of the swap";
                                            readonly type: "string";
                                        };
                                        readonly swap_venues: {
                                            readonly description: "Swap venues that the swap will route through";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "A venue on which swaps can be exceuted";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly chain_id: {
                                                        readonly description: "Chain-id of the swap venue";
                                                        readonly type: "string";
                                                    };
                                                    readonly name: {
                                                        readonly description: "Name of the swap venue";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly swap_out: {
                                            readonly description: "Specification of a swap with an exact amount out";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly swap_amount_out: {
                                                    readonly description: "Amount to get out of the swap";
                                                    readonly type: "string";
                                                };
                                                readonly swap_operations: {
                                                    readonly description: "Operations required to execute the swap";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly description: "Description of a single swap operation";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly denom_in: {
                                                                readonly description: "Input denom of the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly denom_out: {
                                                                readonly description: "Output denom of the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly pool: {
                                                                readonly description: "Identifier of the pool to use for the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly interface: {
                                                                readonly description: "Optional dditional metadata a swap adapter may require";
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly swap_venue: {
                                                    readonly description: "A venue on which swaps can be exceuted";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly price_impact_percent: {
                                                    readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                        };
                                        readonly estimated_affiliate_fee: {
                                            readonly description: "Estimated total affiliate fee generated by the swap";
                                            readonly type: "string";
                                        };
                                        readonly chain_id: {
                                            readonly description: "Chain id that the swap will be executed on";
                                            readonly type: "string";
                                        };
                                        readonly from_chain_id: {
                                            readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                            readonly type: "string";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Input denom of the swap";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Output denom of the swap";
                                            readonly type: "string";
                                        };
                                        readonly swap_venues: {
                                            readonly description: "Swap venues that the swap will route through";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "A venue on which swaps can be exceuted";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly chain_id: {
                                                        readonly description: "Chain-id of the swap venue";
                                                        readonly type: "string";
                                                    };
                                                    readonly name: {
                                                        readonly description: "Name of the swap venue";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly smart_swap_in: {
                                            readonly description: "Specification of a smart swap in operation";
                                            readonly properties: {
                                                readonly swap_venue: {
                                                    readonly description: "A venue on which swaps can be exceuted";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly swap_routes: {
                                                    readonly description: "Routes to execute the swap";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly properties: {
                                                            readonly swap_amount_in: {
                                                                readonly description: "Amount to swap in";
                                                                readonly type: "string";
                                                            };
                                                            readonly denom_in: {
                                                                readonly description: "Denom in of the swap";
                                                                readonly type: "string";
                                                            };
                                                            readonly swap_operations: {
                                                                readonly description: "Operations required to execute the swap route";
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly description: "Description of a single swap operation";
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly denom_in: {
                                                                            readonly description: "Input denom of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly denom_out: {
                                                                            readonly description: "Output denom of the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly pool: {
                                                                            readonly description: "Identifier of the pool to use for the swap";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly interface: {
                                                                            readonly description: "Optional dditional metadata a swap adapter may require";
                                                                            readonly type: readonly ["string", "null"];
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        readonly type: "object";
                                                    };
                                                };
                                            };
                                            readonly type: "object";
                                        };
                                        readonly estimated_affiliate_fee: {
                                            readonly description: "Estimated total affiliate fee generated by the swap";
                                            readonly type: "string";
                                        };
                                        readonly chain_id: {
                                            readonly description: "Chain id that the swap will be executed on";
                                            readonly type: "string";
                                        };
                                        readonly from_chain_id: {
                                            readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                            readonly type: "string";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Input denom of the swap";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Output denom of the swap";
                                            readonly type: "string";
                                        };
                                        readonly swap_venues: {
                                            readonly description: "Swap venues that the swap will route through";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "A venue on which swaps can be exceuted";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly chain_id: {
                                                        readonly description: "Chain-id of the swap venue";
                                                        readonly type: "string";
                                                    };
                                                    readonly name: {
                                                        readonly description: "Name of the swap venue";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                }];
                                readonly type: "object";
                            };
                            readonly tx_index: {
                                readonly description: "Index of the tx returned from Msgs that executes this operation";
                                readonly type: "integer";
                            };
                            readonly amount_in: {
                                readonly description: "Amount of input asset to this operation";
                                readonly type: "string";
                                readonly examples: readonly ["1000000"];
                            };
                            readonly amount_out: {
                                readonly description: "Amount of output asset from this operation";
                                readonly type: "string";
                                readonly examples: readonly ["107033"];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly axelar_transfer: {
                                readonly description: "A transfer facilitated by the Axelar bridge";
                                readonly type: "object";
                                readonly properties: {
                                    readonly asset: {
                                        readonly description: "Axelar-name of the asset to bridge";
                                        readonly type: "string";
                                    };
                                    readonly fee_amount: {
                                        readonly description: "Amount of the fee asset to be paid as the Axelar bridge fee. This is denominated in the fee asset.";
                                        readonly type: "string";
                                    };
                                    readonly fee_asset: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly chain_id: {
                                                readonly description: "Chain-id of the asset";
                                                readonly type: "string";
                                            };
                                            readonly coingecko_id: {
                                                readonly description: "Coingecko id of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly decimals: {
                                                readonly description: "Number of decimals used for amounts of the asset";
                                                readonly type: readonly ["number", "null"];
                                            };
                                            readonly denom: {
                                                readonly description: "Denom of the asset";
                                                readonly type: "string";
                                            };
                                            readonly description: {
                                                readonly description: "Description of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly is_cw20: {
                                                readonly description: "Indicates whether asset is a CW20 token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_evm: {
                                                readonly description: "Indicates whether asset is an EVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_svm: {
                                                readonly description: "Indicates whether asset is an SVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly logo_uri: {
                                                readonly description: "URI pointing to an image of the logo of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly name: {
                                                readonly description: "Name of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly origin_chain_id: {
                                                readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly origin_denom: {
                                                readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly recommended_symbol: {
                                                readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly symbol: {
                                                readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly token_contract: {
                                                readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly trace: {
                                                readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly from_chain: {
                                        readonly description: "Name for source chain of the bridge transaction used on Axelar";
                                        readonly type: "string";
                                    };
                                    readonly from_chain_id: {
                                        readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                        readonly type: "string";
                                    };
                                    readonly is_testnet: {
                                        readonly description: "Whether the source and destination chains are both testnets";
                                        readonly type: "boolean";
                                    };
                                    readonly should_unwrap: {
                                        readonly description: "Whether to unwrap the asset at the destination chain (from ERC-20 to native)";
                                        readonly type: "boolean";
                                    };
                                    readonly to_chain: {
                                        readonly description: "Name for destination chain of the bridge transaction used on Axelar";
                                        readonly type: "string";
                                    };
                                    readonly to_chain_id: {
                                        readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                        readonly type: "string";
                                    };
                                    readonly denom_in: {
                                        readonly description: "Denom of the input asset";
                                        readonly type: "string";
                                    };
                                    readonly denom_out: {
                                        readonly description: "Denom of the output asset";
                                        readonly type: "string";
                                    };
                                    readonly usd_fee_amount: {
                                        readonly description: "Amount of the fee asset to be paid as the Axelar bridge fee, converted to USD value";
                                        readonly type: "string";
                                    };
                                    readonly ibc_transfer_to_axelar: {
                                        readonly description: "A cross-chain transfer";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly from_chain_id: {
                                                readonly description: "Chain-id on which the transfer is initiated";
                                                readonly type: "string";
                                            };
                                            readonly to_chain_id: {
                                                readonly description: "Chain-id on which the transfer is received";
                                                readonly type: "string";
                                            };
                                            readonly channel: {
                                                readonly description: "Channel to use to initiate the transfer";
                                                readonly type: "string";
                                            };
                                            readonly dest_denom: {
                                                readonly description: "Denom of the destionation asset of the transfer";
                                                readonly type: "string";
                                            };
                                            readonly pfm_enabled: {
                                                readonly description: "Whether pfm is enabled on the chain where the transfer is initiated";
                                                readonly type: "boolean";
                                            };
                                            readonly port: {
                                                readonly description: "Port to use to initiate the transfer";
                                                readonly type: "string";
                                            };
                                            readonly supports_memo: {
                                                readonly description: "Whether the transfer chain supports a memo";
                                                readonly type: "boolean";
                                            };
                                            readonly denom_in: {
                                                readonly description: "Denom of the input asset of the transfer";
                                                readonly type: "string";
                                            };
                                            readonly denom_out: {
                                                readonly description: "Denom of the output asset of the transfer";
                                                readonly type: "string";
                                            };
                                            readonly fee_amount: {
                                                readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable.";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly usd_fee_amount: {
                                                readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable, converted to USD value";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly fee_asset: {
                                                readonly type: readonly ["object", "null"];
                                                readonly description: "Asset to be paid as the transfer fee if applicable.";
                                                readonly properties: {
                                                    readonly chain_id: {
                                                        readonly description: "Chain-id of the asset";
                                                        readonly type: "string";
                                                    };
                                                    readonly coingecko_id: {
                                                        readonly description: "Coingecko id of the asset";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly decimals: {
                                                        readonly description: "Number of decimals used for amounts of the asset";
                                                        readonly type: readonly ["number", "null"];
                                                    };
                                                    readonly denom: {
                                                        readonly description: "Denom of the asset";
                                                        readonly type: "string";
                                                    };
                                                    readonly description: {
                                                        readonly description: "Description of the asset";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly is_cw20: {
                                                        readonly description: "Indicates whether asset is a CW20 token";
                                                        readonly type: "boolean";
                                                    };
                                                    readonly is_evm: {
                                                        readonly description: "Indicates whether asset is an EVM token";
                                                        readonly type: "boolean";
                                                    };
                                                    readonly is_svm: {
                                                        readonly description: "Indicates whether asset is an SVM token";
                                                        readonly type: "boolean";
                                                    };
                                                    readonly logo_uri: {
                                                        readonly description: "URI pointing to an image of the logo of the asset";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly name: {
                                                        readonly description: "Name of the asset";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly origin_chain_id: {
                                                        readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                        readonly type: "string";
                                                    };
                                                    readonly origin_denom: {
                                                        readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                        readonly type: "string";
                                                    };
                                                    readonly recommended_symbol: {
                                                        readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly symbol: {
                                                        readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly token_contract: {
                                                        readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly trace: {
                                                        readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                            readonly bridge_id: {
                                                readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                            };
                                            readonly smart_relay: {
                                                readonly type: "boolean";
                                                readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                            };
                                        };
                                    };
                                    readonly bridge_id: {
                                        readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                        readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                    };
                                    readonly smart_relay: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                    };
                                };
                            };
                            readonly tx_index: {
                                readonly description: "Index of the tx returned from Msgs that executes this operation";
                                readonly type: "integer";
                            };
                            readonly amount_in: {
                                readonly description: "Amount of input asset to this operation";
                                readonly type: "string";
                                readonly examples: readonly ["1000000"];
                            };
                            readonly amount_out: {
                                readonly description: "Amount of output asset from this operation";
                                readonly type: "string";
                                readonly examples: readonly ["107033"];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly bank_send: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly type: "string";
                                        readonly description: "Chain-id of the chain that the transaction is intended for";
                                    };
                                    readonly denom: {
                                        readonly type: "string";
                                        readonly description: "Denom of the asset to send";
                                    };
                                };
                            };
                            readonly tx_index: {
                                readonly description: "Index of the tx returned from Msgs that executes this operation";
                                readonly type: "integer";
                            };
                            readonly amount_in: {
                                readonly description: "Amount of input asset to this operation";
                                readonly type: "string";
                                readonly examples: readonly ["1000000"];
                            };
                            readonly amount_out: {
                                readonly description: "Amount of output asset from this operation";
                                readonly type: "string";
                                readonly examples: readonly ["107033"];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly cctp_transfer: {
                                readonly description: "A transfer facilitated by the CCTP bridge";
                                readonly type: "object";
                                readonly properties: {
                                    readonly from_chain_id: {
                                        readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                        readonly type: "string";
                                    };
                                    readonly to_chain_id: {
                                        readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                        readonly type: "string";
                                    };
                                    readonly burn_token: {
                                        readonly description: "Name of the asset to bridge. It will be the erc-20 contract address for EVM chains and `uusdc` for Noble.";
                                        readonly type: "string";
                                    };
                                    readonly denom_in: {
                                        readonly description: "Denom of the input asset";
                                        readonly type: "string";
                                    };
                                    readonly denom_out: {
                                        readonly description: "Denom of the output asset";
                                        readonly type: "string";
                                    };
                                    readonly bridge_id: {
                                        readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                        readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                    };
                                    readonly smart_relay: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                    };
                                };
                            };
                            readonly tx_index: {
                                readonly description: "Index of the tx returned from Msgs that executes this operation";
                                readonly type: "integer";
                            };
                            readonly amount_in: {
                                readonly description: "Amount of input asset to this operation";
                                readonly type: "string";
                                readonly examples: readonly ["1000000"];
                            };
                            readonly amount_out: {
                                readonly description: "Amount of output asset from this operation";
                                readonly type: "string";
                                readonly examples: readonly ["107033"];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly hyperlane_transfer: {
                                readonly description: "A transfer facilitated by the Hyperlane bridge";
                                readonly type: "object";
                                readonly properties: {
                                    readonly from_chain_id: {
                                        readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                        readonly type: "string";
                                    };
                                    readonly to_chain_id: {
                                        readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                        readonly type: "string";
                                    };
                                    readonly denom_in: {
                                        readonly description: "Denom of the input asset";
                                        readonly type: "string";
                                    };
                                    readonly denom_out: {
                                        readonly description: "Denom of the output asset";
                                        readonly type: "string";
                                    };
                                    readonly hyperlane_contract_address: {
                                        readonly description: "Contract address of the hyperlane warp route contract that initiates the transfer";
                                        readonly type: "string";
                                    };
                                    readonly fee_amount: {
                                        readonly description: "Amount of the fee asset to be paid as the Hyperlane bridge fee. This is denominated in the fee asset.";
                                        readonly type: "string";
                                    };
                                    readonly fee_asset: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly chain_id: {
                                                readonly description: "Chain-id of the asset";
                                                readonly type: "string";
                                            };
                                            readonly coingecko_id: {
                                                readonly description: "Coingecko id of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly decimals: {
                                                readonly description: "Number of decimals used for amounts of the asset";
                                                readonly type: readonly ["number", "null"];
                                            };
                                            readonly denom: {
                                                readonly description: "Denom of the asset";
                                                readonly type: "string";
                                            };
                                            readonly description: {
                                                readonly description: "Description of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly is_cw20: {
                                                readonly description: "Indicates whether asset is a CW20 token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_evm: {
                                                readonly description: "Indicates whether asset is an EVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly is_svm: {
                                                readonly description: "Indicates whether asset is an SVM token";
                                                readonly type: "boolean";
                                            };
                                            readonly logo_uri: {
                                                readonly description: "URI pointing to an image of the logo of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly name: {
                                                readonly description: "Name of the asset";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly origin_chain_id: {
                                                readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly origin_denom: {
                                                readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                readonly type: "string";
                                            };
                                            readonly recommended_symbol: {
                                                readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly symbol: {
                                                readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly token_contract: {
                                                readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly trace: {
                                                readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly usd_fee_amount: {
                                        readonly description: "Amount of the fee asset to be paid as the Hyperlane bridge fee, converted to USD value";
                                        readonly type: "string";
                                    };
                                    readonly bridge_id: {
                                        readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                        readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                    };
                                    readonly smart_relay: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                    };
                                };
                            };
                            readonly tx_index: {
                                readonly description: "Index of the tx returned from Msgs that executes this operation";
                                readonly type: "integer";
                            };
                            readonly amount_in: {
                                readonly description: "Amount of input asset to this operation";
                                readonly type: "string";
                                readonly examples: readonly ["1000000"];
                            };
                            readonly amount_out: {
                                readonly description: "Amount of output asset from this operation";
                                readonly type: "string";
                                readonly examples: readonly ["107033"];
                            };
                        };
                    }];
                };
            };
            readonly slippage_tolerance_percent: {
                readonly type: "string";
                readonly description: "Percent tolerance for slippage on swap, if a swap is performed";
                readonly examples: readonly ["1"];
            };
            readonly timeout_seconds: {
                readonly type: "string";
                readonly description: "Number of seconds for the IBC transfer timeout, defaults to 5 minutes";
            };
            readonly post_route_handler: {
                readonly oneOf: readonly [{
                    readonly properties: {
                        readonly wasm_msg: {
                            readonly properties: {
                                readonly contract_address: {
                                    readonly description: "Address of the contract to execute the message on";
                                    readonly type: "string";
                                };
                                readonly msg: {
                                    readonly description: "JSON string of the message";
                                    readonly type: "string";
                                };
                            };
                            readonly type: "object";
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly properties: {
                        readonly autpilot_msg: {
                            readonly properties: {
                                readonly action: {
                                    readonly enum: readonly ["LIQUID_STAKE", "CLAIM"];
                                    readonly type: "string";
                                };
                                readonly receiver: {
                                    readonly type: "string";
                                };
                            };
                            readonly type: "object";
                        };
                    };
                    readonly type: "object";
                }];
            };
            readonly affiliates: {
                readonly type: "array";
                readonly description: "Array of affiliates to send affiliate fees";
                readonly items: {
                    readonly description: "An affiliate that receives fees from a swap";
                    readonly properties: {
                        readonly address: {
                            readonly description: "Address to which to pay the fee";
                            readonly type: "string";
                        };
                        readonly basis_points_fee: {
                            readonly description: "Bps fee to pay to the affiliate";
                            readonly type: "string";
                        };
                    };
                    readonly type: "object";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly msgs: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly properties: {
                                readonly multi_chain_msg: {
                                    readonly description: "A message that interacts with multiple chains";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction containing the message is intended for";
                                            readonly type: "string";
                                        };
                                        readonly msg: {
                                            readonly description: "JSON string of the message";
                                            readonly type: "string";
                                        };
                                        readonly msg_type_url: {
                                            readonly description: "TypeUrl of the message";
                                            readonly type: "string";
                                        };
                                        readonly path: {
                                            readonly description: "Path of chain-ids that the message is intended to interact with";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly type: "array";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly properties: {
                                readonly evm_tx: {
                                    readonly description: "A transaction on an EVM chain";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly data: {
                                            readonly description: "Data of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly required_erc20_approvals: {
                                            readonly description: "ERC20 approvals required for the transaction";
                                            readonly items: {
                                                readonly description: "An ERC20 token contract approval";
                                                readonly properties: {
                                                    readonly amount: {
                                                        readonly description: "Amount of the approval";
                                                        readonly type: "string";
                                                    };
                                                    readonly spender: {
                                                        readonly description: "Address of the spender";
                                                        readonly type: "string";
                                                    };
                                                    readonly token_contract: {
                                                        readonly description: "Address of the ERC20 token contract";
                                                        readonly type: "string";
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                            readonly type: "array";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly to: {
                                            readonly description: "Address of the recipient of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly value: {
                                            readonly description: "Amount of the transaction";
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly properties: {
                                readonly svm_tx: {
                                    readonly description: "A transaction on an SVM chain";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly tx: {
                                            readonly description: "Base64 encoded unsigned or partially signed transaction";
                                            readonly type: "string";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                            readonly type: "object";
                        }];
                    };
                };
                readonly txs: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly properties: {
                                readonly cosmos_tx: {
                                    readonly description: "A transaction on a Cosmos chain";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly path: {
                                            readonly description: "Path of chain-ids that the message is intended to interact with";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly type: "array";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly msgs: {
                                            readonly description: "The messages that should be included in the transaction. The ordering must be adhered to.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "A message in a cosmos transaction";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly msg: {
                                                        readonly description: "JSON string of the message";
                                                        readonly type: "string";
                                                    };
                                                    readonly msg_type_url: {
                                                        readonly description: "TypeUrl of the message";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly type: "object";
                                };
                                readonly operations_indices: {
                                    readonly description: "Array of indices of the operations that this transaction executes";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "integer";
                                    };
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly evm_tx: {
                                    readonly description: "A transaction on an EVM chain";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly data: {
                                            readonly description: "Data of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly required_erc20_approvals: {
                                            readonly description: "ERC20 approvals required for the transaction";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly description: "An ERC20 token contract approval";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly amount: {
                                                        readonly description: "Amount of the approval";
                                                        readonly type: "string";
                                                    };
                                                    readonly spender: {
                                                        readonly description: "Address of the spender";
                                                        readonly type: "string";
                                                    };
                                                    readonly token_contract: {
                                                        readonly description: "Address of the ERC20 token contract";
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly to: {
                                            readonly description: "Address of the recipient of the transaction";
                                            readonly type: "string";
                                        };
                                        readonly value: {
                                            readonly description: "Amount of the transaction";
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly operations_indices: {
                                    readonly description: "Array of indices of the operations that this transaction executes";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "integer";
                                    };
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly svm_tx: {
                                    readonly description: "A transaction on an SVM chain";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                            readonly type: "string";
                                        };
                                        readonly signer_address: {
                                            readonly description: "The address of the wallet that will sign this transaction";
                                            readonly type: "string";
                                        };
                                        readonly tx: {
                                            readonly description: "Base64 encoded unsigned or partially signed transaction";
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly operations_indices: {
                                    readonly description: "Array of indices of the operations that this transaction executes";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "integer";
                                    };
                                };
                            };
                        }];
                    };
                };
                readonly estimated_fees: {
                    readonly description: "Indicates fees incurred in the execution of the transfer";
                    readonly items: {
                        readonly properties: {
                            readonly fee_type: {
                                readonly description: "Fee type: <br/> * SMART_RELAY - Fees for Smart relaying services.\n\n`SMART_RELAY`";
                                readonly enum: readonly ["SMART_RELAY"];
                                readonly type: "string";
                            };
                            readonly bridge_id: {
                                readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                            };
                            readonly amount: {
                                readonly description: "Amount of the fee asset to be paid";
                                readonly type: "string";
                            };
                            readonly usd_amount: {
                                readonly description: "The value of the fee in USD";
                                readonly type: "string";
                            };
                            readonly origin_asset: {
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly description: "Chain-id of the asset";
                                        readonly type: "string";
                                    };
                                    readonly coingecko_id: {
                                        readonly description: "Coingecko id of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly decimals: {
                                        readonly description: "Number of decimals used for amounts of the asset";
                                        readonly type: readonly ["number", "null"];
                                    };
                                    readonly denom: {
                                        readonly description: "Denom of the asset";
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly description: "Description of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly is_cw20: {
                                        readonly description: "Indicates whether asset is a CW20 token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_evm: {
                                        readonly description: "Indicates whether asset is an EVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_svm: {
                                        readonly description: "Indicates whether asset is an SVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly logo_uri: {
                                        readonly description: "URI pointing to an image of the logo of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly description: "Name of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly origin_chain_id: {
                                        readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly origin_denom: {
                                        readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly recommended_symbol: {
                                        readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly symbol: {
                                        readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly token_contract: {
                                        readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly trace: {
                                        readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                        readonly type: "string";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly chain_id: {
                                readonly description: "Chain ID of the chain where fees are collected";
                                readonly type: "string";
                            };
                            readonly tx_index: {
                                readonly description: "The index of the transaction in the list of transactions required to execute the transfer where fees are paid";
                                readonly type: "integer";
                            };
                            readonly operation_index: {
                                readonly description: "The index of the operation in the returned operations list which incurs the fee";
                                readonly type: readonly ["integer", "null"];
                            };
                        };
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetOriginAssets: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly assets: {
                readonly type: "array";
                readonly description: "Array of assets to get origin assets for";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly denom: {
                            readonly type: "string";
                            readonly description: "Denom of the asset";
                            readonly examples: readonly ["ibc/14F9BC3E44B8A9C1BE1FB08980FAB87034C9905EF17CF2F5008FC085218811CC"];
                        };
                        readonly chain_id: {
                            readonly type: "string";
                            readonly description: "Chain-id of the asset";
                            readonly examples: readonly ["cosmoshub-4"];
                        };
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly origin_assets: {
                    readonly type: "array";
                    readonly items: {
                        readonly properties: {
                            readonly asset: {
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly description: "Chain-id of the asset";
                                        readonly type: "string";
                                    };
                                    readonly coingecko_id: {
                                        readonly description: "Coingecko id of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly decimals: {
                                        readonly description: "Number of decimals used for amounts of the asset";
                                        readonly type: readonly ["number", "null"];
                                    };
                                    readonly denom: {
                                        readonly description: "Denom of the asset";
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly description: "Description of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly is_cw20: {
                                        readonly description: "Indicates whether asset is a CW20 token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_evm: {
                                        readonly description: "Indicates whether asset is an EVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_svm: {
                                        readonly description: "Indicates whether asset is an SVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly logo_uri: {
                                        readonly description: "URI pointing to an image of the logo of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly description: "Name of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly origin_chain_id: {
                                        readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly origin_denom: {
                                        readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly recommended_symbol: {
                                        readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly symbol: {
                                        readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly token_contract: {
                                        readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly trace: {
                                        readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                        readonly type: "string";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly asset_found: {
                                readonly description: "Whether the asset was found";
                                readonly type: "boolean";
                            };
                        };
                        readonly type: "object";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetRouteV2: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amount_in: {
                readonly type: "string";
                readonly description: "Amount of source asset to be transferred or swapped. Only one of amount_in and amount_out should be provided.";
                readonly examples: readonly ["1000000"];
            };
            readonly amount_out: {
                readonly type: "string";
                readonly description: "Amount of destination asset to receive. Only one of amount_in and amount_out should be provided. If amount_out is provided for a swap, the route will be computed to give exactly amount_out.";
            };
            readonly source_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the source asset";
                readonly examples: readonly ["uusdc"];
            };
            readonly source_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the source asset";
                readonly examples: readonly ["axelar-dojo-1"];
            };
            readonly dest_asset_denom: {
                readonly type: "string";
                readonly description: "Denom of the destination asset";
                readonly examples: readonly ["uatom"];
            };
            readonly dest_asset_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the destination asset";
                readonly examples: readonly ["cosmoshub-4"];
            };
            readonly cumulative_affiliate_fee_bps: {
                readonly type: readonly ["string", "null"];
                readonly description: "Cumulative fee to be distributed to affiliates, in bps (optional)";
                readonly examples: readonly ["0"];
            };
            readonly swap_venues: {
                readonly type: "array";
                readonly description: "Swap venues to consider, if provided (optional)";
                readonly items: {
                    readonly description: "A venue on which swaps can be exceuted";
                    readonly properties: {
                        readonly chain_id: {
                            readonly description: "Chain-id of the swap venue";
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly description: "Name of the swap venue";
                            readonly type: "string";
                        };
                    };
                    readonly type: "object";
                };
            };
            readonly allow_multi_tx: {
                readonly type: "boolean";
                readonly description: "Whether to allow route responses requiring multiple transactions";
                readonly examples: readonly [true];
            };
            readonly allow_unsafe: {
                readonly type: "boolean";
                readonly description: "Toggles whether the api should return routes that fail price safety checks.";
            };
            readonly experimental_features: {
                readonly type: "array";
                readonly description: "Array of experimental features to enable";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly bridges: {
                readonly type: "array";
                readonly description: "Array of bridges to use";
                readonly items: {
                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                };
            };
            readonly smart_relay: {
                readonly type: "boolean";
                readonly description: "Indicates whether this transfer route should be relayed via Skip's Smart Relay service - true by default.";
            };
            readonly smart_swap_options: {
                readonly properties: {
                    readonly split_routes: {
                        readonly description: "Indicates whether the swap can be split into multiple swap routes";
                        readonly type: "boolean";
                    };
                };
                readonly type: "object";
            };
            readonly allow_swaps: {
                readonly type: "boolean";
                readonly description: "Whether to allow swaps in the route";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly amount_in: {
                    readonly description: "Amount of source asset to be transferred or swapped";
                    readonly type: "string";
                };
                readonly amount_out: {
                    readonly description: "Amount of destination asset out";
                    readonly type: "string";
                };
                readonly chain_ids: {
                    readonly description: "Chain-ids of all chains of the transfer or swap, in order of usage by operations in the route";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                };
                readonly required_chain_addresses: {
                    readonly description: "All chain-ids that require an address to be provided for, in order of usage by operations in the route";
                };
                readonly dest_asset_chain_id: {
                    readonly description: "Chain-id of the destination asset";
                    readonly type: "string";
                };
                readonly dest_asset_denom: {
                    readonly description: "Denom of the destination asset";
                    readonly type: "string";
                };
                readonly does_swap: {
                    readonly description: "Whether this route performs a swap";
                    readonly type: "boolean";
                };
                readonly estimated_amount_out: {
                    readonly description: "Amount of destination asset out, if a swap is performed";
                    readonly type: "string";
                };
                readonly operations: {
                    readonly description: "Array of operations required to perform the transfer or swap";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly transfer: {
                                    readonly description: "A cross-chain transfer";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly from_chain_id: {
                                            readonly description: "Chain-id on which the transfer is initiated";
                                            readonly type: "string";
                                        };
                                        readonly to_chain_id: {
                                            readonly description: "Chain-id on which the transfer is received";
                                            readonly type: "string";
                                        };
                                        readonly channel: {
                                            readonly description: "Channel to use to initiate the transfer";
                                            readonly type: "string";
                                        };
                                        readonly dest_denom: {
                                            readonly description: "Denom of the destionation asset of the transfer";
                                            readonly type: "string";
                                        };
                                        readonly pfm_enabled: {
                                            readonly description: "Whether pfm is enabled on the chain where the transfer is initiated";
                                            readonly type: "boolean";
                                        };
                                        readonly port: {
                                            readonly description: "Port to use to initiate the transfer";
                                            readonly type: "string";
                                        };
                                        readonly supports_memo: {
                                            readonly description: "Whether the transfer chain supports a memo";
                                            readonly type: "boolean";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Denom of the input asset of the transfer";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Denom of the output asset of the transfer";
                                            readonly type: "string";
                                        };
                                        readonly fee_amount: {
                                            readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable.";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly usd_fee_amount: {
                                            readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable, converted to USD value";
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly fee_asset: {
                                            readonly type: readonly ["object", "null"];
                                            readonly description: "Asset to be paid as the transfer fee if applicable.";
                                            readonly properties: {
                                                readonly chain_id: {
                                                    readonly description: "Chain-id of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly coingecko_id: {
                                                    readonly description: "Coingecko id of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly decimals: {
                                                    readonly description: "Number of decimals used for amounts of the asset";
                                                    readonly type: readonly ["number", "null"];
                                                };
                                                readonly denom: {
                                                    readonly description: "Denom of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly description: {
                                                    readonly description: "Description of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly is_cw20: {
                                                    readonly description: "Indicates whether asset is a CW20 token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_evm: {
                                                    readonly description: "Indicates whether asset is an EVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_svm: {
                                                    readonly description: "Indicates whether asset is an SVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly logo_uri: {
                                                    readonly description: "URI pointing to an image of the logo of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly name: {
                                                    readonly description: "Name of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly origin_chain_id: {
                                                    readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly origin_denom: {
                                                    readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly recommended_symbol: {
                                                    readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly symbol: {
                                                    readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly token_contract: {
                                                    readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly trace: {
                                                    readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                        readonly bridge_id: {
                                            readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                            readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                        };
                                        readonly smart_relay: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                        };
                                    };
                                };
                                readonly tx_index: {
                                    readonly description: "Index of the tx returned from Msgs that executes this operation";
                                    readonly type: "integer";
                                };
                                readonly amount_in: {
                                    readonly description: "Amount of input asset to this operation";
                                    readonly type: "string";
                                };
                                readonly amount_out: {
                                    readonly description: "Amount of output asset from this operation";
                                    readonly type: "string";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly swap: {
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly swap_in: {
                                                readonly description: "Specification of a swap with an exact amount in";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly swap_amount_in: {
                                                        readonly description: "Amount to swap in";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly swap_operations: {
                                                        readonly description: "Operations required to execute the swap";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly description: "Description of a single swap operation";
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly denom_in: {
                                                                    readonly description: "Input denom of the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly denom_out: {
                                                                    readonly description: "Output denom of the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly pool: {
                                                                    readonly description: "Identifier of the pool to use for the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly interface: {
                                                                    readonly description: "Optional dditional metadata a swap adapter may require";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly swap_venue: {
                                                        readonly description: "A venue on which swaps can be exceuted";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly chain_id: {
                                                                readonly description: "Chain-id of the swap venue";
                                                                readonly type: "string";
                                                            };
                                                            readonly name: {
                                                                readonly description: "Name of the swap venue";
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                    readonly price_impact_percent: {
                                                        readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                };
                                            };
                                            readonly estimated_affiliate_fee: {
                                                readonly description: "Estimated total affiliate fee generated by the swap";
                                                readonly type: "string";
                                            };
                                            readonly chain_id: {
                                                readonly description: "Chain id that the swap will be executed on";
                                                readonly type: "string";
                                            };
                                            readonly from_chain_id: {
                                                readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                                readonly type: "string";
                                            };
                                            readonly denom_in: {
                                                readonly description: "Input denom of the swap";
                                                readonly type: "string";
                                            };
                                            readonly denom_out: {
                                                readonly description: "Output denom of the swap";
                                                readonly type: "string";
                                            };
                                            readonly swap_venues: {
                                                readonly description: "Swap venues that the swap will route through";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly description: "A venue on which swaps can be exceuted";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly swap_out: {
                                                readonly description: "Specification of a swap with an exact amount out";
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly swap_amount_out: {
                                                        readonly description: "Amount to get out of the swap";
                                                        readonly type: "string";
                                                    };
                                                    readonly swap_operations: {
                                                        readonly description: "Operations required to execute the swap";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly description: "Description of a single swap operation";
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly denom_in: {
                                                                    readonly description: "Input denom of the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly denom_out: {
                                                                    readonly description: "Output denom of the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly pool: {
                                                                    readonly description: "Identifier of the pool to use for the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly interface: {
                                                                    readonly description: "Optional dditional metadata a swap adapter may require";
                                                                    readonly type: readonly ["string", "null"];
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly swap_venue: {
                                                        readonly description: "A venue on which swaps can be exceuted";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly chain_id: {
                                                                readonly description: "Chain-id of the swap venue";
                                                                readonly type: "string";
                                                            };
                                                            readonly name: {
                                                                readonly description: "Name of the swap venue";
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                    readonly price_impact_percent: {
                                                        readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                };
                                            };
                                            readonly estimated_affiliate_fee: {
                                                readonly description: "Estimated total affiliate fee generated by the swap";
                                                readonly type: "string";
                                            };
                                            readonly chain_id: {
                                                readonly description: "Chain id that the swap will be executed on";
                                                readonly type: "string";
                                            };
                                            readonly from_chain_id: {
                                                readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                                readonly type: "string";
                                            };
                                            readonly denom_in: {
                                                readonly description: "Input denom of the swap";
                                                readonly type: "string";
                                            };
                                            readonly denom_out: {
                                                readonly description: "Output denom of the swap";
                                                readonly type: "string";
                                            };
                                            readonly swap_venues: {
                                                readonly description: "Swap venues that the swap will route through";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly description: "A venue on which swaps can be exceuted";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly smart_swap_in: {
                                                readonly description: "Specification of a smart swap in operation";
                                                readonly properties: {
                                                    readonly swap_venue: {
                                                        readonly description: "A venue on which swaps can be exceuted";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly chain_id: {
                                                                readonly description: "Chain-id of the swap venue";
                                                                readonly type: "string";
                                                            };
                                                            readonly name: {
                                                                readonly description: "Name of the swap venue";
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                    readonly swap_routes: {
                                                        readonly description: "Routes to execute the swap";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly properties: {
                                                                readonly swap_amount_in: {
                                                                    readonly description: "Amount to swap in";
                                                                    readonly type: "string";
                                                                };
                                                                readonly denom_in: {
                                                                    readonly description: "Denom in of the swap";
                                                                    readonly type: "string";
                                                                };
                                                                readonly swap_operations: {
                                                                    readonly description: "Operations required to execute the swap route";
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly description: "Description of a single swap operation";
                                                                        readonly type: "object";
                                                                        readonly properties: {
                                                                            readonly denom_in: {
                                                                                readonly description: "Input denom of the swap";
                                                                                readonly type: "string";
                                                                            };
                                                                            readonly denom_out: {
                                                                                readonly description: "Output denom of the swap";
                                                                                readonly type: "string";
                                                                            };
                                                                            readonly pool: {
                                                                                readonly description: "Identifier of the pool to use for the swap";
                                                                                readonly type: "string";
                                                                            };
                                                                            readonly interface: {
                                                                                readonly description: "Optional dditional metadata a swap adapter may require";
                                                                                readonly type: readonly ["string", "null"];
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly type: "object";
                                                        };
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                            readonly estimated_affiliate_fee: {
                                                readonly description: "Estimated total affiliate fee generated by the swap";
                                                readonly type: "string";
                                            };
                                            readonly chain_id: {
                                                readonly description: "Chain id that the swap will be executed on";
                                                readonly type: "string";
                                            };
                                            readonly from_chain_id: {
                                                readonly description: "Chain id that the swap will be executed on (alias for chain_id)";
                                                readonly type: "string";
                                            };
                                            readonly denom_in: {
                                                readonly description: "Input denom of the swap";
                                                readonly type: "string";
                                            };
                                            readonly denom_out: {
                                                readonly description: "Output denom of the swap";
                                                readonly type: "string";
                                            };
                                            readonly swap_venues: {
                                                readonly description: "Swap venues that the swap will route through";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly description: "A venue on which swaps can be exceuted";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the swap venue";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    }];
                                    readonly type: "object";
                                };
                                readonly tx_index: {
                                    readonly description: "Index of the tx returned from Msgs that executes this operation";
                                    readonly type: "integer";
                                };
                                readonly amount_in: {
                                    readonly description: "Amount of input asset to this operation";
                                    readonly type: "string";
                                };
                                readonly amount_out: {
                                    readonly description: "Amount of output asset from this operation";
                                    readonly type: "string";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly axelar_transfer: {
                                    readonly description: "A transfer facilitated by the Axelar bridge";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly asset: {
                                            readonly description: "Axelar-name of the asset to bridge";
                                            readonly type: "string";
                                        };
                                        readonly fee_amount: {
                                            readonly description: "Amount of the fee asset to be paid as the Axelar bridge fee. This is denominated in the fee asset.";
                                            readonly type: "string";
                                        };
                                        readonly fee_asset: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly chain_id: {
                                                    readonly description: "Chain-id of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly coingecko_id: {
                                                    readonly description: "Coingecko id of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly decimals: {
                                                    readonly description: "Number of decimals used for amounts of the asset";
                                                    readonly type: readonly ["number", "null"];
                                                };
                                                readonly denom: {
                                                    readonly description: "Denom of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly description: {
                                                    readonly description: "Description of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly is_cw20: {
                                                    readonly description: "Indicates whether asset is a CW20 token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_evm: {
                                                    readonly description: "Indicates whether asset is an EVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_svm: {
                                                    readonly description: "Indicates whether asset is an SVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly logo_uri: {
                                                    readonly description: "URI pointing to an image of the logo of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly name: {
                                                    readonly description: "Name of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly origin_chain_id: {
                                                    readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly origin_denom: {
                                                    readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly recommended_symbol: {
                                                    readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly symbol: {
                                                    readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly token_contract: {
                                                    readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly trace: {
                                                    readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                        readonly from_chain: {
                                            readonly description: "Name for source chain of the bridge transaction used on Axelar";
                                            readonly type: "string";
                                        };
                                        readonly from_chain_id: {
                                            readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                            readonly type: "string";
                                        };
                                        readonly is_testnet: {
                                            readonly description: "Whether the source and destination chains are both testnets";
                                            readonly type: "boolean";
                                        };
                                        readonly should_unwrap: {
                                            readonly description: "Whether to unwrap the asset at the destination chain (from ERC-20 to native)";
                                            readonly type: "boolean";
                                        };
                                        readonly to_chain: {
                                            readonly description: "Name for destination chain of the bridge transaction used on Axelar";
                                            readonly type: "string";
                                        };
                                        readonly to_chain_id: {
                                            readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                            readonly type: "string";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Denom of the input asset";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Denom of the output asset";
                                            readonly type: "string";
                                        };
                                        readonly usd_fee_amount: {
                                            readonly description: "Amount of the fee asset to be paid as the Axelar bridge fee, converted to USD value";
                                            readonly type: "string";
                                        };
                                        readonly ibc_transfer_to_axelar: {
                                            readonly description: "A cross-chain transfer";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly from_chain_id: {
                                                    readonly description: "Chain-id on which the transfer is initiated";
                                                    readonly type: "string";
                                                };
                                                readonly to_chain_id: {
                                                    readonly description: "Chain-id on which the transfer is received";
                                                    readonly type: "string";
                                                };
                                                readonly channel: {
                                                    readonly description: "Channel to use to initiate the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly dest_denom: {
                                                    readonly description: "Denom of the destionation asset of the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly pfm_enabled: {
                                                    readonly description: "Whether pfm is enabled on the chain where the transfer is initiated";
                                                    readonly type: "boolean";
                                                };
                                                readonly port: {
                                                    readonly description: "Port to use to initiate the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly supports_memo: {
                                                    readonly description: "Whether the transfer chain supports a memo";
                                                    readonly type: "boolean";
                                                };
                                                readonly denom_in: {
                                                    readonly description: "Denom of the input asset of the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly denom_out: {
                                                    readonly description: "Denom of the output asset of the transfer";
                                                    readonly type: "string";
                                                };
                                                readonly fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable.";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly usd_fee_amount: {
                                                    readonly description: "Amount of the fee asset to be paid as the transfer fee if applicable, converted to USD value";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly fee_asset: {
                                                    readonly type: readonly ["object", "null"];
                                                    readonly description: "Asset to be paid as the transfer fee if applicable.";
                                                    readonly properties: {
                                                        readonly chain_id: {
                                                            readonly description: "Chain-id of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly coingecko_id: {
                                                            readonly description: "Coingecko id of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly decimals: {
                                                            readonly description: "Number of decimals used for amounts of the asset";
                                                            readonly type: readonly ["number", "null"];
                                                        };
                                                        readonly denom: {
                                                            readonly description: "Denom of the asset";
                                                            readonly type: "string";
                                                        };
                                                        readonly description: {
                                                            readonly description: "Description of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly is_cw20: {
                                                            readonly description: "Indicates whether asset is a CW20 token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_evm: {
                                                            readonly description: "Indicates whether asset is an EVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly is_svm: {
                                                            readonly description: "Indicates whether asset is an SVM token";
                                                            readonly type: "boolean";
                                                        };
                                                        readonly logo_uri: {
                                                            readonly description: "URI pointing to an image of the logo of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly name: {
                                                            readonly description: "Name of the asset";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly origin_chain_id: {
                                                            readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly origin_denom: {
                                                            readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                            readonly type: "string";
                                                        };
                                                        readonly recommended_symbol: {
                                                            readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly symbol: {
                                                            readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly token_contract: {
                                                            readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly trace: {
                                                            readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly bridge_id: {
                                                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                                };
                                                readonly smart_relay: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                                };
                                            };
                                        };
                                        readonly bridge_id: {
                                            readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                            readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                        };
                                        readonly smart_relay: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                        };
                                    };
                                };
                                readonly tx_index: {
                                    readonly description: "Index of the tx returned from Msgs that executes this operation";
                                    readonly type: "integer";
                                };
                                readonly amount_in: {
                                    readonly description: "Amount of input asset to this operation";
                                    readonly type: "string";
                                };
                                readonly amount_out: {
                                    readonly description: "Amount of output asset from this operation";
                                    readonly type: "string";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly bank_send: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly chain_id: {
                                            readonly type: "string";
                                            readonly description: "Chain-id of the chain that the transaction is intended for";
                                        };
                                        readonly denom: {
                                            readonly type: "string";
                                            readonly description: "Denom of the asset to send";
                                        };
                                    };
                                };
                                readonly tx_index: {
                                    readonly description: "Index of the tx returned from Msgs that executes this operation";
                                    readonly type: "integer";
                                };
                                readonly amount_in: {
                                    readonly description: "Amount of input asset to this operation";
                                    readonly type: "string";
                                };
                                readonly amount_out: {
                                    readonly description: "Amount of output asset from this operation";
                                    readonly type: "string";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly cctp_transfer: {
                                    readonly description: "A transfer facilitated by the CCTP bridge";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly from_chain_id: {
                                            readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                            readonly type: "string";
                                        };
                                        readonly to_chain_id: {
                                            readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                            readonly type: "string";
                                        };
                                        readonly burn_token: {
                                            readonly description: "Name of the asset to bridge. It will be the erc-20 contract address for EVM chains and `uusdc` for Noble.";
                                            readonly type: "string";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Denom of the input asset";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Denom of the output asset";
                                            readonly type: "string";
                                        };
                                        readonly bridge_id: {
                                            readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                            readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                        };
                                        readonly smart_relay: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                        };
                                    };
                                };
                                readonly tx_index: {
                                    readonly description: "Index of the tx returned from Msgs that executes this operation";
                                    readonly type: "integer";
                                };
                                readonly amount_in: {
                                    readonly description: "Amount of input asset to this operation";
                                    readonly type: "string";
                                };
                                readonly amount_out: {
                                    readonly description: "Amount of output asset from this operation";
                                    readonly type: "string";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly hyperlane_transfer: {
                                    readonly description: "A transfer facilitated by the Hyperlane bridge";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly from_chain_id: {
                                            readonly description: "Canonical chain-id of the source chain of the bridge transaction";
                                            readonly type: "string";
                                        };
                                        readonly to_chain_id: {
                                            readonly description: "Canonical chain-id of the destination chain of the bridge transaction";
                                            readonly type: "string";
                                        };
                                        readonly denom_in: {
                                            readonly description: "Denom of the input asset";
                                            readonly type: "string";
                                        };
                                        readonly denom_out: {
                                            readonly description: "Denom of the output asset";
                                            readonly type: "string";
                                        };
                                        readonly hyperlane_contract_address: {
                                            readonly description: "Contract address of the hyperlane warp route contract that initiates the transfer";
                                            readonly type: "string";
                                        };
                                        readonly fee_amount: {
                                            readonly description: "Amount of the fee asset to be paid as the Hyperlane bridge fee. This is denominated in the fee asset.";
                                            readonly type: "string";
                                        };
                                        readonly fee_asset: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly chain_id: {
                                                    readonly description: "Chain-id of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly coingecko_id: {
                                                    readonly description: "Coingecko id of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly decimals: {
                                                    readonly description: "Number of decimals used for amounts of the asset";
                                                    readonly type: readonly ["number", "null"];
                                                };
                                                readonly denom: {
                                                    readonly description: "Denom of the asset";
                                                    readonly type: "string";
                                                };
                                                readonly description: {
                                                    readonly description: "Description of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly is_cw20: {
                                                    readonly description: "Indicates whether asset is a CW20 token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_evm: {
                                                    readonly description: "Indicates whether asset is an EVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly is_svm: {
                                                    readonly description: "Indicates whether asset is an SVM token";
                                                    readonly type: "boolean";
                                                };
                                                readonly logo_uri: {
                                                    readonly description: "URI pointing to an image of the logo of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly name: {
                                                    readonly description: "Name of the asset";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly origin_chain_id: {
                                                    readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly origin_denom: {
                                                    readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                                    readonly type: "string";
                                                };
                                                readonly recommended_symbol: {
                                                    readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly symbol: {
                                                    readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly token_contract: {
                                                    readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                                    readonly type: readonly ["string", "null"];
                                                };
                                                readonly trace: {
                                                    readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                        readonly usd_fee_amount: {
                                            readonly description: "Amount of the fee asset to be paid as the Hyperlane bridge fee, converted to USD value";
                                            readonly type: "string";
                                        };
                                        readonly bridge_id: {
                                            readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                            readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                        };
                                        readonly smart_relay: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates whether this transfer is relayed via Smart Relay";
                                        };
                                    };
                                };
                                readonly tx_index: {
                                    readonly description: "Index of the tx returned from Msgs that executes this operation";
                                    readonly type: "integer";
                                };
                                readonly amount_in: {
                                    readonly description: "Amount of input asset to this operation";
                                    readonly type: "string";
                                };
                                readonly amount_out: {
                                    readonly description: "Amount of output asset from this operation";
                                    readonly type: "string";
                                };
                            };
                        }];
                    };
                    readonly type: "array";
                };
                readonly source_asset_chain_id: {
                    readonly description: "Chain-id of the source asset";
                    readonly type: "string";
                };
                readonly source_asset_denom: {
                    readonly description: "Denom of the source asset";
                    readonly type: "string";
                };
                readonly swap_venue: {
                    readonly description: "A venue on which swaps can be exceuted";
                    readonly type: "object";
                    readonly properties: {
                        readonly chain_id: {
                            readonly description: "Chain-id of the swap venue";
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly description: "Name of the swap venue";
                            readonly type: "string";
                        };
                    };
                };
                readonly txs_required: {
                    readonly description: "Number of transactions required to perform the transfer or swap";
                    readonly type: "integer";
                };
                readonly usd_amount_in: {
                    readonly description: "Amount of the source denom, converted to USD value";
                    readonly type: "string";
                };
                readonly usd_amount_out: {
                    readonly description: "Amount of the destination denom expected to be received, converted to USD value";
                    readonly type: "string";
                };
                readonly swap_price_impact_percent: {
                    readonly description: "Price impact of the estimated swap, if present.  Measured in percentage e.g. \"0.5\" is .5%";
                    readonly type: readonly ["string", "null"];
                };
                readonly warning: {
                    readonly description: "Indicates if the route is unsafe due to poor execution price or if safety cannot be determined due to lack of pricing information";
                    readonly type: readonly ["object", "null"];
                    readonly properties: {
                        readonly type: {
                            readonly description: "Recommendation reason: <br/> * LOW_INFO_WARNING - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_WARNING - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_WARNING` `BAD_PRICE_WARNING`";
                            readonly enum: readonly ["LOW_INFO_WARNING", "BAD_PRICE_WARNING"];
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly description: "Warning message";
                            readonly type: "string";
                        };
                    };
                };
                readonly estimated_fees: {
                    readonly description: "Indicates fees incurred in the execution of the transfer";
                    readonly items: {
                        readonly properties: {
                            readonly fee_type: {
                                readonly description: "Fee type: <br/> * SMART_RELAY - Fees for Smart relaying services.\n\n`SMART_RELAY`";
                                readonly enum: readonly ["SMART_RELAY"];
                                readonly type: "string";
                            };
                            readonly bridge_id: {
                                readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                            };
                            readonly amount: {
                                readonly description: "Amount of the fee asset to be paid";
                                readonly type: "string";
                            };
                            readonly usd_amount: {
                                readonly description: "The value of the fee in USD";
                                readonly type: "string";
                            };
                            readonly origin_asset: {
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly description: "Chain-id of the asset";
                                        readonly type: "string";
                                    };
                                    readonly coingecko_id: {
                                        readonly description: "Coingecko id of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly decimals: {
                                        readonly description: "Number of decimals used for amounts of the asset";
                                        readonly type: readonly ["number", "null"];
                                    };
                                    readonly denom: {
                                        readonly description: "Denom of the asset";
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly description: "Description of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly is_cw20: {
                                        readonly description: "Indicates whether asset is a CW20 token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_evm: {
                                        readonly description: "Indicates whether asset is an EVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_svm: {
                                        readonly description: "Indicates whether asset is an SVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly logo_uri: {
                                        readonly description: "URI pointing to an image of the logo of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly description: "Name of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly origin_chain_id: {
                                        readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly origin_denom: {
                                        readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly recommended_symbol: {
                                        readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly symbol: {
                                        readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly token_contract: {
                                        readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly trace: {
                                        readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                        readonly type: "string";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly chain_id: {
                                readonly description: "Chain ID of the chain where fees are collected";
                                readonly type: "string";
                            };
                            readonly tx_index: {
                                readonly description: "The index of the transaction in the list of transactions required to execute the transfer where fees are paid";
                                readonly type: "integer";
                            };
                            readonly operation_index: {
                                readonly description: "The index of the operation in the returned operations list which incurs the fee";
                                readonly type: readonly ["integer", "null"];
                            };
                        };
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTransactionStatusV2: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tx_hash: {
                    readonly type: "string";
                    readonly examples: readonly ["EEC65138E6A7BDD047ED0D4BBA249A754F0BBBC7AA976568C4F35A32CD7FB8EB"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Hex encoded hash of the transaction to query for";
                };
                readonly chain_id: {
                    readonly type: "string";
                    readonly examples: readonly ["cosmoshub-4"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Chain ID of the transaction";
                };
            };
            readonly required: readonly ["tx_hash", "chain_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly transfers: {
                    readonly type: "array";
                    readonly items: {
                        readonly properties: {
                            readonly error: {
                                readonly type: readonly ["object", "null"];
                                readonly properties: {
                                    readonly details: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly properties: {
                                                readonly code: {
                                                    readonly description: "Error code";
                                                    readonly type: "number";
                                                };
                                                readonly message: {
                                                    readonly description: "Error message";
                                                    readonly type: "string";
                                                };
                                            };
                                            readonly type: "object";
                                        }];
                                    };
                                    readonly message: {
                                        readonly description: "Error message";
                                        readonly type: "string";
                                    };
                                    readonly type: {
                                        readonly description: "Packet error type: <br/> * STATUS_ERROR_UNKNOWN - Unknown error <br/> * STATUS_ERROR_TRANSACTION_EXECUTION - Error was encountered during transaction execution <br/> * STATUS_ERROR_INDEXING - Error was encountered while indexing the transaction and packet data <br/> * STATUS_ERROR_TRANSFER - The transfer failed to complete successfully <br/>\n\n\n`STATUS_ERROR_UNKNOWN` `STATUS_ERROR_TRANSACTION_EXECUTION` `STATUS_ERROR_INDEXING` `STATUS_ERROR_TRANSFER`";
                                        readonly enum: readonly ["STATUS_ERROR_UNKNOWN", "STATUS_ERROR_TRANSACTION_EXECUTION", "STATUS_ERROR_INDEXING", "STATUS_ERROR_TRANSFER"];
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly next_blocking_transfer: {
                                readonly description: "Indicates which entry in the `transfer_sequence` field that the transfer is blocked on. Will be null if there is no blocked transfer.";
                                readonly properties: {
                                    readonly transfer_sequence_index: {
                                        readonly description: "The index of the entry in the `transfer_sequence` field that the transfer is blocked on.";
                                        readonly type: "integer";
                                    };
                                };
                                readonly type: readonly ["object", "null"];
                            };
                            readonly state: {
                                readonly description: "Transaction state: <br/> * STATE_SUBMITTED - The initial transaction has been submitted to Skip API but not observed on chain yet. <br/> * STATE_PENDING - The initial transaction has been observed on chain, and there are still pending actions. <br/> * STATE_COMPLETED_SUCCESS - The route has completed successfully and the user has their tokens on the destination. (indicated by `transfer_asset_release`) <br/> * STATE_COMPLETED_ERROR - The route errored somewhere and the user has their tokens unlocked in one of their wallets. Their tokens are either on the source chain, an intermediate chain, or the destination chain but as the wrong asset. (Again, `transfer_asset_release` indicates where the tokens are) <br/> * STATE_ABANDONED - Tracking for the transaction has been abandoned. This happens if the cross-chain  sequence of actions stalls for more than 10 minutes or if the initial transaction does not get observed in a block for 5 minutes. <br/> * STATE_PENDING_ERROR - The overall transaction will fail, pending error propagation. \n\n`STATE_SUBMITTED` `STATE_PENDING` `STATE_COMPLETED_SUCCESS` `STATE_COMPLETED_ERROR` `STATE_ABANDONED` `STATE_PENDING_ERROR`";
                                readonly enum: readonly ["STATE_SUBMITTED", "STATE_PENDING", "STATE_COMPLETED_SUCCESS", "STATE_COMPLETED_ERROR", "STATE_ABANDONED", "STATE_PENDING_ERROR"];
                                readonly type: "string";
                            };
                            readonly transfer_asset_release: {
                                readonly description: "Indicates location and denom of transfer asset release.";
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly description: "The chain ID of the chain that the transfer asset is released on.";
                                        readonly type: "string";
                                    };
                                    readonly denom: {
                                        readonly description: "The denom of the asset that is released.";
                                        readonly type: "string";
                                    };
                                    readonly released: {
                                        readonly description: "Indicates whether assets have been released and are accessible. The assets may still be in transit.";
                                    };
                                };
                                readonly type: readonly ["object", "null"];
                            };
                            readonly transfer_sequence: {
                                readonly description: "Lists any IBC and Axelar transfers as they are seen.";
                                readonly items: {
                                    readonly oneOf: readonly [{
                                        readonly properties: {
                                            readonly ibc_transfer: {
                                                readonly properties: {
                                                    readonly to_chain_id: {
                                                        readonly description: "Chain ID of the destination chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly packet_txs: {
                                                        readonly properties: {
                                                            readonly acknowledge_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly error: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly details: {
                                                                        readonly oneOf: readonly [{
                                                                            readonly nullable: true;
                                                                        }, {
                                                                            readonly properties: {
                                                                                readonly code: {
                                                                                    readonly description: "Error code";
                                                                                    readonly type: "number";
                                                                                };
                                                                                readonly message: {
                                                                                    readonly description: "Error message";
                                                                                    readonly type: "string";
                                                                                };
                                                                            };
                                                                            readonly type: "object";
                                                                        }];
                                                                    };
                                                                    readonly message: {
                                                                        readonly description: "Error message";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly type: {
                                                                        readonly description: "Packet error type: <br/> * PACKET_ERROR_UNKNOWN - Unknown error <br/> * PACKET_ERROR_ACKNOWLEDGEMENT - Packet acknowledgement error <br/> * PACKET_ERROR_TIMEOUT - Packet timed out <br/>\n\n\n`PACKET_ERROR_UNKNOWN` `PACKET_ERROR_ACKNOWLEDGEMENT` `PACKET_ERROR_TIMEOUT`";
                                                                        readonly enum: readonly ["PACKET_ERROR_UNKNOWN", "PACKET_ERROR_ACKNOWLEDGEMENT", "PACKET_ERROR_TIMEOUT"];
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly receive_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly send_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly timeout_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        readonly type: "object";
                                                    };
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain ID of the source chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly state: {
                                                        readonly description: "Transfer state: <br/> * TRANSFER_UNKNOWN - Transfer state is not known. <br/> * TRANSFER_PENDING - The send packet for the transfer has been committed and the transfer is pending. <br/> * TRANSFER_RECEIVED - The transfer packet has been received by the destination chain. It can still fail and revert if it is part  of a multi-hop PFM transfer. <br/> * TRANSFER_SUCCESS - The transfer has been successfully completed and will not revert. <br/> * TRANSFER_FAILURE - The transfer has failed. \n\n\n`TRANSFER_UNKNOWN` `TRANSFER_PENDING` `TRANSFER_RECEIVED` `TRANSFER_SUCCESS` `TRANSFER_FAILURE`";
                                                        readonly enum: readonly ["TRANSFER_UNKNOWN", "TRANSFER_PENDING", "TRANSFER_RECEIVED", "TRANSFER_SUCCESS", "TRANSFER_FAILURE"];
                                                        readonly type: "string";
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                        };
                                        readonly type: "object";
                                    }, {
                                        readonly properties: {
                                            readonly axelar_transfer: {
                                                readonly properties: {
                                                    readonly axelar_scan_link: {
                                                        readonly description: "Link to the transaction on the Axelar Scan explorer";
                                                        readonly type: "string";
                                                    };
                                                    readonly to_chain_id: {
                                                        readonly description: "Chain ID of the destination chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain ID of the source chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly state: {
                                                        readonly description: "Axelar transfer state: <br/> * AXELAR_TRANSFER_UNKNOWN - Unknown error <br/> * AXELAR_TRANSFER_PENDING_CONFIRMATION - Axelar transfer is pending confirmation <br/> * AXELAR_TRANSFER_PENDING_RECEIPT - Axelar transfer is pending receipt at destination <br/> * AXELAR_TRANSFER_SUCCESS - Axelar transfer succeeded and assets have been received <br/> * AXELAR_TRANSFER_FAILURE - Axelar transfer failed <br/>\n\n\n`AXELAR_TRANSFER_UNKNOWN` `AXELAR_TRANSFER_PENDING_CONFIRMATION` `AXELAR_TRANSFER_PENDING_RECEIPT` `AXELAR_TRANSFER_SUCCESS` `AXELAR_TRANSFER_FAILURE`";
                                                        readonly enum: readonly ["AXELAR_TRANSFER_UNKNOWN", "AXELAR_TRANSFER_PENDING_CONFIRMATION", "AXELAR_TRANSFER_PENDING_RECEIPT", "AXELAR_TRANSFER_SUCCESS", "AXELAR_TRANSFER_FAILURE"];
                                                        readonly type: "string";
                                                    };
                                                    readonly txs: {
                                                        readonly oneOf: readonly [{
                                                            readonly properties: {
                                                                readonly approve_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly confirm_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly error: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly message: {
                                                                            readonly description: "Error message";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly type: {
                                                                            readonly description: "ContractCallWithToken errors: <br/> * CONTRACT_CALL_WITH_TOKEN_EXECUTION_ERROR - Error occurred during the execute transaction <br/>\n\n\n`CONTRACT_CALL_WITH_TOKEN_EXECUTION_ERROR`";
                                                                            readonly enum: readonly ["CONTRACT_CALL_WITH_TOKEN_EXECUTION_ERROR"];
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly execute_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly gas_paid_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly send_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly type: "object";
                                                        }, {
                                                            readonly properties: {
                                                                readonly confirm_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly error: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly message: {
                                                                            readonly description: "Error message";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly type: {
                                                                            readonly description: "SendToken error types: <br/> * SEND_TOKEN_EXECUTION_ERROR - Error occurred during the execute transaction <br/>\n\n\n`SEND_TOKEN_EXECUTION_ERROR`";
                                                                            readonly enum: readonly ["SEND_TOKEN_EXECUTION_ERROR"];
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly execute_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                                readonly send_tx: {
                                                                    readonly type: readonly ["object", "null"];
                                                                    readonly properties: {
                                                                        readonly chain_id: {
                                                                            readonly description: "Chain ID the packet event occurs on";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly explorer_link: {
                                                                            readonly description: "Link to the transaction on block explorer";
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly tx_hash: {
                                                                            readonly description: "Hash of the transaction the packet event occurred in";
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly type: "object";
                                                        }];
                                                    };
                                                    readonly type: {
                                                        readonly description: "Axelar transfer type: <br/> * AXELAR_TRANSFER_CONTRACT_CALL_WITH_TOKEN - GMP contract call with token transfer type <br/> * AXELAR_TRANSFER_SEND_TOKEN - Send token transfer type <br/>\n\n\n`AXELAR_TRANSFER_CONTRACT_CALL_WITH_TOKEN` `AXELAR_TRANSFER_SEND_TOKEN`";
                                                        readonly enum: readonly ["AXELAR_TRANSFER_CONTRACT_CALL_WITH_TOKEN", "AXELAR_TRANSFER_SEND_TOKEN"];
                                                        readonly type: "string";
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                        };
                                        readonly type: "object";
                                    }, {
                                        readonly properties: {
                                            readonly cctp_transfer: {
                                                readonly properties: {
                                                    readonly to_chain_id: {
                                                        readonly description: "Chain ID of the destination chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain ID of the source chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly state: {
                                                        readonly description: "CCTP transfer state: <br/> * CCTP_TRANSFER_UNKNOWN - Unknown error <br/> * CCTP_TRANSFER_SENT - The burn transaction on the source chain has executed <br/> * CCTP_TRANSFER_PENDING_CONFIRMATION - CCTP transfer is pending confirmation by the cctp attestation api <br/> * CCTP_TRANSFER_CONFIRMED - CCTP transfer has been confirmed by the cctp attestation api <br/> * CCTP_TRANSFER_RECEIVED - CCTP transfer has been received at the destination chain \n\n`CCTP_TRANSFER_UNKNOWN` `CCTP_TRANSFER_SENT` `CCTP_TRANSFER_PENDING_CONFIRMATION` `CCTP_TRANSFER_CONFIRMED` `CCTP_TRANSFER_RECEIVED`";
                                                        readonly enum: readonly ["CCTP_TRANSFER_UNKNOWN", "CCTP_TRANSFER_SENT", "CCTP_TRANSFER_PENDING_CONFIRMATION", "CCTP_TRANSFER_CONFIRMED", "CCTP_TRANSFER_RECEIVED"];
                                                        readonly type: "string";
                                                    };
                                                    readonly txs: {
                                                        readonly properties: {
                                                            readonly send_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly receive_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        readonly type: "object";
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                        };
                                        readonly type: "object";
                                    }, {
                                        readonly properties: {
                                            readonly hyperlane_transfer: {
                                                readonly properties: {
                                                    readonly from_chain_id: {
                                                        readonly description: "Chain ID of the source chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly to_chain_id: {
                                                        readonly description: "Chain ID of the destination chain";
                                                        readonly type: "string";
                                                    };
                                                    readonly state: {
                                                        readonly description: "Hyperlane transfer state: <br/> * HYPERLANE_TRANSFER_UNKNOWN - Unknown error <br/> * HYPERLANE_TRANSFER_SENT - The Hyperlane transfer transaction on the source chain has executed <br/> * HYPERLANE_TRANSFER_FAILED - The Hyperlane transfer failed <br/> * HYPERLANE_TRANSFER_RECEIVED - The Hyperlane transfer has been received at the destination chain \n\n`HYPERLANE_TRANSFER_UNKNOWN` `HYPERLANE_TRANSFER_SENT` `HYPERLANE_TRANSFER_FAILED` `HYPERLANE_TRANSFER_RECEIVED`";
                                                        readonly enum: readonly ["HYPERLANE_TRANSFER_UNKNOWN", "HYPERLANE_TRANSFER_SENT", "HYPERLANE_TRANSFER_FAILED", "HYPERLANE_TRANSFER_RECEIVED"];
                                                        readonly type: "string";
                                                    };
                                                    readonly txs: {
                                                        readonly properties: {
                                                            readonly send_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                            readonly receive_tx: {
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly chain_id: {
                                                                        readonly description: "Chain ID the packet event occurs on";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly explorer_link: {
                                                                        readonly description: "Link to the transaction on block explorer";
                                                                        readonly type: "string";
                                                                    };
                                                                    readonly tx_hash: {
                                                                        readonly description: "Hash of the transaction the packet event occurred in";
                                                                        readonly type: "string";
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        readonly type: "object";
                                                    };
                                                };
                                                readonly type: "object";
                                            };
                                        };
                                        readonly type: "object";
                                    }];
                                };
                                readonly type: "array";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly description: "Transfer status for all transfers initiated by the transaction in the order they were initiated.";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetVenues: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly venues: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "A venue on which swaps can be exceuted";
                        readonly properties: {
                            readonly chain_id: {
                                readonly description: "Chain-id of the swap venue";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly description: "Name of the swap venue";
                                readonly type: "string";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly description: "Array of supported swap venues";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV2FungibleAssetsBetweenChains: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly source_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the source chain";
                readonly examples: readonly ["cosmoshub-4"];
            };
            readonly dest_chain_id: {
                readonly type: "string";
                readonly description: "Chain-id of the destination chain";
                readonly examples: readonly ["osmosis-1"];
            };
            readonly include_no_metadata_assets: {
                readonly type: "boolean";
                readonly description: "Whether to include assets without metadata (symbol, name, logo_uri, etc.)";
                readonly default: false;
            };
            readonly include_cw20_assets: {
                readonly type: "boolean";
                readonly description: "Whether to include CW20 tokens";
                readonly default: false;
            };
            readonly include_evm_assets: {
                readonly type: "boolean";
                readonly description: "Whether to include EVM tokens";
                readonly default: false;
            };
            readonly allow_multi_tx: {
                readonly type: "boolean";
                readonly description: "Whether to include recommendations requiring multiple transactions to reach the destination";
                readonly default: false;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly assets_between_chains: {
                    readonly type: "array";
                    readonly items: {
                        readonly properties: {
                            readonly asset_on_source: {
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly description: "Chain-id of the asset";
                                        readonly type: "string";
                                    };
                                    readonly coingecko_id: {
                                        readonly description: "Coingecko id of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly decimals: {
                                        readonly description: "Number of decimals used for amounts of the asset";
                                        readonly type: readonly ["number", "null"];
                                    };
                                    readonly denom: {
                                        readonly description: "Denom of the asset";
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly description: "Description of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly is_cw20: {
                                        readonly description: "Indicates whether asset is a CW20 token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_evm: {
                                        readonly description: "Indicates whether asset is an EVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_svm: {
                                        readonly description: "Indicates whether asset is an SVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly logo_uri: {
                                        readonly description: "URI pointing to an image of the logo of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly description: "Name of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly origin_chain_id: {
                                        readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly origin_denom: {
                                        readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly recommended_symbol: {
                                        readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly symbol: {
                                        readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly token_contract: {
                                        readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly trace: {
                                        readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                        readonly type: "string";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly asset_on_dest: {
                                readonly properties: {
                                    readonly chain_id: {
                                        readonly description: "Chain-id of the asset";
                                        readonly type: "string";
                                    };
                                    readonly coingecko_id: {
                                        readonly description: "Coingecko id of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly decimals: {
                                        readonly description: "Number of decimals used for amounts of the asset";
                                        readonly type: readonly ["number", "null"];
                                    };
                                    readonly denom: {
                                        readonly description: "Denom of the asset";
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly description: "Description of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly is_cw20: {
                                        readonly description: "Indicates whether asset is a CW20 token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_evm: {
                                        readonly description: "Indicates whether asset is an EVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly is_svm: {
                                        readonly description: "Indicates whether asset is an SVM token";
                                        readonly type: "boolean";
                                    };
                                    readonly logo_uri: {
                                        readonly description: "URI pointing to an image of the logo of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly description: "Name of the asset";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly origin_chain_id: {
                                        readonly description: "Chain-id of the origin of the asset. If this is an ibc denom, this is the chain-id of the asset that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly origin_denom: {
                                        readonly description: "Denom of the origin of the asset. If this is an ibc denom, this is the original denom that the ibc token represents";
                                        readonly type: "string";
                                    };
                                    readonly recommended_symbol: {
                                        readonly description: "Recommended symbol of the asset used to differentiate between bridged assets with the same symbol, e.g. USDC.axl for Axelar USDC and USDC.grv for Gravity USDC";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly symbol: {
                                        readonly description: "Symbol of the asset, e.g. ATOM for uatom";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly token_contract: {
                                        readonly description: "Address of the contract for the asset, e.g. if it is a CW20 or ERC20 token";
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly trace: {
                                        readonly description: "The forward slash delimited sequence of ibc ports and channels that can be traversed to unwind an ibc token to its origin asset.";
                                        readonly type: "string";
                                    };
                                };
                                readonly type: "object";
                            };
                            readonly txs_required: {
                                readonly description: "Number of transactions required to transfer the asset";
                                readonly type: "integer";
                            };
                            readonly bridges: {
                                readonly description: "Bridges that are used to transfer the asset";
                                readonly items: {
                                    readonly description: "Bridge Type: <br/> * IBC - IBC Bridge <br/> * AXELAR - Axelar Bridge <br/> * CCTP - CCTP Bridge <br/> * HYPERLANE - Hyperlane Bridge ";
                                    readonly enum: readonly ["IBC", "AXELAR", "CCTP", "HYPERLANE"];
                                };
                                readonly type: "array";
                            };
                        };
                        readonly type: "object";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubmitTransactionV2: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly tx: {
                readonly type: "string";
                readonly description: "Signed base64 encoded transaction";
                readonly examples: readonly ["base64 encoded transaction"];
            };
            readonly chain_id: {
                readonly type: "string";
                readonly description: "Chain ID of the transaction";
                readonly examples: readonly ["osmosis-1"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly tx_hash: {
                    readonly type: "string";
                    readonly description: "Hash of the transaction";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TrackTransactionV2: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly tx_hash: {
                readonly type: "string";
                readonly description: "Hex encoded hash of the transaction to track";
                readonly examples: readonly ["tx hash"];
            };
            readonly chain_id: {
                readonly type: "string";
                readonly description: "Chain ID of the transaction";
                readonly examples: readonly ["osmosis-1"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly tx_hash: {
                    readonly type: "string";
                    readonly description: "Hash of the transaction";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly code: {
                    readonly description: "grpc status codes as defined [here](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)";
                    readonly type: "number";
                };
                readonly details: {
                    readonly description: "Additional error details";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly reason: {
                                readonly description: "Error detail: <br/> * LOW_INFO_ERROR - Not enough asset pricing information to determine the price safety of the route. <br/> * BAD_PRICE_ERROR - The execution price of the route deviates significantly from the current market price. \n\n`LOW_INFO_ERROR` `BAD_PRICE_ERROR`";
                                readonly enum: readonly ["LOW_INFO_ERROR", "BAD_PRICE_ERROR"];
                                readonly type: "string";
                            };
                        };
                    };
                    readonly type: "array";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { GetAssetRecommendations, GetAssets, GetAssetsFromSource, GetBridges, GetChains, GetMsgsDirectV2, GetMsgsV2, GetOriginAssets, GetRouteV2, GetTransactionStatusV2, GetVenues, PostV2FungibleAssetsBetweenChains, SubmitTransactionV2, TrackTransactionV2 };
