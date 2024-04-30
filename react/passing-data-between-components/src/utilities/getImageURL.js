export default function getImageURL(imageID, size = 's') {
  return 'https://i.imgur.com/' + imageID + size + '.jpg';
}
