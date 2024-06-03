import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Get all supported chains along with additional data useful for building applications +
     * frontends that interface with them (e.g. logo URI, IBC capabilities, fee assets, bech32
     * prefix, etc...)
     *
     */
    getChains(metadata?: types.GetChainsMetadataParam): Promise<FetchResponse<200, types.GetChainsResponse200>>;
    /**
     * Get all supported bridges
     *
     */
    getBridges(): Promise<FetchResponse<200, types.GetBridgesResponse200>>;
    /**
     * Get supported swap venues.
     *
     */
    getVenues(): Promise<FetchResponse<200, types.GetVenuesResponse200>>;
    /**
     * Get supported assets. Optionally limit to assets on a given chain and/or native assets.
     *
     * @throws FetchError<400, types.GetAssetsResponse400> The request was invalid, e.g. field is invalid
     * @throws FetchError<500, types.GetAssetsResponse500> Internal server error
     */
    getAssets(metadata?: types.GetAssetsMetadataParam): Promise<FetchResponse<200, types.GetAssetsResponse200>>;
    /**
     * Get assets that can be reached from a source via transfers under different conditions
     * (e.g. single vs multiple txs)
     *
     * @throws FetchError<400, types.GetAssetsFromSourceResponse400> The request was invalid, e.g. field is invalid
     * @throws FetchError<500, types.GetAssetsFromSourceResponse500> Internal server error
     */
    getAssetsFromSource(body: types.GetAssetsFromSourceBodyParam): Promise<FetchResponse<200, types.GetAssetsFromSourceResponse200>>;
    /**
     * This supports cross-chain actions among EVM chains, Cosmos chains, and between them.
     * Returns the sequence of transfers and/or swaps to reach the given destination asset from
     * the given source asset, along with estimated amount out. Commonly called before /msgs to
     * generate route info and quote.
     *
     * @throws FetchError<400, types.GetRouteV2Response400> The request was invalid, e.g. an invalid amount was passed or the swap size is unsafe
     * @throws FetchError<500, types.GetRouteV2Response500> Internal server error
     */
    getRouteV2(body: types.GetRouteV2BodyParam): Promise<FetchResponse<200, types.GetRouteV2Response200>>;
    /**
     * This supports cross-chain actions among EVM chains, Cosmos chains, and between them.
     * Returns minimal number of messages required to execute a multi-chain swap or transfer.
     * Input consists of the output of route with additional information required for message
     * construction (e.g. destination addresses for each chain)
     *
     * @throws FetchError<400, types.GetMsgsV2Response400> The request was invalid, e.g. an invalid amount was passed.
     * @throws FetchError<500, types.GetMsgsV2Response500> Internal server error
     */
    getMsgsV2(body: types.GetMsgsV2BodyParam): Promise<FetchResponse<200, types.GetMsgsV2Response200>>;
    /**
     * This supports cross-chain actions among EVM chains, Cosmos chains, and between them.
     * Returns minimal number of messages required to execute a multi-chain swap or transfer.
     * This is a convenience endpoint that combines /route and /msgs into a single call.
     *
     * @throws FetchError<400, types.GetMsgsDirectV2Response400> The request was invalid, e.g. an invalid amount was passed or the swap size is unsafe
     * @throws FetchError<500, types.GetMsgsDirectV2Response500> Internal server error
     */
    getMsgsDirectV2(body: types.GetMsgsDirectV2BodyParam): Promise<FetchResponse<200, types.GetMsgsDirectV2Response200>>;
    /**
     * Request asset recommendations for the given source assets on a given destination chain.
     * The response includes recommended destination assets and recommendation reasons.
     *
     * @throws FetchError<400, types.GetAssetRecommendationsResponse400> The request was invalid, i.e. required fields are missing
     * @throws FetchError<404, types.GetAssetRecommendationsResponse404> A recommendation or the specified token was not found
     * @throws FetchError<500, types.GetAssetRecommendationsResponse500> Internal server error
     */
    getAssetRecommendations(body: types.GetAssetRecommendationsBodyParam): Promise<FetchResponse<200, types.GetAssetRecommendationsResponse200>>;
    /**
     * Submit a signed base64 encoded transaction to be broadcast to the specified network. On
     * successful submission, the status of the transaction and any subsequent IBC or Axelar
     * transfers can be queried through the /status endpoint.
     *
     * @throws FetchError<400, types.SubmitTransactionV2Response400> The request was invalid, i.e. the submitted transaction was malformed or fails on
     * execution.
     * @throws FetchError<404, types.SubmitTransactionV2Response404> The specified chain is not supported.
     * @throws FetchError<500, types.SubmitTransactionV2Response500> Internal server error
     */
    submitTransactionV2(body: types.SubmitTransactionV2BodyParam): Promise<FetchResponse<200, types.SubmitTransactionV2Response200>>;
    /**
     * Requests tracking of a transaction that has already landed on-chain but was not
     * broadcast through the skip api. The status of a tracked transaction and subsequent IBC
     * or Axelar transfers if routing assets cross chain can be queried through the /status
     * endpoint.
     *
     * @throws FetchError<400, types.TrackTransactionV2Response400> The request was invalid, i.e. the transaction hash was malformed or the specified
     * transaction did not execute successfully.
     * @throws FetchError<404, types.TrackTransactionV2Response404> The specified chain is not supported or the specified transaction was not found.
     * @throws FetchError<500, types.TrackTransactionV2Response500> Internal server error
     */
    trackTransactionV2(body: types.TrackTransactionV2BodyParam): Promise<FetchResponse<200, types.TrackTransactionV2Response200>>;
    /**
     * Get the status of the specified transaction and any subsequent IBC or Axelar transfers
     * if routing assets cross chain. The transaction must have previously been submitted to
     * either the /submit or /track endpoints.
     *
     * @throws FetchError<404, types.GetTransactionStatusV2Response404> The specified tx was not found.
     * @throws FetchError<500, types.GetTransactionStatusV2Response500> Internal server error
     */
    getTransactionStatusV2(metadata: types.GetTransactionStatusV2MetadataParam): Promise<FetchResponse<200, types.GetTransactionStatusV2Response200>>;
    /**
     * Get origin assets from a given list of denoms and chain ids.
     *
     * @throws FetchError<400, types.GetOriginAssetsResponse400> The request was invalid, i.e. required fields are missing
     * @throws FetchError<500, types.GetOriginAssetsResponse500> Internal server error
     */
    getOriginAssets(body: types.GetOriginAssetsBodyParam): Promise<FetchResponse<200, types.GetOriginAssetsResponse200>>;
    /**
     * Given 2 chain ids, returns a list of equivalent assets that can be transferred
     *
     * @throws FetchError<404, types.PostV2FungibleAssetsBetweenChainsResponse404> One of the chain ids was not found
     * @throws FetchError<500, types.PostV2FungibleAssetsBetweenChainsResponse500> Internal server error
     */
    postV2FungibleAssets_between_chains(body: types.PostV2FungibleAssetsBetweenChainsBodyParam): Promise<FetchResponse<200, types.PostV2FungibleAssetsBetweenChainsResponse200>>;
}
declare const createSDK: SDK;
export default createSDK;
