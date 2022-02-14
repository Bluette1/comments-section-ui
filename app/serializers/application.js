import JSONAPISerializer from '@ember-data/serializer/json-api';

// export default class ApplicationSerializer extends JSONAPISerializer {}
export default JSONAPISerializer.extend({
  
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    console.log('payload DATA: ', payload.data)

    if (!Array.isArray(payload.data) && payload.data.type=="users") {
      payload.data.attributes.webp = payload.data.attributes.image.webp;
      delete payload.data.attributes.image;
    }
    return this._super(...arguments);
  },
})