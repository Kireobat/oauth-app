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
  UserDto,
} from '../models/index';
import {
    OAuthResponseDtoFromJSON,
    OAuthResponseDtoToJSON,
    UserDtoFromJSON,
    UserDtoToJSON,
} from '../models/index';

/**
 * 
 */
export class AuthControllerApi extends runtime.BaseAPI {

    /**
     */
    async getUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("github", []);
        }

        const response = await this.request({
            path: `/api/v1/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     */
    async getUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.getUserRaw(initOverrides);
        return await response.value();
    }

}
