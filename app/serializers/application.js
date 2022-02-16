import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
  normalizeResponse(store, primaryModelClass, payload) {
    if (!Array.isArray(payload.data) && payload.data.type == 'users') {
      payload.data.attributes.webp = payload.data.attributes.image.webp;
      delete payload.data.attributes.image;
    }
    return super.normalizeResponse(...arguments);
  }
}
