import {
  GraphQLBoolean
} from 'graphql';

import StudioModel from '../../../models/studio';

export default {
  type: GraphQLBoolean,
  resolve (root, params, options) {
    return studioModel
      .remove({})
      .exec();
  }
};
