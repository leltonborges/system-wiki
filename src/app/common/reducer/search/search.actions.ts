import {
  createAction,
  props
} from '@ngrx/store';

const setSearchQuery = createAction(
  '[Search] Set Search Query',
  props<{ query: string }>()
);

export const searchActions = {
  setSearchQuery
}
