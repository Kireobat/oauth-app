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
/**
 * 
 * @export
 * @interface TopicEntity
 */
export interface TopicEntity {
    /**
     * 
     * @type {number}
     * @memberof TopicEntity
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TopicEntity
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof TopicEntity
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof TopicEntity
     */
    imageUrl?: string;
    /**
     * 
     * @type {Date}
     * @memberof TopicEntity
     */
    createdTime?: Date;
}

/**
 * Check if a given object implements the TopicEntity interface.
 */
export function instanceOfTopicEntity(value: object): value is TopicEntity {
    return true;
}

export function TopicEntityFromJSON(json: any): TopicEntity {
    return TopicEntityFromJSONTyped(json, false);
}

export function TopicEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): TopicEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'title': json['title'] == null ? undefined : json['title'],
        'description': json['description'] == null ? undefined : json['description'],
        'imageUrl': json['imageUrl'] == null ? undefined : json['imageUrl'],
        'createdTime': json['createdTime'] == null ? undefined : (new Date(json['createdTime'])),
    };
}

export function TopicEntityToJSON(json: any): TopicEntity {
    return TopicEntityToJSONTyped(json, false);
}

export function TopicEntityToJSONTyped(value?: TopicEntity | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'description': value['description'],
        'imageUrl': value['imageUrl'],
        'createdTime': value['createdTime'] == null ? undefined : ((value['createdTime']).toISOString()),
    };
}

