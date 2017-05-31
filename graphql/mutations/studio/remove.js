import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import studioType from '../../types/studio';
import getProjection from '../../get-projection';
import StudioModel from '../../../models/studio';

export default {
  type: studioType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    const removedstudio = await StudioModel
      .findByIdAndRemove(params._id, {
        select: projection
      })
      .exec();

    if (!removedstudio) {
      throw new Error('Error removing Studio');
    }

    return removedstudio;
  }
};
