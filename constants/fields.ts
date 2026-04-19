/**
 * Static seed list of approved public soccer fields for the Fields tab.
 * Coordinates are approximate placeholders; replace with verified pins for production.
 */
import type { SoccerField, UserLocationCoords } from "@/types";

/** Centroid of `APPROVED_FIELDS` — used when GPS is unavailable or denied so distances stay meaningful. */
export const APPROVED_FIELDS_REGION_CENTER: UserLocationCoords = {
  lat: 41.02083,
  lng: -111.93613,
};

export const APPROVED_FIELDS: SoccerField[] = [
  {
    id: "fld_barnes",
    name: "Barnes Park",
    address: "900 W 200 N, Kaysville, UT 84037",
    lat: 41.033621,
    lng: -111.939213,
  },
  {
    id: "fld_legacy",
    name: "Legacy Regional Park",
    address: "158 N 1075 W, Farmington, UT 84025",
    lat: 40.976541,
    lng: -111.905622,
  },
  {
    id: "fld_heritage",
    name: "Heritage Park",
    address: "250 N Fairfield Rd, Kaysville, UT 84037",
    lat: 41.037144,
    lng: -111.956891,
  },
  {
    id: "fld_ellison",
    name: "Ellison Park",
    address: "700 N 2200 W, Layton, UT 84041",
    lat: 41.077218,
    lng: -111.990432,
  },
  {
    id: "fld_forbush",
    name: "Forbush Park",
    address: "100 S Main St, Farmington, UT 84025",
    lat: 40.979624,
    lng: -111.888471,
  },
];
