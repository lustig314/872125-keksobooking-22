
import './map.js';
import './user-form.js';
import './user-filter.js';
import { resetToDeafaultState } from './page-state.js'
import { setUserFormSubmit } from './user-form.js';
import { renderAdsOnMap } from './map.js';
import { getData } from './api.js';

setUserFormSubmit(resetToDeafaultState);

getData(renderAdsOnMap);

