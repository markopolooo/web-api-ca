// Utility helper functions for text formatting
import truncate from "lodash/truncate";

// Truncate text to 400 characters max - used for movie descriptions/overview text
export function excerpt(string) {
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}
