import client from "../axios";

const getAlbums = () => client("/albums");

const getPhotos = () => client("/photos");

export { getAlbums, getPhotos };
