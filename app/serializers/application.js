import JSONAPISerializer from '@ember-data/serializer/json-api';

// export default class ApplicationSerializer extends JSONAPISerializer {}
export default JSONAPISerializer.extend({
  
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    console.log('payload DATA: ', payload.data)
    if (Array.isArray(payload.data)) {
      payload.data.forEach(data => {
        data.attributes.webp = data.attributes.user.image.webp;
        data.attributes.username = data.attributes.user.username;
    
        delete data.attributes.user;
      });
    } else {
      payload.data.attributes.webp = payload.data.attributes.user.image.webp;
      payload.data.attributes.username = payload.data.attributes.user.username;
  
      delete payload.data.attributes.user;

    }

   
    return this._super(...arguments);
  },
})