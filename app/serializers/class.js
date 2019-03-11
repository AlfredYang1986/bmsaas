import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    attrs: {
        units: { serialize: true }
      }
});
