// export const SUBHEADER = "SUBHEADER";
import {apptsList, contactList, toshiList, adminList} from '../data/lists'

export const sidebar = (text) => {
  return {
    type: SUBHEADER,
    text,
  };
}
