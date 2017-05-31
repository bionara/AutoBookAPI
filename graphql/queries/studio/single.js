import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import studioType from '../../types/studio';
import getProjection from '../../get-projection';
import StudioModel from '../../../models/studio';

export default {
  type: studioType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return StudioModel
      .findById(params.id)
      .select(projection)
      .exec();
  }
};
