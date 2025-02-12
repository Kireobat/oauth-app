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

import { mapValues } from '../runtime';
import type { UserEntity } from './UserEntity';
import {
    UserEntityFromJSON,
    UserEntityFromJSONTyped,
    UserEntityToJSON,
    UserEntityToJSONTyped,
} from './UserEntity';

/**
 * 
 * @export
 * @interface ReviewEntity
 */
export interface ReviewEntity {
    /**
     * 
     * @type {number}
     * @memberof ReviewEntity
     */
    id?: number;
    /**
     * 
     * @type {UserEntity}
     * @memberof ReviewEntity
     */
    user?: UserEntity;
    /**
     * 
     * @type {string}
     * @memberof ReviewEntity
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof ReviewEntity
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof ReviewEntity
     */
    rating?: number;
    /**
     * 
     * @type {Date}
     * @memberof ReviewEntity
     */
    createdTime?: Date;
}

/**
 * Check if a given object implements the ReviewEntity interface.
 */
export function instanceOfReviewEntity(value: object): value is ReviewEntity {
    return true;
}

export function ReviewEntityFromJSON(json: any): ReviewEntity {
    return ReviewEntityFromJSONTyped(json, false);
}

export function ReviewEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'user': json['user'] == null ? undefined : UserEntityFromJSON(json['user']),
        'title': json['title'] == null ? undefined : json['title'],
        'description': json['description'] == null ? undefined : json['description'],
        'rating': json['rating'] == null ? undefined : json['rating'],
        'createdTime': json['createdTime'] == null ? undefined : (new Date(json['createdTime'])),
    };
}

export function ReviewEntityToJSON(json: any): ReviewEntity {
    return ReviewEntityToJSONTyped(json, false);
}

export function ReviewEntityToJSONTyped(value?: ReviewEntity | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'user': UserEntityToJSON(value['user']),
        'title': value['title'],
        'description': value['description'],
        'rating': value['rating'],
        'createdTime': value['createdTime'] == null ? undefined : ((value['createdTime']).toISOString()),
    };
}

