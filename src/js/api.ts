/// <reference path="./api.d.ts" />

import * as route from './api/route'
import * as storage from './api/storage'
import * as typeJudge from './api/typeJudge'
import * as request from './api/request'
import * as modal from './api/modal'
import * as filters from './api/filters'

export default {
  ...route,
  ...storage,
  ...typeJudge,
  ...request,
  ...modal,
  ...filters,
}
