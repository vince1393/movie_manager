export const indexDB = "";
const applicationVersion = 1;
const applicationName = "movie_managerDB";

export const createDB = () => {
  let openRequest = indexedDB.open(applicationName, applicationVersion);

  openRequest.onerror = () => {
    console.error("Error", openRequest.error);
  };
};
