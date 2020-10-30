import { upperFirst } from 'lodash';

export const getTherapistNames = location => location.substr([location.lastIndexOf('/') + 1]).split('.').map(upperFirst)
