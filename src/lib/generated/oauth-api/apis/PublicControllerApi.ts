/* tslint:disable */
/* eslint-disable */
/**
 * OAuth API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  OAuthResponseDto,
  ReviewEntity,
} from '../models/index';
import {
    OAuthResponseDtoFromJSON,
    OAuthResponseDtoToJSON,
    ReviewEntityFromJSON,
    ReviewEntityToJSON,
} from '../models/index';

/**
 * 
 */
export class PublicControllerApi extends runtime.BaseAPI {

    /**
     */
    async getHelloWorldRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("github", []);
        }

        const response = await this.request({
            path: `/api/v1/public/hello`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async getHelloWorld(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getHelloWorldRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getReviewsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ReviewEntity>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("github", []);
        }

        const response = await this.request({
            path: `/api/v1/public/reviews`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ReviewEntityFromJSON));
    }

    /**
     */
    async getReviews(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ReviewEntity>> {
        const response = await this.getReviewsRaw(initOverrides);
        return await response.value();
    }

}
