import {
  createAction,
  props
} from '@ngrx/store';
import { Filter } from '../../interface/filter';

const setFilterAction =
  createAction('[Filter] Set filter', props<{ filter: Filter }>());

const loadArticlesFilter = createAction('[Filter] loading articles');

export const filterActions = {
  setFilterAction,
  loadArticlesFilter
}
