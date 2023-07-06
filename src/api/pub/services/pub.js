'use strict';

/**
 * pub service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pub.pub');
