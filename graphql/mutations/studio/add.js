import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import studioInputType from '../../types/studio-input';
import StudioModel from '../../../models/studio';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(studioInputType)
    }
  },
  async resolve (root, params, options) {
    const studioModel = new StudioModel(params.data);
    const newStudio = await studioModel.save();

    if (!newStudio) {
      throw new Error('Error adding new Studio');
    }
    return true;
  }
};

