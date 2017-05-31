import {
  GraphQLList
} from 'graphql';

import studioType from '../../types/studio';
import getProjection from '../../get-projection';
import StudioModel from '../../../models/studio';

export default {
  type: new GraphQLList(studioType),
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return StudioModel
      .find()
      .select(projection)
      .exec();
  }
};
