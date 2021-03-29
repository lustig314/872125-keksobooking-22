
import './map.js';
import './user-form.js';
import './preview-image.js'
import { resetToDeafaultState } from './page-state.js'
import { setUserFormSubmit } from './user-form.js';
import { initMap } from './map.js';


initMap()
setUserFormSubmit(resetToDeafaultState);


